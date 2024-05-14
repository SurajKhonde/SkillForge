import React, { useState, useEffect, useCallback } from 'react'
import { useNotification } from '../../Hooks';
import { getTask, deleteProject} from '../../Api/Project';
import ConfirmModal from '../Models/ConfirmModel';
import NextAndPrevButton from "../Commonpages/NextAndPrevButton"
import {  BsTrash } from "react-icons/bs";
let currentPageNo = 0;
const limit = 4;
export function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [reachedToEnd, setReachedToEnd] = useState(false);
  const [busy, setBusy] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const { updateNotification } = useNotification();

  const fetchProjects = useCallback(async (pageNo) => {
    const { Task, error } = await getTask(pageNo, limit);
    if (error) {
      updateNotification('error', error);
    } else {
      setProjects((prevProjects) => [...prevProjects, ...Task]);
      if (!Task.length) {
        currentPageNo = pageNo - 1;
        setReachedToEnd(true);
      }
    }
  }, [updateNotification]);

  const handleOnNextClick = () => {
    if (reachedToEnd) return;
    currentPageNo += 1;
    fetchProjects(currentPageNo);
  };
    const handleOnPrevClick = () => {
    if (currentPageNo <= 0) return;
    if (reachedToEnd) setReachedToEnd(false);
    currentPageNo -= 1;
      fetchProjects(currentPageNo);
      
  };

  const handleOnDeleteClick = (profile) => {
    setSelectedProfile(profile);
    setShowConfirmModal(true);
  };
   const handleOnDeleteConfirm = async () => {
    setBusy(true);
    const { error, message } = await deleteProject(selectedProject.id);
    setBusy(false);
    if (error) {
      updateNotification('error', error);
    } else {
      updateNotification('success', message);
      setShowConfirmModal(false);
      setProjects((prevProjects) =>
        prevProjects.filter((project) => project.id !== selectedProject.id)
      );
    }
  };

  const hideConfirmModal = () => setShowConfirmModal(false);

  useEffect(() => {
      fetchProjects(currentPageNo);
  }, [fetchProjects]);

  return (
    <>
    <div className="p-5">
      <div className='grid grid-cols-2 gap-5'>
        {projects.map((task) => (
          <TaskProfile
            profile={task}
            key={task.id}
             onDeleteClick={() => handleOnDeleteClick(task)}
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
        subtitle="This action will remove this profile permanently!"
        busy={busy}
        onConfirm={handleOnDeleteConfirm}
        onCancel={hideConfirmModal}
      /> 


      </>
    ) 
}

const TaskProfile = React.memo(({ profile, onEditClick ,onDeleteClick}) => {
  const [showOptions, setShowOptions] = useState(false);
  const acceptedNameLength = 15;

  const handleOnMouseEnter = () => {
    setShowOptions(true);
  };

  const handleOnMouseLeave = () => {
    setShowOptions(false);
  };

  const getName = useCallback((name) => {
    if (name.length <= acceptedNameLength) return name;

    return name.substring(0, acceptedNameLength) + "..";
  }, []);

  const { title, Description, language, poster, type, genres,status, tags } = profile;

  if (!profile) return null;

  return (
    <div className="bg-white shadow-md dark:shadow-lg dark:bg-secondary rounded-lg overflow-hidden">
      <div
        onMouseEnter={handleOnMouseEnter}
        onMouseLeave={handleOnMouseLeave}
        className="flex cursor-pointer relative"
      >
        <h1 className='right-4 w-[5rem] h-[2rem] border rounded-md p-1 text-center absolute bg-white mt-2'>{status}</h1>
        <img
          src={poster}
          alt={title}
          className="w-[7rem] h-[7rem] ml-4 mt-3 aspect-square object-cover rounded-lg"
        />

        <div className="p-4 flex flex-col justify-between">
          <div>
            <h1 className="text-primary dark:text-white font-semibold mt-1">
              <span className="text-blue-500">Project Name:</span>{" "}
              {getName(title)}
            </h1>
            <p className="text-primary dark:text-white mt-1">
              <span className="text-blue-400">P.Language:</span>{" "}
              {language}
            </p>
            <p className="text-primary dark:text-white mt-1">
              <span className="text-blue-300">Requirement:</span> {type}
            </p>
            <div className="flex flex-wrap gap-1 mt-1">
              <p className="text-primary dark:text-teal-400 font-medium">
                Tech_Used:
              </p>
              <p className="text-primary dark:text-white font-mono">
                {genres.join(", ")}
              </p>
            </div>
            <div className="flex flex-wrap gap-1 mt-1">
              <p className="text-primary dark:text-red-500 font-medium">
                NonMandatory:
              </p>
              <p className="text-primary dark:text-white font-mono">
                { tags.join(", ")}
              </p>
            </div>
            <div className="max-h-20 overflow-hidden mt-1 ml-[-8rem] ">
              <p className="text-primary dark:text-white opacity-70 flex">
                <p className="text-primary dark:text-sky-400 font-medium">
                  Description:
                </p>
                {Description.substring(0, 100)}...
              </p>
            </div>
          </div>

          <Options
            onEditClick={onEditClick}
            onDeleteClick={onDeleteClick}
            visible={showOptions}
          />
        </div>
      </div>
    </div>
  );
});

const Options = ({ visible, onDeleteClick, onEditClick }) => {
  if (!visible) return null;

  return (
    <div className="absolute inset-0 bg-primary bg-opacity-25 backdrop-blur-sm flex justify-center items-center space-x-5">
      <button
        onClick={onDeleteClick}
        className="p-2 rounded-full bg-white text-primary hover:opacity-80 transition"
        type="button"
      >
        <BsTrash />
      </button>

    </div>
  );
};


