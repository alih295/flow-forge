import React from 'react'

function AccoutnInformation() {
  return (
    <section className='w-full border border-border p-2 rounded-xl '>
        <h1 className='text-xl font-semibold my-2'>Account Infromation</h1>
        <div className='w-full flex flex-col items-center gap-4 justify-between'>
            <div className='w-full flex capitalize items-center justify-between'>
                <p className='text-md text-muted'>account status</p> <h6 className='text-lg font-medium'>Active</h6>
            </div>
            <div className='w-full flex
              items-center justify-between'>
                <p className='text-md text-muted'>Joined Date</p> <h6 className='text-lg font-medium'>Nov 16</h6>
            </div>
            <div className='w-full flex items-center justify-between'>
                <p className='text-md text-muted '>Last update</p> <h6 className='text-lg font-medium'>nov 17 , 2026</h6>
            </div>
        </div>
    </section>
  )
}

export default AccoutnInformation