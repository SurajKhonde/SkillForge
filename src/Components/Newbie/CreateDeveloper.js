import React, { useState } from "react";
import { ResisterDeveloper } from "../../Api/Developer";
import { useNotification } from "../../Hooks/index";
import ModalContainer from "../../AdminComponents/ModalContainer";
import DeveloperForm from "../Form/ResisterFormDeveloper";

export default function DeveloperUpload({ visible, onClose }) {
  const [busy, setBusy] = useState(false);
  const { updateNotification } = useNotification();
  const handleSubmit = async (data) => {
   setBusy(true)
    const { error,message } = await ResisterDeveloper(data);
    setBusy(false);
    if(message) return updateNotification("success",message)
    if (error) return updateNotification("error", error);

    updateNotification("success", "Developer upload successfully.");
    onClose();
  };

  return (
    <ModalContainer visible={visible}>
        <DeveloperForm busy={busy} onSubmit={!busy ? handleSubmit : null} />
      
    </ModalContainer>
  );
}
