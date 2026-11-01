import React from 'react'
import { LoaderPinwheel } from 'lucide-react'

function Loader() {
  return (
   <section className='w-full h-full
    flex items-center p-2 justify-center' >
   <div className='    flex items-center justify-center'> 
    <LoaderPinwheel size={40} className=' animate-spin' />
   </div>
   </section>
  )
}

export default Loader