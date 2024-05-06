import React from 'react';
import "../../SpecificCss/Landingpage.css"; // Import your Tailwind CSS styles
import { Link } from 'react-router-dom';




const LandingPage = () => {
  return (
      <div className="bg-gray-900 h-screen flex justify-center items-center flex-col">
          
      <div className="text-white text-4xl font-bold flex-col">
              <span className="inline-block animate-writing">Welcome Developer..</span>
          </div>
          <div className="text-white text-xl font-bold ">
              <span>hello developer, welcome to the Develper app. Please signUp/SignIn for the continue...</span>
              
          </div>
           <div className="text-white text-xl font-bold mt-[2rem]">
              <Link className='  border rounded-xl p-2 hover:bg-red-500  hover:cursor-none' to="/auth/signin">SignUp/SignIn 💀</Link>
              
          </div>
          <div className="text-white text-xl font-bold bottom-0 mt-24" >
              <h1>Note:The user Must Have Laptop 💻 and Real skills 🤼</h1>
              
          </div>
          
    </div>
  );
};

export default LandingPage;
