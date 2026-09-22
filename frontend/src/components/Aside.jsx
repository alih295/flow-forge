import React from 'react'
import { Link } from 'react-router-dom';

function Aside({data}) {
  return (
    <aside className="min-w-[15%] bg-(--bg-primary) shadow-[10px_0_15px_-3px_rgba(0,0,0,0.1)] h-full px-5  py-10  flex flex-col gap-5 items-center  ">
          {data.map((item, idx) => {
            return (
              <Link to={item.link}
                key={idx}
               className={`w-full text-lg rounded-lg hover:bg-(--color-forge-orange) hover:text-white transition-colors duration-300 ease-in-out capitalize font-semibold px-5 py-2 text-(--color-forge-orange) ${
  location.pathname === item.link ? 'bg-(--color-forge-orange) text-white' : ''
}`}
              >
                <h6>{item.name}</h6>
              </Link>
            );
          })}
        </aside>
  )
}

export default Aside