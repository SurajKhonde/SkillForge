// FormComponent.js
import { ImCancelCircle } from "react-icons/im";
import React, { useState } from 'react';

const FormComponent = () => {
  const [inputValue, setInputValue] = useState('');
  const [list, setList] = useState([]);

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() !== '' && list.length <=4) {
      setList([...list, inputValue]);
      setInputValue('');
    }
  };

  const handleDelete = (index) => {
    const newList = [...list];
    newList.splice(index, 1);
    setList(newList);
  };

  return (
    <div className="w-full md:w-1/2 mx-auto p-4 rounded border shadow-xl">
      <ul className="divide-y divide-gray-200">
        {list.map((item, index) => (
          <li key={index} className="flex items-center justify-between py-3">
            <span className="text-gray-800">{index + 1}. {item}</span>
            <button onClick={() => handleDelete(index)} className="text-red-500">
              <ImCancelCircle />
            </button>
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="flex items-center  ">
          <input
            type="text"
            value={inputValue}
            onChange={handleChange}
            placeholder="Enter something..."
            className="flex-1 rounded-l-md px-4 py-2 border text-gray-800 border-gray-200 bg-white focus:outline-none focus:border-blue-500 focus:ring"
          />
          <button
            type="submit"
            className="px-6 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            Add
          </button>
          
        </div>
      </form>
    </div>
  );
};

export default FormComponent;
