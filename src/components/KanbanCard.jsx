import React from "react";
import infoIcongray from '../assets/SVG - Urgent Priority grey.svg'
import infoIconUrgent from '../assets/SVG - Urgent Priority colour.svg'
import noPriority from '../assets/No-priority.svg';
import lowPriority from '../assets/Img - Low Priority.svg';
import mediumPriority from '../assets/Img - Medium Priority.svg';
import highPriotiy from '../assets/Img - High Priority.svg';
import inprogress from '../assets/in-progress.svg';
import done from '../assets/Done.svg';
import backlog from '../assets/Backlog.svg';
import todo from '../assets/To-do.svg';
import cancelled from '../assets/Cancelled.svg'
// Dummy avatar URL
const getAvatarUrl = (userId) => `https://www.example.com/avatars/${userId}.png`;

const KanbanCard = ({ ticket, grouping, ordering }) => {
  console.log(ticket.priority)
  return (
    <div className="kanban-card" >

      <div style={{display: "flex", justifyContent: "space-between"}}>

      <div className="card-header">
        <span className="ticket-id">{ticket.id}</span>
        <h4>{grouping!=="status" && <img src={getStatusIcon(ticket.status)} alt="status"/>}  {ticket.title}</h4>
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



      <div style={{display: "flex", alignItems: "center"}}> 
      {grouping!=="priority" && <div className="status-icon">
        
      <img src={getPriotityIcon(ticket.priority)} alt="pri-icon" style={{color: "gray", backgroundColor: "white", borderRadius: "2px", width: "20px", height: "20px", border: "solid black 1px", marginRight: "5px"}} />
      
      </div>}

      <div style={{display: "flex", alignItems:"center", gap: "5px", border: "solid black 1px", padding: '5px', fontSize: '12px', color:"gray"}}>
      <div className="circle"></div>{ticket.tag[0]}
      </div>
      
      </div>    

      
    </div>
  );
};

const getStatusIcon = (status) => {
  switch(status) {
    case 'Backlog':
      return backlog;
    case 'Todo':
      return todo;
    case 'In progress':
      return inprogress;
    case 'Done':
      return done;
    case 'Cancelled':
      return  cancelled;
    default:
      return backlog;
  }
}


const getPriotityIcon = (priority) => {
  console.log(priority, "here")
  switch(priority) {
    case 0:
      return noPriority;
    case 1:
      return lowPriority;
    case 2:
      return mediumPriority;
    case 3:
      return highPriotiy;
    case 4:
      return infoIconUrgent;
    default:
       return infoIcongray;
  }
}
export default KanbanCard;
