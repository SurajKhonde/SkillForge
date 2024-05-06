import React, { useState } from "react";
import { createHR } from "../../Api/HiringManger";
import { useNotification } from "../../Hooks/index";
import HrForm from "../Form/HrForm";
import ModalContainer from "../../AdminComponents/ModalContainer";

export default function HrUpload({ visible, onClose }) {
  const [busy, setBusy] = useState(false);

  const { updateNotification } = useNotification();

  const handleSubmit = async (data) => {
    console.log(data)
    setBusy(true);
    const { error, hiringManger } = await createHR(data);
    setBusy(false);
    if (error) return updateNotification("error", error);

    updateNotification("success", "Hr Assign successfully.");
    onClose();
  };

  return (
    <ModalContainer visible={visible} onClose={onClose} ignoreContainer>
      <HrForm
        onSubmit={!busy ? handleSubmit : null}
        title="Assign A HR"
        btnTitle="Hire"
        busy={busy}
      />
    </ModalContainer>
  );
}
