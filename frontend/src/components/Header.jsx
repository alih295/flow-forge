import React from 'react'
import {Bell} from 'lucide-react'


function Header({user}) {
  return (
    <header
        className="w-full h-20 
        z-10 px-10 flex items-center justify-between shadow
          bg-bg-soft"
      >
        <img className=" h-15 " src="../../public/images/screen.png" alt="" />
        <div className='w-[70%] flex items-center justify-end gap-5'>
          <input className='w-50 px-4 py-2 border-border rounded-lg outline-none shadow  ' type="search" placeholder='Search' />
          <div className='w-15 cursor-pointer text-xl flex items-center justify-center  rounded-full h-15 '><Bell /></div>
        
        <div className="w-15 h-15 overflow-hidden rounded-full ">
          {user.profile.profilePic ? (
            <img
              className="w-full h-full obgect-cover "
              src={user.profile.profilePic}
              alt=""
            />
          ) : (
            <img
              className="w-full h-full obgect-cover "
              src="https://img.magnific.com/premium-vector/icono-perfil-simple-color-blanco-icon_1076610-50204.jpg"
            />
          )}
        </div>
        </div>
      </header>
  )
}

export default Header