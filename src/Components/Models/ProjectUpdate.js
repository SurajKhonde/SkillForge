import React, { useEffect, useState } from "react";
 import { getProjectUpdate, updateProject } from "../../Api/Project";
import { useNotification } from "../../Hooks/index";
import  ProjectForm from "../Form/proejctForm";
import ModalContainer from "./ModalContainer";

export default function UpdateProject({ visible, initialState,
  onSuccess,onClose }) {
  const [busy, setBusy] = useState(false);
  const [ready, setReady] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(false);
  const { updateNotification } = useNotification();

  const handleSubmit = async (data) => {
    setBusy(true);
    const { error, project, message } = await updateProject(initialState.id, data);
    setBusy(false);
    if (error) return updateNotification("error", error);
     onSuccess(project);
    updateNotification("success", message);
    onClose();
  };

  const fetchProjectToUpdate = async () => {
    const { project, error } = await getProjectUpdate(initialState.id);
    if (error) return updateNotification("error", error);
    setReady(true);
    setSelectedMovie(project);
  };

  return (
    <ModalContainer visible={visible}>
      {ready ? (
        <ProjectForm
          initialState={selectedMovie}
          btnTitle="Update"
          onSubmit={!busy ? handleSubmit : null}
          busy={busy}
        />
      ) : (
        <div className="w-full h-full flex justify-center items-center">
          <p className="text-light-subtle dark:text-dark-subtle animate-pulse text-xl">
            Please wait...
          </p>
        </div>
      )}
    </ModalContainer>
  );
}
