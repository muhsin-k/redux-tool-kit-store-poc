import { createBaseStore } from "./baseStore";

export interface Conversation {
  id: number;
  title: string;
  lastMessage: string;
  timestamp: string;
}

export const ConversationStore = createBaseStore<Conversation>(
  "conversations",
  "conversations",
  { apiVersion: "v1" }
);
