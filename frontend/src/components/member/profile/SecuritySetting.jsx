import { ChevronRight, Lock } from 'lucide-react'
import React from 'react'

function SecuritySetting() {
  return (
    <section className='w-full  p-2 py-4 rounded-xl '>
        <h1 className='text-xl font-semibold my-2 capitalize'>Security settings</h1>

            <div className='w-full cursor-pointer group bg-white rounded-xl p-2 flex mt-4
             items-center justify-between gap-2'>
                <span className='flex shrink-0 w-10 h-10 items-center justify-center'><Lock size={18}/></span>
                <div className='flex flex-1 flex-col'>
                    <h1 className='text-lg font-semibold capitalize'>change password</h1>
                    <p className='text-muted mt-2'> Update your account password</p>
                </div>
                <span className='flex  shrink-0 items-center justify-center'><ChevronRight className='group-hover:translate-x-1 duration-300 transition-translate' size={15}/></span>
            </div>
        
    </section>
  )
}

export default SecuritySetting