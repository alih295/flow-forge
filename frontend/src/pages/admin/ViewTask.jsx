import { BuildingComplex, Ellipsis, SquarePen, X, Send } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchTaskById } from "../../services/TaskServices";
import { createComment } from "../../services/commentServices";
import { formatDistanceToNow } from "date-fns";

function ViewTask() {
  const { id } = useParams();
  const [task, setTask] = useState([]);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [taskActivity, setTaskActivity] = useState([]);
  useEffect(() => {
    const getTaskById = async () => {
      try {
        const data = await fetchTaskById(id);
        if (data.success) {
          console.log(data)
          setTask(data.task);
          setComments(data.comment);
          setTaskActivity(data.taskActivity);
        }
      } catch (err) {
        console.error(err.message);
      } finally {
      }
    };

    getTaskById();
  }, [id, comment]);
  const commentHandler = async () => {
    try {
      const data = { content: comment };
      const taskId = id;
      const workspaceId = task.workspace._id;
      const response = await createComment(workspaceId, taskId, data);
      if (response.success) {
        console.log(response);
        toast.success("comment added");
        setComments([...comments, response.comment]);
      }
    } catch (err) {
      console.error(err.message);
      toast.error(err.message);
    }
  };

  return (
    <div className="w-full min-h-screen font-[Montserrat] bg-bg-soft p-6">
      <header className="w-full flex items-center justify-between">
        <h4 className="text-lg">Task Details</h4>
        <span
          className="flex
         items-center justify-center gap-4 text-lg"
        >
          <SquarePen size={18} /> <X size={18} />{" "}
        </span>
      </header>
      <Toaster></Toaster>
      <div className="w-full py-5 mt-5 border-b border-border ">
        <h1 className="text-xl text-text font-semibold capitalize">
          {task?.title}
        </h1>
        <div
          className="flex mt-4
         gap-5"
        >
          <span className="bg-orange-600/20 text-red-600 font-medium px-2  rounded-full ">
            {task?.status}
          </span>{" "}
          <span className="px-2  rounded-full bg-red-500/20 text-orange-600 font-medium">
            {task?.priority}
          </span>
        </div>
        <p className="text-sm text-muted mt-4">{task?.dessription}</p>
      </div>
      <div className="py-4 border-b mt-5 flex items-center justify-between border-border">
        <div className="w-[48%] ">
          <h6
            className="font-medium
            capitalize "
          >
            assignee
          </h6>
          <div
            className="flex 
           items-center justify-start mt-2 gap-5"
          >
            <span className="w-10 h-10 rounded-full bg-primary"></span>{" "}
            <h1 className="text-xl text-text font-bold">
              {task?.assignedTo?.name}
            </h1>
          </div>

          <h6 className="mt-5 font-medium">workspace</h6>
          <h3 className="text-xl font-bold mt-2 text-text">
            {task?.workspace?.name}
          </h3>
        </div>
        <div className="w-[48%]">
          <h6 className="font-medium capitalize">due date</h6>
          <p
            className="flex
           items-center gap-5 text-lg font-medium mt-2"
          >
            oct 22 , 2026
          </p>

          <h6 className="mt-5 font-medium capitalize">created by</h6>
          <h1
            className="text-xl font-bold text-accent mt-2
          "
          >
            {task?.createdBy?.name}
          </h1>
        </div>
      </div>
      <div className="w-full mt-5 py-4 border-b border-border">
        <h6 className="text-lg font-medium ">Description</h6>
        <p className="mt-2 text-sm text-muted">{task?.description}</p>
        <h3 className="text-xl text-text font-semibold mt-5">Task Activity</h3>
        <div
          className="w-full mt-5 flex
         flex-col gap-4  "
        >
          {taskActivity.length <= 0 ? (
            <div className="w-full text-center mt-5 text-muted ">
              <p>this task don't have any activity yet</p>
            </div>
          ) : (
          taskActivity.map((item,idx)=>{
            return(  <div
              className="flex
         items-start  gap-5 "
            >
              <BuildingComplex size={18} color="green" />{" "}
              <span>
                <p>{item.action}</p> <p>{formatDistanceToNow(new Date(item.createdAt), {
                        addSuffix: true,
                      })}</p>{" "}
              </span>
            </div>)
          })
          )}
        </div>
      </div>

      <div className="w-full border-b py-4 mt-5 border-border">
        <div className="w-full flex items-center justify-between">
          <h1 className="text-lg font-semibold py-2">Comments</h1>{" "}
          <p>{comments.length} comments</p>{" "}
        </div>
        {comments.length <= 0 ? (
          <div className="w-full text-center mt-5 text-muted ">
            <p>don't have any comment yet</p>{" "}
          </div>
        ) : (
          comments.map((item, idx) => {
            return (
              <div className="w-full  flex my-5 items-start justify-start gap-5 ">
                <div className=" ">
                  <img
                    className="w-10 h-10 rounded-full "
                    src={item?.user?.profile?.profilePic}
                    alt=""
                  />
                </div>
                <div className="w-[80%]  ">
                  <h3 className="text-lg font-medium capitalize">
                    {item?.user?.name}
                  </h3>
                  <p className="text-muted font-medium">{item.content}</p>
                  <span className="flex items-center gap-5">
                    <p>reply</p> <Ellipsis />
                  </span>
                </div>
                <div>
                  {formatDistanceToNow(new Date(item.createdAt), {
                    addSuffix: true,
                  })}
                </div>
              </div>
            );
          })
        )}

        <div className="w-full  flex flex-col items-end gap-5 my-5 ">
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write a Comment.."
            className="w-full resize-none outline-none focus:border-primary border border-border rounded-lg px-4 py-1"
          ></textarea>
          <button
            onClick={commentHandler}
            className="flex  px-4 py-2 bg-dark rounded-lg text-white font-medium cursor-pointer 
           gap-3"
          >
            {" "}
            <Send /> Send Comment
          </button>
        </div>
      </div>
    </div>
  );
}

export default ViewTask;
