import { createAsyncThunk, AsyncThunk } from "@reduxjs/toolkit";
import { createBaseStore, BaseState } from "./baseStore";
import { ApiClient } from "./ApiClient";

export interface Conversation {
  id: number;
  title: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
}

// Define a type for the custom actions
interface CustomActions {
  markAsRead: AsyncThunk<Conversation, number, {}>;
}

// Create the base store
const baseStore = createBaseStore<Conversation>(
  "conversations",
  "conversations",
  { apiVersion: "v1" }
);

// Create a new API client instance for custom actions
const apiClient = new ApiClient("conversations", { apiVersion: "v1" });

// Define custom actions
const customActions: CustomActions = {
  markAsRead: createAsyncThunk<Conversation, number>(
    "conversations/markAsRead",
    async (conversationId, { getState, rejectWithValue }) => {
      try {
        const response = await apiClient.update<Conversation>(conversationId, {
          unreadCount: 0,
        });
        return response.data;
      } catch (err) {
        return rejectWithValue("Failed to mark conversation as read");
      }
    }
  ),
};

// Extend the base reducer to handle custom actions
const extendedReducer = (
  state: BaseState<Conversation> | undefined,
  action: any
) => {
  const newState = baseStore.reducer(state, action);

  if (customActions.markAsRead.fulfilled.match(action)) {
    const conversation = action.payload;
    newState.records[conversation.id] = conversation;
  }

  return newState;
};

// Create the extended ConversationStore
export const ConversationStore = {
  ...baseStore,
  reducer: extendedReducer,
  actions: {
    ...baseStore.actions,
    ...customActions,
  },
};
