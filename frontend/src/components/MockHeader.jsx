import React from "react";
import { Link } from "react-router-dom";

function MocHeader() {
  return (
    <header className="w-full flex items-center justify-between px-5 py-2   bg-(--bg-secondary)">
      <img className="h-15 " src="/images/screen.png" alt="" />
      <nav className="flex">
        <ul className="flex font-semibold items-center justify-center gap-4">
          <li className="hover:text-(--text-primary) cursor-pointer">
            Feature
          </li>
          <li className="hover:text-(--text-primary) cursor-pointer">
            Project Guide
          </li>
          <li className="hover:text-(--text-primary) cursor-pointer">
            Templetes
          </li>
          <li className="hover:text-(--text-primary) cursor-pointer">
            Pricing
          </li>
          <li className="hover:text-(--text-primary) cursor-pointer">
            Enterprise
          </li>
        </ul>
      </nav>
      <div>
        <Link to={'/login'} className="px-6 py-2 bg-(--btn-primary-bg) rounded text-(--btn-primary-text) text-lg hover:bg-(--btn-primary-hover)  cursor-pointer ">
          Sign In
        </Link>
      </div>
    </header>
  );
}

export default MocHeader;
