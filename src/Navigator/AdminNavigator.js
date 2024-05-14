import React, { Suspense, lazy, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { Dashboard } from "../Components/Admin/DashBoard";
import Header from "../Components/Admin/Header";
import Navbar from "../Components/Admin/Navbar";
import NotFound from "../CommonComponents/NotFound";
const ProjectUpload = lazy(() => import("../Components/Admin/ProjectUpload"));
const HiringManger = lazy(() => import("../Components/HiringManger/HiringManger"));
const DashBoardofDeveloper = lazy(() => import("../Components/Developer/DashBoard"));
import Cursor from "../Components/Commonpages/DynamicCursor";
const HrUpload = lazy(() => import("../Components/Admin/HrUpload"));
const ExamUplaod = lazy(() => import("../Components/Admin/ExamUpolad"));

export default function AdminNavigator() {
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [showHrUploadModal, setHrUploadModal] = useState(false);
  const [showExamModal, setExamModal] = useState(false);

  const displayProjectModel = () => {
    setShowProjectModal(true);
  };

  const hideProjectModel = () => {
    setShowProjectModal(false);
  };
  const displayHrModel = () => {
    setHrUploadModal(true);
  };

  const hideHrModel = () => {
    setHrUploadModal(false);
  };
  const displayExamModel = () => {
    setExamModal(true);
  };

  const hideExamModel = () => {
    setExamModal(false);
  };

  return (
    <>
      <Cursor />
      <div className="flex dark:bg-primary bg-white">
        <Navbar />
        <div className="flex-1 max-w-screen-xl">
          <Header
            onAddprojectClick={displayProjectModel}
            onAddHrManger={displayHrModel}
            onAddExam={displayExamModel}
          />
          <Routes>

            <Route path="/" element={<Dashboard />} />
            <Route path="/HiringTeam" element={<Suspense fallback={<div>Loading...</div>}><HiringManger/></Suspense>} />
            <Route path="/Developer" element={<Suspense fallback={<div>Loading...</div>}><DashBoardofDeveloper/></Suspense>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <ProjectUpload visible={showProjectModal} onClose={hideProjectModel} />
        <HrUpload visible={showHrUploadModal} onClose={hideHrModel} />
        {<ExamUplaod  visible={showExamModal} onClose={hideExamModel} />}
      </Suspense>
    </>
  );
}
