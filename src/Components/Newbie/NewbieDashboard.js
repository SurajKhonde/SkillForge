import React, { useState,useEffect } from 'react'
import { useNotification } from '../../Hooks';
import { getTask } from '../../Api/Project';
import { takChallange} from '../../Api/Developer';
import NextAndPrevButton from "../Commonpages/NextAndPrevButton";
import ConfirmModal from "../Models/ConfirmModel"
let currentPageNo = 0;
const limit = 3;
export  function NewbieDashboard (){
  const [Project, setProject] = useState([]);
  const[Busy,setBusy]=useState(false)
  const [reachedToEnd, setReachedToEnd] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(null);
   const [showConfirmModal, setShowConfirmModal] = useState(false);
  const { updateNotification } = useNotification();
  const FetchProject = async (pageNo) => {
    const { Task, error } = await getTask(pageNo, limit);
    if (error) return updateNotification("error", error);
    if (!Task.length) {
      currentPageNo = pageNo - 1;
      return setReachedToEnd(true);
    }
    setProject([...Task]);

  };

  const handleOnNextClick = () => {
    if (reachedToEnd) return;
    currentPageNo += 1;
    FetchProject(currentPageNo);
  };
    const handleOnPrevClick = () => {
    if (currentPageNo <= 0) return;
    if (reachedToEnd) setReachedToEnd(false);

    currentPageNo -= 1;
     FetchProject(currentPageNo);
  };
   const handleforApply = (profile) => {
    setSelectedProfile(profile);
    setShowConfirmModal(true);
  };
   
  const handleOnApply = (profile) => { 
    setSelectedProfile(profile);
    setShowConfirmModal(true);
  } 
  const  handleapplyfortask = async () => {
    setBusy(true);
    const { error, message } = await takChallange(selectedProfile);
    setBusy(false);
    if (error) return updateNotification("error", error);
    updateNotification("success",message);
    hideConfirmModal();
  };
  const hideConfirmModal = () => setShowConfirmModal(false);
 

  useEffect(() => {
    FetchProject(currentPageNo);
  }, []);

  return (
    <>
      <div className="p-5">  
      <div className='grid grid-cols-3 gap-5'>
        {Project.map((task) => (
          <TaskProfile
            profile={task}
            key={task.id}
            onAccpect={() => handleOnApply(task.id)}
          />
        )) }
        </div>
        {
          <NextAndPrevButton
           className="mt-5"
            onNextClick={handleOnNextClick}
            onPrevClick={handleOnPrevClick}
          />
        }
      </div>
      <ConfirmModal
        visible={showConfirmModal}
        title="Are you sure?"
        subtitle="!once accepted must compleated "
        busy={Busy}
        onConfirm={handleapplyfortask}
        onCancel={hideConfirmModal}
      />
      </>
    ) 
}

const TaskProfile = ({ profile,onAccpect }) => {
  const acceptedNameLength = 15;


  const getName = (name) => {
    if (name.length <= acceptedNameLength) return name;

    return name.substring(0, acceptedNameLength) + "..";
  };

  const { title, Description, language, poster, type, genres,status,tags } = profile;

  if (!profile) return null;

  return (
    <div className="bg-slate-100 shadow-md dark:shadow-lg dark:bg-secondary rounded-lg overflow-hidden relative">
      <h1 className='right-4 w-[5rem] h-[2rem] border rounded-md p-1 text-center absolute bg-white mt-2'>{status}</h1>
      <button className='right-6 w-[5rem] h-[2rem]  border rounded-md p-1 text-center absolute bg-red-400 hover:font-bold hover:bg-green-400 mt-[10rem]'onClick={onAccpect}>develop</button> 
        <img
          src={poster}
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
