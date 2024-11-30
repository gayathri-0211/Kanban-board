import React, { useEffect, useState } from "react";
import KanbanBoard from "./components/KanbanBoard";
import "./styles.css";

const App = () => {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch tickets and users from the API
    fetch("https://api.quicksell.co/v1/internal/frontend-assignment")
      .then((response) => response.json())
      .then((data) => {
        setTickets(data.tickets);
        setUsers(data.users);
      });
  }, []);

  return (
    <div className="application">
      
      <KanbanBoard tickets={tickets} users={users} />
    </div>
  );
};

export default App;
