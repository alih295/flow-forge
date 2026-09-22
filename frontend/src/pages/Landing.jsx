import React from "react";
import { Link } from "react-router-dom";
import MocHeader from "../components/MockHeader";

function Landing() {
  return (
    <main className="w-full font-[montserat]  flex flex-col items-center justify-between h-screen">
      <MocHeader/>
     <div className='w-full px-10 min-h-[80vh] gap-6 flex flex-col justify-center items-start'>
  <h1 className='flex flex-col gap-1 font-semibold leading-tight'>
    <span className='text-[3vw] text-(--text-primary) font-bold'>
      Great Outcomes
    </span>
    <span className='underline text-(--color-anvil-blue'>
      Start With
    </span>
    <span className='text-(--color-forge-orange) font-bold text-[7vw] leading-none'>
      Flowforge
    </span>
  </h1>

  <p className='text-sm text-(--text-secondary) max-w-xl'>
    the only project management tool you need to plan and track work across every team
  </p>

  <Link 
    to='/signup' 
    className='w-fit px-6 py-2 rounded-full primary-btn text-lg font-semibold inline-block'
  >
    Get Started
  </Link>
</div>
    </main>
  );
}

export default Landing;
