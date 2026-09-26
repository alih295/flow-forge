import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

function Aside({ data }) {
  const location = useLocation();
  const [current, setCurrent] = useState(null);

  return (
    <aside
      className="min-w-[15%] bg-bg font-Montserrat overflow-auto  shadow-[10px_0_15px_-3px_rgba(0,0,0,0.1)] h-full px-5 py-5
     flex flex-col gap-2   "
    >
      <h1 className="text-3xl text-text mb-5 font-bold ">FlowForge</h1>
      {data.map((section, sectionIdx) => {
        // Check karein kya is section ka koi bhi item abhi active hai
        const isSectionActive = section.items.some(
          (subItem) => subItem.link === location.pathname,
        );

        return (
          <div key={sectionIdx} className="w-full mb-2">
            
            <h1
              className={`text-xl font-semibold p-2 rounded px-2 ${
                isSectionActive ? "bg-accent text-white" : "text-text"
              }`}
            >
              {section.section}
            </h1>

            <div className="w-full ml-3">
              {section.items.map((subItem) => {
                const isLinkActive = location.pathname === subItem.link;

                return (
                  <div key={subItem.id} className="w-full mt-2">
                    {/* Active Link Highlight */}
                    <Link
                      to={subItem.link}
                      className={`inline-block w-full text-lg px-4  rounded-lg transition-colors ${
                        isLinkActive
                          ? "font-bold  text-accent "
                          : "text-black hover:bg-gray-100"
                      }`}
                    >
                      {subItem.name}
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </aside>
  );
}

export default Aside;
