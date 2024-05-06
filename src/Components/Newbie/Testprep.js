import React from 'react'
import "../../SpecificCss/Landingpage.css";
import Images from "./Images/2151306605.jpg"

export function Testprep(){
  return (
      <div className='flex items-center justify-center w-full h-full mt-[10rem]'>
          <div className="text-black dark:text-white text-3xl font-bold  font-serif flex-col ">
        <span className="inline-block animate-writing ">we are <span className='text-[#B23157]'>developing</span> this part very soon be with us ......</span>
        <img src={ Images} className='w-[15rem] h-[15rem] rounded-lg shadow-2xl ml-[10rem] shadow-orange-500 drop-shadow-xl' />
          </div>

    </div>
  )
};

export default Testprep