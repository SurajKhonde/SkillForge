import React, { useState } from "react";
import { ImSpinner3 } from "react-icons/im";
import Label from "./Label.js";
import { commonInputClasses } from "../../Utils/theme.js";
import { MdCancelScheduleSend } from "react-icons/md";

const defaultQuestionset = {
  question: "",
  answer: [],
  trueans: ""
};

export default function QuestionSet({ onSubmit, visible, onClose, busy, btnTitle }) {
  const [inputValue, setInputValue] = useState("");
  const [list, setList] = useState([]);
  const [QuestionSet, setQuestionSet] = useState({ ...defaultQuestionset });

  const handleChangeforAns = ({ target }) => {
    setInputValue(target.value);
  };

  const handleAns = (e) => {
    e.preventDefault();
    if (inputValue.trim() !== "") {
      setList([...list, inputValue]);
      setInputValue("");
    }
  };

  const handleClose = () => {
    onClose();
  };

  const handleChange = ({ target }) => {
    const { value, name } = target;
    setQuestionSet(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (list.length !== 0) {
      const updatedQuestionSet = { ...QuestionSet, answer: list };
      onSubmit(updatedQuestionSet);
      setQuestionSet(defaultQuestionset); // Reset the question set
      setList([]); // Clear the list of answers
      onClose();
    }
  };

  const handleDelete = (index) => {
    const newList = [...list];
    newList.splice(index, 1);
    setList(newList);
  };

  const { question, trueans } = QuestionSet;

  if (!visible) return null;

  return (
    <form visible={visible} onClose={handleClose} onSubmit={handleSubmit}
      className="fixed inset-0 dark:bg-white dark:bg-opacity-50 bg-primary bg-opacity-50 backdrop-blur-sm flex items-center justify-center">
      <div className="w-[25rem] h-min rounded bg-white ">
        <div className="p-5 font-serif">
          <Label htmlFor="title" className="dark:text-black mb-2">Question</Label>
          <input
            id="question"
            value={question}
            onChange={handleChange}
            name="question"
            type="text"
            className={
              commonInputClasses + " border-b-2 font-bold text-blue-800 text-base"
            }
            placeholder="Add your Question"
          />
        
          <div className="flex items-center mt-3">
            <input
              type="text"
              value={inputValue}
              onChange={handleChangeforAns}
              placeholder="   ...Add Answer"
              className="flex-1 rounded-l-md px-4 py-2 border text-gray-800 border-pink-200 bg-white "
            />
            <button
              type="submit"
              className="px-6 py-2 bg-[#FF5E69] text-white rounded-r-md hover:bg-[#FF6A3D] focus:outline-none focus:bg-[#259B9A]" onClick={handleAns}
            >
              Answer
            </button>
          </div>
          <div>
            <div className="mt-[2rem]">
              <Label htmlFor="title" className="dark:text-black mb-2">TrueAnswer</Label>
              <input
                id="trueans"
                value={trueans}
                onChange={handleChange}
                name="trueans"
                type="text"
                className={
                  commonInputClasses + " border-b-2 font-bold text-blue-800 text-base"
                }
                placeholder="Please assign Answer"
              />
            </div>
          </div>
          <button
            className="h-8 w-24 bg-primary text-white my-2 dark:bg-white dark:text-primary hover:opacity-80 transition rounded flex items-center justify-center"
            type="submit"
          >
            {busy ? <ImSpinner3 className="animate-spin" /> : btnTitle}
          </button>
          <div className="mt-2 gap-5">
            {list.map((item, index) => (
              <div className="flex justify-between items-center w-full" key={index}>
                <li className="text-base text-blue-500 border-b-2 border-gray-200 font-serif overflow-hidden w-[80%]">{item}</li>
                <button className="" onClick={() => handleDelete(index)}><MdCancelScheduleSend/></button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </form>
  );
}
