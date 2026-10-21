import { BuildingComplex, Ellipsis, SquarePen, X , Send } from "lucide-react";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

function ViewTask() {
  const {id} = useParams()
  useEffect(() => {
    const getTaskById = async()=>{
      try{

      }catch(err){
        console.error(err.message)
      }finally{
        
      }
    }
  
    
  }, [id])
  
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
      <div className="w-full py-5 mt-5 border-b border-border ">
        <h1 className="text-xl text-text font-semibold capitalize">title</h1>
        <div
          className="flex mt-4
         gap-5"
        >
          <span className="bg-orange-600/20 text-red-600 font-medium px-2  rounded-full ">
            inprogress
          </span>{" "}
          <span className="px-2  rounded-full bg-red-500/20 text-orange-600 font-medium">
            high priority
          </span>
        </div>
        <p className="text-sm text-muted mt-4">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure!
        </p>
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
            <h1 className="text-xl text-text font-bold">Ali haider</h1>
          </div>

          <h6 className="mt-5 font-medium">workspace</h6>
          <h3 className="text-xl font-bold mt-2 text-text">workspace title</h3>
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
            project admin
          </h1>
        </div>
      </div>
      <div className="w-full mt-5 py-4 border-b border-border">
        <h6 className="text-lg font-medium ">Description</h6>
        <p className="mt-2 text-sm text-muted">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sit at vero,
          vel obcaecati tempora qui!
        </p>
        <h3 className="text-xl text-text font-semibold mt-5">Task Activity</h3>
        <div
          className="w-full mt-5 flex
         flex-col gap-4  "
        >
          <div
            className="flex
         items-start  gap-5 "
          >
            <BuildingComplex size={18} color="green" />{" "}
            <span>
              <p>recent acitivity loader</p> <p>today 10:03 AM</p>{" "}
            </span>
          </div>
          <div
            className="flex
         items-start  gap-5 "
          >
            <BuildingComplex size={18} color="green" />{" "}
            <span>
              <p>recent acitivity loader</p> <p>today 10:03 AM</p>{" "}
            </span>
          </div>
          <div
            className="flex
         items-start  gap-5 "
          >
            <BuildingComplex size={18} color="green" />{" "}
            <span>
              <p>recent acitivity loader</p> <p>today 10:03 AM</p>{" "}
            </span>
          </div>
        </div>
      </div>

      <div className="w-full border-b py-4 mt-5 border-border">
        <div className="w-full flex items-center justify-between">
          <h1 className="text-lg font-semibold py-2">Comments</h1>{" "}
          <p>2 comments</p>{" "}
        </div>
        <div className="w-full flex my-5 items-start justify-start gap-5 ">
          <div className=" ">
            <img
              className="w-10 h-10 rounded-full "
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHJledMhjF7IrtkQ3on2ijaN-LDDXIIsKVp2hUwWjahKAifRI7qktkYKI&s=10"
              alt=""
            />
          </div>
          <div className="w-[80%]  ">
            <h3 className="text-lg font-medium capitalize">ali haider</h3>
            <p className="text-muted font-medium">
              mobile menu ka layout check kr lena
            </p>
            <span className="flex items-center gap-5">
              <p>reply</p> <Ellipsis />
            </span>
          </div>
          <div>10 min ago</div>
        </div>
       
        <div className="w-full  flex flex-col items-end gap-5 my-5 ">
          <textarea placeholder="Write a Comment.." className="w-full resize-none outline-none focus:border-primary border border-border rounded-lg px-4 py-1"></textarea>
          <button className="flex  px-4 py-2 bg-dark rounded-lg text-white font-medium cursor-pointer 
           gap-3"> <Send /> Send Comment</button>
        </div>
      </div>
    </div>
  );
}

export default ViewTask;
