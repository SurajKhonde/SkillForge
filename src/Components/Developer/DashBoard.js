import React, { useEffect, useState } from 'react'
import Selector from '../../CommonComponents/Selector'
import { BsPencilSquare, BsTrash } from "react-icons/bs";
import NextAndPrevButton from "../Commonpages/NextAndPrevButton"
import {typeOptions,
} from "../../Utils/options";
import { UseDev } from '../../Hooks';
let currentPageNo = 0;
const techSelector = {
  type:""
}
const DashBoardofDeveloper = () => {
  const [Data, setData] = useState({ ...techSelector })
  
  
  function handlechange({ target }) {
    const { value } = target;
    setData(value);
  }
  const {      fetchdeveloper,
               Developer,
                fetchPrevPage,
                fetchNextPage,
                 }
    = UseDev();
  useEffect(() => { 
    fetchdeveloper(currentPageNo)
  }, [])
    const NewProfile= Developer.filter((profile) => {
      return profile.type === Data;
    })


  const { type } = Data;
  return (
    <div className=' inset-0 relative'>
      <div className='   left-[1rem]  absolute'>
        <Selector
          onChange={handlechange}
          name="type"
          value={type}
          options={typeOptions}
          label="developer"
        />
      </div>
        <div className="p-5">
      <div className='grid grid-cols-2 gap-x-5 '>
          {NewProfile.length===0 ? 
            (Developer.map((task) => (
          <TaskProfile
            profile={task}
            key={task.id}
          />
            )) ): (
              NewProfile.map((task) => (
          <TaskProfile
            profile={task}
            key={task.id}
          />
        ))
        ) }
        </div>
        {
          <NextAndPrevButton
           className="mt-5"
            onNextClick={fetchNextPage}
            onPrevClick={fetchPrevPage}
          />
        }
    
      </div>
    </div>
  )
}
const TaskProfile = ({ profile, onEditClick }) => {
  const [showOptions, setShowOptions] = useState(false);
  const acceptedNameLength = 18;

  const handleOnMouseEnter = () => {
    setShowOptions(true);
  };

  const handleOnMouseLeave = () => {
    setShowOptions(false);
  };

  const getName = (name) => {
    if (name.length <= acceptedNameLength) return name;

    return name.substring(0, acceptedNameLength) + "..";
  };

  const { title, Description, bhashya, avatar, type, genres,status, tags } = profile;

  if (!profile) return null;

  return (
    <div className="bg-white shadow-xl shadow-slate-500 dark:shadow-lg  dark:bg-secondary rounded-lg overflow-hidden  mt-10">
      <div
        onMouseEnter={handleOnMouseEnter}
        onMouseLeave={handleOnMouseLeave}
        className="flex cursor-pointer relative"
      >
        <h1 className='right-4 w-[6rem] h-[2rem] border rounded-xl p-1  text-center absolute bg-yellow-100 font-bold  mt-2'>{status}</h1>
        <img
          src={avatar}
          alt={title}
          className="w-[8rem] h-[9rem] ml-4 mt-3 aspect-square object-cover rounded-lg dark:border-white  border-gray-300 border-2 "
        />

        <div className="p-4 flex flex-col justify-between">
          <div>
            <h1 className="text-primary dark:text-white font-semibold mt-1">
              <span className="text-blue-500">Coder Name:</span>{" "}
              {getName(title)}
            </h1>
            <p className="text-primary dark:text-white mt-1">
              <span className="text-blue-400">👨‍💻Language:</span>{" "}
              {bhashya}
            </p>
            <p className="text-primary dark:text-white mt-1">
              <span className="text-blue-300">🐱‍🏍Experties:</span> {type}
            </p>
            <div className="flex flex-wrap gap-1 mt-1">
              <p className="text-primary dark:text-teal-400 font-medium">
                Cuisine:
              </p>
              <p className="text-primary dark:text-white font-mono">
                {genres.join(",").substring(0,50)}
              </p>
            </div>
            <div className="flex flex-wrap gap-1 mt-1">
              <p className="text-primary dark:text-red-500 font-medium">
                LoveTodo:
              </p>
              <p className="text-primary dark:text-white font-mono">
                { tags.join(",")}
              </p>
            </div>
            <div className="max-h-20 overflow-hidden mt-1 ml-[-8rem] ">
              <p className="text-primary dark:text-white opacity-70 flex">
                <p className="text-primary dark:text-sky-400 font-medium">
                  Description:
                </p>
                {Description.substring(0,150)}...
              </p>
            </div>
          </div>

          <Options
            onEditClick={onEditClick}
            visible={showOptions}
          />
        </div>
      </div>
    </div>
  );
};

const Options = ({ visible,onEditClick }) => {
  if (!visible) return null;

  return (
    <div className="absolute inset-0 bg-primary bg-opacity-25 backdrop-blur-sm flex justify-center items-center space-x-5">
      <button
        onClick={onEditClick}
        className="p-2 rounded-full bg-white text-primary hover:opacity-80 transition"
        type="button"
      >
        <BsPencilSquare />
      </button>
    </div>
  );
};
export default DashBoardofDeveloper;