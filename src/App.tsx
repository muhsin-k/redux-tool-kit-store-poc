import { useEffect } from "react";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./stores/index";
import { ConversationStore } from "./stores//conversationStore";

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const conversations = useSelector((state: RootState) =>
    ConversationStore.selectors.selectAll(state)
  );

  useEffect(() => {
    dispatch(ConversationStore.actions.fetchAll());
  }, [dispatch]);

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
