import React from "react";
import {ClipboardCheck , MessageCircle , UserRound, SquareChartGantt  } from 'lucide-react'

function ActiviyCard({item}) {
  return (
    <div key={item._id} className="w-full flex  gap-5 bg-white overflow-hidden rounded-br-full shadow-xs  p-2 px-4 ">
      <div className="shrink-0  ">
        <span
          className={`w-10 h-10 rounded-xl flex items-center justify-center text-white font-medium text-lg
                    ${item.entityType === 'task' ? 'bg-purple-500' : item.entityType === 'workspace' ? 'bg-emerald-500' : item.entityType=== ' user' ? 'bg-green-500' : item.entityType === 'comment'? 'bg-cyan-500': 'bg-blue-500'}`}
        >
          {
            item.entityType === 'task' ? <ClipboardCheck /> : item.entityType === 'comment' ? <MessageCircle /> : item.entityType === 'member' ?  <UserRound /> : <SquareChartGantt />
          }
          
        </span>
      </div>
      <div className="flex-1 items-start">
        <h1 className="text-lg font-semibold ">{item?.action} </h1>
        <p>
          <span className="font-medium">{item?.entityType}</span> <span>ali haider</span>
        </p>
        <p>
          <span className="font-medium">workspace : {item.workspace.name} </span>{" "}
          <span> . 12 days ago</span>{" "}
        </p>
      </div>
      <div className="shrink-0">
        <span
          className="px-4 py-1.5 bg-blue-100  rounded-full font-semibold tracking-tight  text-blue-500
                     "
        >
          updated
        </span>
      </div>
    </div>
  );
}

export default ActiviyCard;
