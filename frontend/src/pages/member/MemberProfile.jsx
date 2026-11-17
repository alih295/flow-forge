import { User } from 'lucide-react'
import React from 'react'

function MemberProfile() {
  return (
    <section className='w-full flex flex-col gap-10 min-h-screen p-6'>
        <header className='w-full bg-bg p-2
        rounded-xl border border-border '>
            <div className='w-full flex items-center justify-between'>
                <h1 className='text-xl text-text font-semibold'>My Profile</h1>
                <span className='px-2 bg-green-500/10 rounded-full text-green-600 font-medium'>Active</span>
            </div>
            <div className='w-full flex items-center gap-4 mt-4
             justify-between '>
                <span className='w-20 h-20 flex items-center justify-center text-white
                 shrink-0 rounded-full bg-gray-900'>
                    <User size={48}/>
                </span>
                <div className='flex flex-1 gap-1 flex-col '>
                    <h1 className='text-lg font-bold text-accent'>Ali Haider</h1>
                    <p className='text-sm text-muted'>ali@ali.com</p>
                    <span className=' w-25 rounded-full text-white font-medium text-center bg-gray-800/40 '>member</span>
                </div>
                <button className='px-2 rounded-full bg-blue-600/20 text-blue-500 font-medium cursor-pointer'>Edit profile</button>
            </div>
        </header>
        <div className='w-full'>
            <h1>Personal information</h1>
              <div className='w-full flex  mt-4  items-center justify-between'>
                <div className='w-[49%] px-2 rounded-xl  bg-bg py-4'>
                    <p className='text-sm text-muted'>full name</p>
                    <h1 className='text-lg font-semibold'>Ali hiader</h1>

                    <p className='text-sm mt-2 text-muted'>email</p>
                    <h1 className='text-lg font-semibold'>ali@ali.com</h1>
                </div>

                <div className='w-[49%] border px-2  border-border rounded-xl py-4 '>
                   <p className='text-sm text-muted'>Username</p>
                    <h1 className='text-lg lowercase font-semibold'>Ali hiader</h1>

                    <p className='text-sm mt-2 text-muted'>role</p>
                    <h1 className='text-lg font-semibold'>Member</h1>
                </div>
                </div>  
        </div>
    </section>
  )
}

export default MemberProfile