import React, { useState } from "react";
import { CreateProject } from "../../Api/Project";
import { useNotification } from "../../Hooks/index";
import ModalContainer from "../../AdminComponents/ModalContainer";
import ProjectForm from "../Form/proejctForm";

export default function ProjectUpload({ visible, onClose }) {

  const [busy, setBusy] = useState(false);

  const { updateNotification } = useNotification();
  const handleSubmit = async (data) => {
   setBusy(true)
    const { error, movie } = await CreateProject(data);
    setBusy(false);
    if (error) return updateNotification("error", error);

    updateNotification("success", "Project upload successfully.");
    onClose();
  };

  return (
    <ModalContainer visible={visible}>
        <ProjectForm busy={busy} onSubmit={!busy ? handleSubmit : null} />
      
    </ModalContainer>
  );
}
