import React from 'react'

function RecentActivity() {
  return (
    <div className='w-full mt-10'>
        <h1 className='text-xl font-bold text-text'>Recent Activity</h1>
        <div className='w-full px-4 mt-2 py-2
         relative border-l '>
            <span className='w-4   h-4 absolute top-3 -left-2 rounded-full bg-gray-400'></span>
            <h5 className='text-lg font-medium'>Completed a task</h5>
        </div>
        <div className='w-full mt-2 px-4 py-2
         relative border-l '>
            <span className='w-4   h-4 absolute top-3 -left-2 rounded-full bg-gray-400'></span>
            <h5 className='text-lg font-medium'>Completed a task</h5>
        </div>

    </div>
  )
}

export default RecentActivity