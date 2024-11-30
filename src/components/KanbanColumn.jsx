import React from "react";
import KanbanCard from "./KanbanCard";

const KanbanColumn = ({ title, tickets }) => {
  return (
    <div className="kanban-column">
      <h3 style={{textAlign: "left", fontWeight: "600"}}>{title}
        <span style={{color: "gray", fontSize: "13px", marginLeft: "5px"}}>{tickets.length}</span>
      </h3>
      {tickets.map((ticket) => (
        <KanbanCard key={ticket.id} ticket={ticket} />
      ))}
    </div>
  );
};

export default KanbanColumn;
