import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./stores/index";
import { ConversationStore, Conversation } from "./stores/conversationStore";
import "./App.css";

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const conversations = useSelector<RootState, Conversation[]>((state) =>
    ConversationStore.selectors.selectAll(state)
  );
  const loading = useSelector<RootState, boolean>((state) =>
    ConversationStore.selectors.selectLoading(state)
  );
  const error = useSelector((state: RootState) =>
    ConversationStore.selectors.selectError(state)
  );

  useEffect(() => {
    dispatch(ConversationStore.actions.fetchAll());
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h2>Conversations</h2>
      <ul>
        {conversations.map((conversation) => (
          <li key={conversation.id}>
            <h3>{conversation.title}</h3>
            <p>{conversation.lastMessage}</p>
            <small>{conversation.timestamp}</small>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
