import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import {Dashboard} from "../Components/Admin/DashBoard";
import Header from "../Components/Admin/Header";
import Navbar from "../Components/Admin/Navbar";
import NotFound from "../CommonComponents/NotFound";
import ProjectUpload from "../Components/Admin/ProjectUpload";
import HiringManger from "../Components/HiringManger/HiringManger";
import DashBoardofDeveloper from "../Components/Developer/DashBoard";
import Cursor from "../Components/Commonpages/DynamicCursor";
import HrUpload from "../Components/Admin/HrUpload";
import ExamUplaod from "../Components/Admin/ExamUpolad"

export default function AdminNavigator() {
  const [showMovieUploadModal, setShowMovieUploadModal] = useState(false);
  const [showHrUploadModal, setHrUploadModal] = useState(false);
   const [showExamModal, setExamModal] = useState(false);


  const displayProjectModel = () => {
    setShowMovieUploadModal(true);
  };

  const hideProjectModel = () => {
    setShowMovieUploadModal(false);
  };
  const displayHrModel = () => {
    setHrUploadModal(true);
  };

  const hideHrModel = () => {
    setHrUploadModal(false);
  };
  const displayExamModel= () => {
    setExamModal(true);
  };

  const hidexamModal = () => {
     setExamModal(false);
  };

  return (
    <>
      <Cursor/>
      <div className="flex dark:bg-primary bg-white">
        <Navbar/>
        <div className="flex-1 max-w-screen-xl">
          <Header
            onAddprojectClick={displayProjectModel}
            onAddHrManger={displayHrModel}
            onAddExam={displayExamModel}
          />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/HiringTeam" element={<HiringManger />} />
            <Route path="/Developer" element={<DashBoardofDeveloper />} />
            <Route path="/exam" element={<DashBoardofDeveloper />} />
            
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
       <ProjectUpload
        visible={showMovieUploadModal}
        onClose={hideProjectModel}
      />
      <HrUpload
        visible={showHrUploadModal}
        onClose={ hideHrModel}
      />
      <ExamUplaod
       visible={showExamModal}
        onClose={hidexamModal}
      />
    </>
  );
}
