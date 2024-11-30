import React from "react";
import KanbanCard from "./KanbanCard";
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
import cancelled from '../assets/Cancelled.svg';
import plus from '../assets/add.svg';
import threedot from '../assets/3 dot menu.svg';

const KanbanColumn = ({ title, tickets, grouping, ordering }) => {
  return (
    <div className="kanban-column">
      <div style={{display: "flex", justifyContent: "space-between", paddingRight: "18px"}}>
      <h3 style={{textAlign: "left", fontWeight: "600"}}><img src={getIcon(grouping, ordering, title)} alt="icon" /> {title}
        <span style={{color: "gray", fontSize: "13px", marginLeft: "5px"}}>{tickets.length}</span>
      </h3>

        {tickets.length>0 && <h3 style={{textAlign: "right", fontWeight: "600"}}>
            <img src={plus} alt="add" style={{width: "20px", height:"20px"}}/>
            <img src={threedot} alt="3dot"  style={{width: "20px", height:"20px"}}/>
        </h3>}
      </div>

      {tickets.map((ticket) => (
        <KanbanCard key={ticket.id} ticket={ticket} grouping={grouping} ordering={ordering} />
      ))}
    </div>
  );
};

const getIcon = (grouping, ordering, title) => {
    if(grouping==="status"){
        const status = title;
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
    }else if(grouping==="priority"){
        const priority = title;
        switch(priority) {
            case 'No Priority':
              return noPriority;
            case 'Low':
              return lowPriority;
            case 'Medium':
              return mediumPriority;
            case 'High':
              return highPriotiy;
            case 'Urgent':
              return infoIconUrgent;
            default:
                return infoIcongray;
          }
    }
}

export default KanbanColumn;
