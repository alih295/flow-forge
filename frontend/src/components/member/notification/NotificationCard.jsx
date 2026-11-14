import { formatDistanceToNow } from "date-fns";
import { User } from "lucide-react";
import React from "react";

function NotificationCard({data}) {
  return (
    <div className="w-full p-4 ">
      <div className="w-full flex items-center justify-between">
        <div className="flex gap-4 flex-1">
          <span className="w-12 rounded-full flex items-center justify-center bg-gray-600 h-12">
            {data.sender.profile.profilePic ? <img className="w-full h-full bg-cover bg-center" src="data.sender.profile.profilePic" alt="" /> : <User color="white" size={22} />}
          </span>
          <div>
            <h1 className="text-lg capitalize font-semibold">{data?.title}</h1>
            <p className="text-sm">{data?.workspace?.name}</p>
          </div>
        </div>
        <span className={`px-2 rounded-full ${data.isRead ? 'bg-gray-600/30 text-white' : 'bg-blue-500/20  text-blue-600'}  text-sm font-medium`}>
          {data.isRead ? 'read' :'Unread'}
        </span>
      </div>
      <p className="text-md mt-3">{data?.sender?.name} ,  {data?.entityType} : {data?.message}</p>
      <p className="text-muted text-sm mt-3"> {formatDistanceToNow(new Date(data.createdAt), {
                              addSuffix: true,
                            })}</p>
    </div>
  );
}

export default NotificationCard;
