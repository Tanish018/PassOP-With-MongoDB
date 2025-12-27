import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-transparent backdrop-blur-2xl md:backdrop-blur-[0] text-white'>
        <div className="myContainer flex justify-between items-center px-4  py-5 h-20">
          <div className="logo font-bold md:text-[40px] text-[35px] cursor-pointer">
            <span className='text-green-600'>&lt;</span>
            Pass
            <span className='text-green-600'>OP/&gt;</span>
          </div>
          <div className="gitlogo">
            <a href="https://github.com/Tanish018" target='_blank'><img className='h-9' src="/icons/github.svg" alt="" /></a>
          </div>
        </div>
    </nav>
  )
}

export default Navbar