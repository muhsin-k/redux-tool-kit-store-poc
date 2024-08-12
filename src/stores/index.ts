import { configureStore } from "@reduxjs/toolkit";
import { ConversationStore } from "./conversationStore";

export const store = configureStore({
  reducer: {
    conversations: ConversationStore.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
