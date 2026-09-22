import React from 'react'

function AdminDashboard() {
  return (
    <div className='w-full p-5 h-full'>
      <h1 className='text-3xl text-(--text-primary) font-semibold'> 
        Projects Overview</h1>
        <div className='w-full h-[55vh] flex items-center justify-between  mt-5 '>
          <div className='w-[60%] h-full bg-(--color-anvil-blue) rounded-xl'></div>
          <div className='w-[39%] flex items-center flex-col justify-between h-full '>
          <div className='w-full h-[48%] bg-(--color-forge-orange) rounded-xl'></div>
          <div className='w-full h-[48%] bg-(--color-flow-cyan) rounded-xl'></div>

          </div>
        </div>
    </div>
  )
}

export default AdminDashboard