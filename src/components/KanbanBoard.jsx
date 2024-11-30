import React, { useState, useEffect } from "react";
import KanbanColumn from "./KanbanColumn";
import displayIcon from "../assets/Display.svg";
import { SlArrowUp } from "react-icons/sl";
import { SlArrowDown } from "react-icons/sl";

const KanbanBoard = ({ tickets, users }) => {
  const [displayDropdown, setDisplayDropdown] = useState(false);
  const [grouping, setGrouping] = useState(() => localStorage.getItem("grouping") || "status");
  const [ordering, setOrdering] = useState(() => localStorage.getItem("ordering") || "priority");
  const [processedTickets, setProcessedTickets] = useState([]);

  // Save the grouping and ordering values to localStorage when they change
  useEffect(() => {
    localStorage.setItem("grouping", grouping);
  }, [grouping]);

  useEffect(() => {
    localStorage.setItem("ordering", ordering);
  }, [ordering]);

  // Group tickets by the selected option (status, user, or priority)
  const groupTickets = (tickets, criteria) => {
    if (criteria === "status") {
        // Initialize with all possible statuses
        const allStatuses = { 'Backlog': [], 'Todo': [], "In progress": [], 'Done': [], 'Cancelled': [] };
    
        // Group tickets by status
        return tickets.reduce((acc, ticket) => {
          acc[ticket.status].push(ticket);
          return acc;
        }, allStatuses);
      } else if (criteria === "user") {
      return tickets.reduce((acc, ticket) => {
        const user = users.find((user) => user.id === ticket.userId)?.name || "Unassigned";
        acc[user] = acc[user] || [];
        acc[user].push(ticket);
        return acc;
      }, {});
    } else if (criteria === "priority") {
      return tickets.reduce((acc, ticket) => {
        const priorityMap = ["Medium", "High", "Low", "Urgent", "No Priority"];
        const priority = priorityMap[ticket.priority] || "Unknown";
        acc[priority] = acc[priority] || [];
        acc[priority].push(ticket);
        return acc;
      }, {});
    }
  };

  // Sort tickets by the selected option (priority or title)
  const orderTickets = (groupedTickets, criteria) => {
    const orderedData = {};
    for (const [group, tickets] of Object.entries(groupedTickets)) {
      orderedData[group] = [...tickets].sort((a, b) => {
        if (criteria === "priority") {
          return b.priority - a.priority;
        } else if (criteria === "title") {
          return a.title.localeCompare(b.title);
        }
        return 0;
      });
    }
    return orderedData;
  };

  // Update processed tickets whenever tickets or grouping/order changes
  useEffect(() => {
    const groupedData = groupTickets(tickets, grouping);
    const orderedData = orderTickets(groupedData, ordering);
    setProcessedTickets(orderedData);
  }, [tickets, grouping, ordering]);

  const togglePopup = () => {
    setDisplayDropdown(!displayDropdown);
  };

  return (
    <div>
      {/* Dropdowns for grouping and ordering */}
      <button
        onClick={togglePopup}
        style={{
          padding: "8px 12px",
          fontSize: "12px",
          cursor: "pointer",
          borderRadius: "1px",
          backgroundColor: "white",
          color: "black",
          border: "solid black 1px",
          marginLeft: "3vw",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          textAlign: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img src={displayIcon} style={{ marginRight: "5px" }} alt="display icon" /> Display{" "}
        {displayDropdown ? <SlArrowDown style={{ marginLeft: "5px" }} /> : <SlArrowUp style={{ marginLeft: "5px" }} />}
      </button>

      {displayDropdown && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-evenly",
            marginTop: "5px",
            zIndex: "30",
            position: "absolute",
            marginBottom: "20px",
            marginLeft: "4vw",
            padding: "20px 10px",
            backgroundColor: "#F9FCFE",
            width: "280px",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
            border: "solid #F9FCFE 1px",
            borderRadius: "10px",
          }}
        >
          <div
            style={{
              marginBottom: "30px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <label style={{ marginRight: "90px", color: "gray" }}>Grouping </label>
            <select
              value={grouping}
              onChange={(e) => setGrouping(e.target.value)}
              style={{
                outline: "none",
                padding: "3px 3px",
                fontSize: "12px",
                cursor: "pointer",
              }}
            >
              <option value="status">Status</option>
              <option value="user">User</option>
              <option value="priority">Priority</option>
            </select>
          </div>
          <div>
            <label style={{ marginRight: "90px", color: "gray" }}>Ordering: </label>
            <select
              value={ordering}
              onChange={(e) => setOrdering(e.target.value)}
              style={{
                outline: "none",
                padding: "3px 3px",
                fontSize: "12px",
                cursor: "pointer",
              }}
            >
              <option value="priority">Priority</option>
              <option value="title">Title</option>
            </select>
          </div>
        </div>
      )}

      {/* Render grouped and ordered tickets in columns */}
      <div className="kanban-board">
        {Object.keys(processedTickets).map((key) => (
          <KanbanColumn key={key} title={key} tickets={processedTickets[key]} grouping={grouping} ordering={ordering} />
        ))}
      </div>
    </div>
  );
};

export default KanbanBoard;
