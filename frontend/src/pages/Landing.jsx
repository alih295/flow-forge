import React from 'react'
import Header from '../components/Header'

function Landing() {
  return (
    <main className='w-full h-screen bg-(--bg-primary)'>
        <Header/>
        <div className='w-full h-150 gap-10 flex flex-col items-center justify-center '>
            <h1 className='text-3xl font-semibold '><span className='text-4xl text-(--text-primary) font-bold'>Great Outcomes</span> Start With Flowforge</h1>
        <p className='text-sm text-(--text-secondary)'>the only project management tool you need to plan and track work accross avery team</p>
        <button className='px-6 py-2 bg-(--btn-secondary-bg) rounded-full text-(--btn-secondary-text) text-lg font-semibold hover:bg-(--btn-secondary-hover) cursor-pointer'>Get Started</button>
        </div>
    </main>
  )
}

export default Landing