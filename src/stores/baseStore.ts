import {
  createSlice,
  createAsyncThunk,
  SerializedError,
  PayloadAction,
} from "@reduxjs/toolkit";
import { ApiClient } from "./ApiClient";

export interface BaseModel {
  id: string | number;
  [key: string]: string | number | boolean | Date | null;
}

export interface BaseState<T extends BaseModel> {
  records: Record<string | number, T>;
  loading: boolean;
  error: SerializedError | null;
}

export function createBaseStore<T extends BaseModel>(
  name: string,
  resource: string,
  apiOptions = {}
) {
  const apiClient = new ApiClient(resource, apiOptions);

  const initialState: BaseState<T> = {
    records: {},
    loading: false,
    error: null,
  };

  const fetchAll = createAsyncThunk<
    T[],
    void,
    { rejectValue: SerializedError }
  >(`${name}/fetchAll`, async (_, { rejectWithValue }) => {
    try {
      const { data } = await apiClient.get();
      return data.data.payload;
    } catch (err: unknown) {
      if (err instanceof Error) {
        return rejectWithValue({
          name: "FetchError",
          message: err.message || "Failed to fetch data",
        });
      }
      return rejectWithValue({
        name: "FetchError",
        message: "An unknown error occurred",
      });
    }
  });

  const create = createAsyncThunk<
    T,
    Partial<T>,
    { rejectValue: SerializedError }
  >(`${name}/create`, async (data, { rejectWithValue }) => {
    try {
      const response = await apiClient.create(data);
      return response.data;
    } catch (err: unknown) {
      if (err instanceof Error) {
        return rejectWithValue({
          name: "CreateError",
          message: err.message || "Failed to create item",
        });
      }
      return rejectWithValue({
        name: "CreateError",
        message: "An unknown error occurred",
      });
    }
  });

  const update = createAsyncThunk<
    T,
    { id: string | number; data: Partial<T> },
    { rejectValue: SerializedError }
  >(`${name}/update`, async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await apiClient.update(id, data);
      return response.data;
    } catch (err: unknown) {
      if (err instanceof Error) {
        return rejectWithValue({
          name: "UpdateError",
          message: err.message || "Failed to update item",
        });
      }
      return rejectWithValue({
        name: "UpdateError",
        message: "An unknown error occurred",
      });
    }
  });

  const remove = createAsyncThunk<
    string | number,
    string | number,
    { rejectValue: SerializedError }
  >(`${name}/remove`, async (id, { rejectWithValue }) => {
    try {
      await apiClient.delete(id);
      return id;
    } catch (err: unknown) {
      if (err instanceof Error) {
        return rejectWithValue({
          name: "DeleteError",
          message: err.message || "Failed to delete item",
        });
      }
      return rejectWithValue({
        name: "DeleteError",
        message: "An unknown error occurred",
      });
    }
  });

  const slice = createSlice({
    name,
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchAll.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchAll.fulfilled, (state, action: PayloadAction<T[]>) => {
          state.loading = false;
          state.records = action.payload.reduce((acc, item) => {
            acc[item.id] = item;
            return acc;
          }, {} as Record<string | number, T>);
        })
        .addCase(fetchAll.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload || action.error;
        })
        .addCase(create.fulfilled, (state, action: PayloadAction<T>) => {
          state.records[action.payload.id] = action.payload;
        })
        .addCase(update.fulfilled, (state, action: PayloadAction<T>) => {
          state.records[action.payload.id] = action.payload;
        })
        .addCase(
          remove.fulfilled,
          (state, action: PayloadAction<string | number>) => {
            delete state.records[action.payload];
          }
        );
    },
  });

  const selectAll = (state: Record<string, BaseState<T>>) =>
    Object.values(state[name].records);
  const selectById = (
    state: Record<string, BaseState<T>>,
    id: string | number
  ) => state[name].records[id];
  const selectLoading = (state: Record<string, BaseState<T>>) =>
    state[name].loading;
  const selectError = (state: Record<string, BaseState<T>>) =>
    state[name].error;

  return {
    reducer: slice.reducer,
    actions: {
      ...slice.actions,
      fetchAll,
      create,
      update,
      remove,
    },
    selectors: {
      selectAll,
      selectById,
      selectLoading,
      selectError,
    },
  };
}
