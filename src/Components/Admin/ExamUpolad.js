import React, { useState } from "react";
import {ExamPaper} from "../../Api/Exam"
import { useNotification } from "../../Hooks/index";
import ExamSetForm from "../Form/ExamFrom";
import ModalContainer from "../../AdminComponents/ModalContainer";

export default function ExamUplaod({ visible, onClose }) {
  const [busy, setBusy] = useState(false);

  const { updateNotification } = useNotification();

  const handleSubmit = async (data) => {
    console.log(data)
    setBusy(true);
    const { error } = await ExamPaper(data);
    setBusy(false);
    if (error) return updateNotification("error", error);

    updateNotification("success", "Question Assign successfully.");
    onClose();
  };

  return (
    <ModalContainer visible={visible} onClose={onClose} ignoreContainer>
      <ExamSetForm
        onSubmit={!busy ? handleSubmit : null}
        title="A Exam Section"
        btnTitle ="Add Exam"
        busy={busy}
      />
    </ModalContainer>
  );
}
