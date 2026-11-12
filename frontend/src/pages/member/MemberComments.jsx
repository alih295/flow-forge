import { Filter, Search } from "lucide-react";
import React from "react";
import CommentsCard from "../../components/member/comments/CommentsCard";

function MemberComments() {
  return (
    <section className="w-full min-h-screen flex flex-col gap-10 p-6 ">
      <div className="w-full">
        <h1 className="text-xl text-text font-bold">Comments</h1>
        <p className="text-muted mt-2 text-sm">
          Stay connected with your team's discussions.
        </p>
      </div>
      <div className="w-full flex border border-border rounded-xl px-4 py-2 items-center  justify-between">
        <div className="flex flex-1 items-center justify-center gap-4  ">
          <span className="shrink-0">
            <Search size={18} />
          </span>{" "}
          <input
            type="search"
            className="w-full outline-none"
            placeholder="Search comments.."
          />
        </div>{" "}
        <span className="flex shrink-0">
          <Filter size={18} />
        </span>
      </div>
      <div className="w-full flex items-center capitalize justify-start gap-3 ">
        <span className="px-2 bg-blue-600/20 rounded-full text-blue-600 font-semibold">
          all comments
        </span>
        <span className="px-2 bg-black/20 rounded-full text-white font-semibold">
          My comments
        </span>
        <span className="px-2 bg-black/20 rounded-full text-white font-semibold">
          Mention comments
        </span>
      </div>

      <div className="w-full flex flex-col gap-4">
        <CommentsCard />
        <CommentsCard />
      </div>
    </section>
  );
}

export default MemberComments;
