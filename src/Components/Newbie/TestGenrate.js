import React, { useEffect, useState } from 'react'
import { GetExamPaper } from '../../Api/Exam'

const TestGenrate = () => {
  const[ExamData,setExamData]=useState(null)
  useEffect(() => {
   
    examData(); 
  }, []);
   async function examData(){
      const { data } = await GetExamPaper();
      setExamData(data);
    };
  console.log(ExamData);
  if (! ExamData) { 
    return (
      <div className='inset-0 fixed bg-pink-200 justify-center items-center flex '>
        <h1 className='text-2xl'>Please wait.... </h1>
      </div>
    )
  }
  return (
    <div>TestGenrate</div>
  )
}

export default TestGenrate