import React, { useState } from 'react';
import { Assignment } from './Assignment';
import Testprep from './Testprep';

const PracticeGround = () => {
  // State to manage the active button
  const [activeButton, setActiveButton] = useState(null);

  // Function to handle button click
  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  return (
    <>

    <div className='w-[14rem] h-[2rem] rounded-lg shadow-2xl bg-gray-200 ml-5 flex'>
      <button
        className={`w-[8rem] h-full rounded font-semibold text-xl text-black border-r-2  focus:outline-none ${
          activeButton === 'Assignment' ? 'bg-[#E07DAB]' : 'bg-gray-300'
        }`}
        style={{ fontSize: activeButton === 'Assignment' ? '1.2rem' : '1rem' }}
        onClick={() => handleButtonClick('Assignment')} // Set 'Exam' as active button on click
      >
        Assignment
      </button>
      <button
        className={`w-[6rem] h-full rounded-r-lg font-semibold text-xl text-black focus:outline-none ${
          activeButton === 'Test' ? 'bg-[#E07DAB]' : 'bg-gray-300'
        }`}
        style={{ fontSize: activeButton === 'Test' ? '1.2rem' : '1rem' }}
        onClick={() => handleButtonClick('Test')}
      >
        Test
      </button>
    </div>
      <div>
        { activeButton==='Test'? <Testprep/>:<Assignment/>}
      </div>
      </> 
  );
};

export default PracticeGround;
