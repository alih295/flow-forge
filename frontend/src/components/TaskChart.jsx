import React from "react";

function TaskChart({ taskData }) {


  const data = taskData || {
    todo: 25,
    inProgress: 25,
    completed: 10,
  };

  const maxValue = Math.max(data.todo, data.inProgress, data.completed, 1);

  const bars = [
    {
      label: "Todo",
      count: data.todo,
      barColor: "bg-primary",
      bgColor: "bg-bg-soft",
    },
    {
      label: "In Progress",
      count: data.inProgress,
      barColor: "bg-accent",
      bgColor: "bg-bg-soft",
    },
    {
      label: "Completed",
      count: data.completed,
      barColor: "bg-dark",
      bgColor: "bg-bg-soft",
    },
  ];

  return (
    <section className="w-full  rounded-2xl h-full  ">


      <div className="flex items-end p-5  justify-around h-full w-full gap-4 pt-6 ">
        {bars.map((item, index) => {
          
          const heightPercent = Math.round((item.count / maxValue) * 100);

          return (
            <div
              key={index}
              className="flex flex-col items-center h-full w-20 justify-end gap-2"
            >
              {/* Top Number Badge */}
              <span className="text-sm font-bold text-dark">
                {item.count}
              </span>

              <div
                className={`w-full  relative h-[85%] rounded-t-lg overflow-hidden ${item.bgColor}`}
              >
                {/* Dynamic Height Bar Fill */}
                <div
                  className={`w-full absolute bottom-0 transition-all duration-700 ease-out rounded-t-lg ${item.barColor}`}
                  style={{ height: `${heightPercent}%` }}
                />
              </div>

              {/* Category Label */}
              <span className="text-xs font-semibold text-gray-600 text-center truncate w-full mt-1">
                {item.label}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
export default TaskChart

