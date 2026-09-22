import React from 'react'

function Header({user}) {
  return (
    <header
        className="w-full h-20 
        z-10 px-10 flex items-center justify-between bg-(--bg-secondary)"
      >
        <img className=" h-15 " src="../../public/images/screen.png" alt="" />
        <h1 className="text-xl font-semibold text-(--text-primary)">
          Welcome <br />{" "}
          <span className="font-bold text-2xl text-(--color-forge-orange)">
            {user.name}
          </span>{" "}
          👋{" "}
        </h1>
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
      </header>
  )
}

export default Header