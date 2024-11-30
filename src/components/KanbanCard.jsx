import React from "react";

// Dummy avatar URL
const getAvatarUrl = (userId) => `https://www.example.com/avatars/${userId}.png`;

const KanbanCard = ({ ticket }) => {
  return (
    <div className="kanban-card" >

      <div style={{display: "flex", justifyContent: "space-between"}}>

      <div className="card-header">
        <span className="ticket-id">{ticket.id}</span>
        <h4>{ticket.title}</h4>
      </div>

      <div className="assigned-user">
        <img
          src={getAvatarUrl(ticket.userId)}
          alt={`${ticket.userId}`}
          className="avatar"

        />
      </div>

      </div>

      
      


      <div className="ticket-labels">
        {ticket.label && <span className="label">{ticket.label}</span>}
      </div>



      <div style={{display: "flex"}}> 
      <div className="status-icon">
        {ticket.status === "urgent" ? (
          <span role="img" aria-label="urgent">⚠️</span>
        ) : (
          <span role="img" aria-label="info">ℹ️</span>
        )}
      </div>

      <div>
        {ticket.tag[0]}
      </div>
      
      </div>    

      
    </div>
  );
};

export default KanbanCard;
