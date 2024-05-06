import React, { useEffect, useState } from 'react';
import { useNotification } from '../../Hooks/index.js';
import { useAuth } from '../../Hooks/index.js';
import { AllProject } from '../../Api/Project.js';
import { userAssignment } from '../../Api/Developer.js';
export function Assignment() {
  const [UserInfo, SetUserInfo] = useState(null)
  const [allProject, SetallProject] = useState()
  const [DeveloperAssigment, SetDeveloperAssignment] = useState([]);
  const { authInfo}= useAuth();
  useEffect(() => {
    SetUserInfo(authInfo)
    getProject();
    DeveloperAssignment();
    
  }, []);
  async function getProject() { 
    const getProject = await AllProject();
    SetallProject(getProject.Task);
  };
  async function DeveloperAssignment() { 
    const DeveloperAssignments = await userAssignment(); 
    SetDeveloperAssignment(DeveloperAssignments.User?.task);
  };

  function FetctData() { 
    const Data = DeveloperAssigment?.map((data) => { 
      const NewData = allProject?.filter((justData) => {
        return data=== justData._id

      });
      return NewData?.[0]
    })
     return Data;
  }
  const data = FetctData();
  return (
    <div className=' w-full [95%] border-white border-5 flex justify-center items-center dark:text-white text-black mt-10 ml-5'>
      {UserInfo === null ? <TestPage/> :
        <TaskSheet
          task={ data}
           />}
    </div>
  )
}



function TaskSheet({ task }) {
  return (
    <>
      <div className="">
      <div className='grid grid-cols-3 gap-5'>{
        task?.map((project) => (
          <TaskProfile
            profile={project}
            key={project?._id}
           />
          ))}
        </div>
      </div>

    </>  
  )
  
}
const TaskProfile = ({ profile }) => {
  const acceptedNameLength = 15;
console.log(profile)

  const getName = (name) => {
    if (name.length <= acceptedNameLength) return name;

    return name.substring(0, acceptedNameLength) + "..";
  };
  if (!profile) return null;

  const { title, Description, language, poster, type, genres,status,tags } = profile;

  

  return (
    <div className="bg-slate-100 shadow-md dark:shadow-lg dark:bg-secondary rounded-lg overflow-hidden relative">
      <h1 className='right-4 w-[5rem] h-[2rem] border rounded-md p-1  mt-5 text-center absolute bg-white dark:text-black '>{status}</h1>
      {/* <button className='right-6 w-[5rem] h-[2rem]  border rounded-md p-1 text-center absolute bg-red-400 hover:font-bold hover:bg-green-400 mt-[10rem]'onClick={onAccpect}>develop</button>  */}
        <img
          src={poster.url}
          alt={title}
          className="w-[80%] h-[7rem] ml-3 mt-3 aspect-square object-cover rounded-lg"
        />

        <div className="p-4 flex flex-col justify-between">
          <div>
            <h1 className="text-primary dark:text-white font-semibold mt-1">
              <span className="text-blue-600">Project Name:</span>{" "}
              {getName(title)}
            </h1>
            <p className="text-primary dark:text-white mt-1">
              <span className="text-blue-500">P.Language:</span>{" "}
              {language}
            </p>
            <p className="text-primary dark:text-white mt-1">
              <span className="text-blue-400">Requirement:</span> {type}
            </p>
            <div className="flex  gap-1 mt-1">
              <p className="text-primary dark:text-blue-400 font-medium">
                Ingredient:
              </p>
              <p className="text-primary dark:text-white font-mono text-sm break-all">
                {genres.join(",")}
              </p>
            </div>
            <div className="flex flex-wrap gap-1 mt-1">
              <p className=" dark:text-blue-400 font-medium">
                EdageSkill:
              </p>
              <p className="text-secondary dark:text-white font-mono text-sm break-all">
                { tags.join(",")}
              </p>
            </div>
          <div className="h-16 mt-1 flex ">
            <span className='font-bold  dark:text-blue-400'>  Description:</span>
              <p className="text-black dark:text-white opacity-70 flex overflow-y-scroll ">
                {Description}
              </p>
            </div>
          </div>
        </div>
        </div>
  );
};

function TestPage() { 
  return (
    <>
      <div className='w-fit h-fit'>
        { <img src='https://images.unsplash.com/photo-1532622785990-d2c36a76f5a6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D 'className='w-fit h-fit'/>}
      </div>
    </>
  )
}