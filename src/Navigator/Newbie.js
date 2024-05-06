import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "../Components/Newbie/Header";
import Navbar from "../Components/Newbie/Navbar";
import NotFound from "../CommonComponents/NotFound";
import DeveloperUpload from "../Components/Newbie/CreateDeveloper"
import HiringManger from "../Components/HiringManger/HiringManger";
import NewbieDashboard from "../Components/Newbie/NewbieDashboard";
import Cursor from "../Components/Commonpages/DynamicCursor";
import { NewbieDashboard } from "../Components/Newbie/NewbieDashboard";
import { getDeveloperProfile } from "../Api/Developer";
import PracticeGround from "../Components/Newbie/PracticeGround";
import DashBoardofDeveloper from "../Components/Developer/DashBoard";


export default function DeveloperNavigator() {
  const [showMovieUploadModal, setShowMovieUploadModal] = useState(false);
  const [dev, setDev] = useState(false);
  useEffect(() => {
    dataFetch()
  }, [dev]);
  async function dataFetch() {
    const { data} = await getDeveloperProfile();
    setDev(data)
  }

  const displayProjectModel = () => {
    setShowMovieUploadModal(true);
  };

  const hideProjectModel = () => {
    setShowMovieUploadModal(false);
  };
  
   
  return (
    <>
         <Cursor/>
      <div className="flex dark:bg-primary bg-white">
        <Navbar />
        <div className="flex-1 max-w-screen-xl">
          <Header
            onAddDeveloperClick={displayProjectModel}
          />
          
          <Routes>
            <Route path="/" element={<NewbieDashboard />} />
            <Route path="/HiringManger" element={<HiringManger />} />
            <Route path="/Developer" element={<DashBoardofDeveloper />} />
            <Route path="/practiceGround" element={ <PracticeGround/>}/>
            
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
       <DeveloperUpload
        visible={showMovieUploadModal}
        onClose={hideProjectModel}
      />
     
    </>
  );
}
