// src/store/baseStore.ts
import {
  createSlice,
  PayloadAction,
  createAsyncThunk,
  SerializedError,
} from "@reduxjs/toolkit";
import { ApiClient } from "./ApiClient";

interface BaseModel {
  id: string | number;
  [key: string]: any;
}

interface BaseState<T extends BaseModel> {
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
      const { payload } = data.data;

      return payload;
    } catch (err: any) {
      return rejectWithValue({
        name: "FetchError",
        message: err.message || "Failed to fetch data",
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
    } catch (err: any) {
      return rejectWithValue({
        name: "CreateError",
        message: err.message || "Failed to create item",
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
    } catch (err: any) {
      return rejectWithValue({
        name: "UpdateError",
        message: err.message || "Failed to update item",
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
    } catch (err: any) {
      return rejectWithValue({
        name: "DeleteError",
        message: err.message || "Failed to delete item",
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
        .addCase(fetchAll.fulfilled, (state, action) => {
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
        .addCase(create.fulfilled, (state, action) => {
          state.records[action.payload.id] = action.payload;
        })
        .addCase(update.fulfilled, (state, action) => {
          state.records[action.payload.id] = action.payload;
        })
        .addCase(remove.fulfilled, (state, action) => {
          delete state.records[action.payload];
        });
    },
  });

  const selectAll = (state: { [key: string]: BaseState<T> }) =>
    Object.values(state[name].records);
  const selectById = (
    state: { [key: string]: BaseState<T> },
    id: string | number
  ) => state[name].records[id];
  const selectLoading = (state: { [key: string]: BaseState<T> }) =>
    state[name].loading;
  const selectError = (state: { [key: string]: BaseState<T> }) =>
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
