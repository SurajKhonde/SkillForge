import React, { useEffect, useRef, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { BsFillSunFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../Hooks/index";
import { getDeveloperProfile} from "../../Api/Developer"
export default function Header({ onAddDeveloperClick }) {
  const [showOptions, setShowOptions] = useState(false);
  const [Userex, setUser] = useState(false)
  const [Profile, setProfile] = useState({})
  const { toggleTheme } = useTheme();

  const navigate = useNavigate();

  const options = [
    { title: "Resister", onClick: onAddDeveloperClick },
  ];
  useEffect(() => { 
    Alredyresistered();

  }, [])
  async function Alredyresistered() { 
    const { data,profile } = await getDeveloperProfile()
    setUser(data)
    setProfile(profile)
  }
  return (
    <div className="flex items-center justify-end relative p-2 ">    
      <div className="flex items-center space-x-3">
        { !Userex ? (<h1 className="font-bold text-[#D21F3C] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-3xl text-center text-pretty">please resisterd!</h1>):""}
        <button
          onClick={toggleTheme}
          className="dark:text-white text-light-subtle"
        >
          <BsFillSunFill size={24} />
        </button>
        <div>{Userex !== true ? (<button
          onClick={() => setShowOptions(true)}
          className="flex items-center space-x-2 dark:border-dark-subtle border-light-subtle dark:text-dark-subtle text-light-subtle hover:opacity-80 transition font-semibold border-2 rounded text-lg px-3 py-1"
        >
          <span>Resister</span>
          <AiOutlinePlus />
        </button>) : <ThanksNote
            profile={Profile} />}</div>

        <CreateOptions
          visible={showOptions}
          onClose={() => setShowOptions(false)}
          options={options}
        />
      </div>
    </div>
  );
}

const CreateOptions = ({ options, visible, onClose }) => {
  const container = useRef();
  const containerID = "options-container";

  useEffect(() => {
    const handleClose = (e) => {
      if (!visible) return;
      const { parentElement, id } = e.target;

      if (parentElement.id === containerID || id === containerID) return;

      // Old Code (Before React 18)
      // container.current.classList.remove("animate-scale");
      // container.current.classList.add("animate-scale-reverse");

      // New Update
      if (container.current) {
        if (!container.current.classList.contains("animate-scale"))
          container.current.classList.add("animate-scale-reverse");
      }
    };

    document.addEventListener("click", handleClose);
    return () => {
      document.removeEventListener("click", handleClose);
    };
  }, [visible]);

  const handleClick = (fn) => {
    fn();
    onClose();
  };

  if (!visible) return null;

  return (
    <div
      id={containerID}
      ref={container}
      className="absolute right-0 z-50 top-12 flex flex-col space-y-3 p-5 dark:bg-secondary bg-white drop-shadow-lg rounded animate-scale"
      onAnimationEnd={(e) => {
        if (e.target.classList.contains("animate-scale-reverse")) onClose();
        e.target.classList.remove("animate-scale");
      }}
    >
      {options.map(({ title, onClick }) => {
        return (
          <Option key={title} onClick={() => handleClick(onClick)}>
            {title}
          </Option>
        );
      })}
    </div>
  );
};

const Option = ({ children, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="dark:text-white text-secondary hover:opacity-80 transition"
    >
      {children}
    </button>
  );
};


function ThanksNote({ profile}) { 
  return (
    <div className="w-[3rem] h-[3rem] border rounded-full text-center p-1 items-center justify-center flex shadow-xl  z-10 relative">
        <img src={profile.avatar?.url} alt="👶" className="absolute w-fit h-fit rounded-full border-2 border-pink-400 "/>
        <div className="w-3 h-3 rounded-full border bg-green-600 absolute mt-[-3rem] ml-[1.2rem] "></div>
    </div>

  )
}