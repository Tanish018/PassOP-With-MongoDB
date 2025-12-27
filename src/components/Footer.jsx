import React from 'react'

const Footer = () => {
  return (
    <div className='text-white flex flex-col items-center justify-around bg-transparent gap-1 backdrop-blur-2xl  w-full'>
        <div>
            <div className="logo font-bold text-[40px] cursor-pointer">
            <span className='text-green-600'>&lt;</span>
            Pass
            <span className='text-green-600'>OP/&gt;</span>
          </div>
        </div>
        <div className='text-[18px] font-medium mb-1'>
            Created with ❤️ by <a href="https://www.linkedin.com/in/tanish-rathore-98b2391ba/" target='_blank' className=''>Tanish Rathore</a>
        </div>
    </div>
  )
}

export default Footer
