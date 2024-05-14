import React, { useState } from "react";
import { ImSpinner3 } from "react-icons/im";
import { useNotification } from "../../Hooks/index";
import Selector from "../../CommonComponents/Selector";
import { languageOptions } from "../../Utils/options.js";
import QuestionSelector from "./QuestionSelection.js";
import QuestionSet from "./QuestionSet.js";

const defaultExamFormat = {
  subject: "",
  paperSet: [],
};

export default function ExamSetForm({
  busy,
  onSubmit,
  btnTitle,
  title
}) {
  const [exam, setExam] = useState({ ...defaultExamFormat });
  const [QuestionData, setQuestionData] = useState(false);
  const { updateNotification } = useNotification();


  const handleChange = ({ target }) => {
    const { value, name } = target;
    setExam({ ...exam, [name]: value });
  };

  const hideQuestionModel = () => {
    setQuestionData(false);
  };

  const displayQuestionModal = () => {
    setQuestionData(true);
  };

  const updateExam = (paperSet) => {
    setExam({ ...exam, paperSet: [...exam.paperSet, paperSet] }); // Add the new question to the paperSet array
  }
const handleSubmit = (e) => {
  e.preventDefault();
  const finalExamSetup = { ...exam, paperSet: (exam.paperSet) };
  const { paperSet } = exam;
    const Data = finalExamSetup.paperSet= JSON.stringify(paperSet)

  setExam(Data)

  onSubmit(exam);
  };
  const { subject } = exam;
  return (
    <>
  <form className="dark:bg-primary z-0 bg-white p-3 w-[25rem] rounded" onSubmit={handleSubmit}>
    <h1 className="text-center border-b-2 border-black font-serif text-xl text-[#F92C85] font-bold">{title}</h1>
    <div className="flex justify-between mt-3 items-center mb-3">
      <Selector
        options={languageOptions}
        label="subject"
        value={subject}
        onChange={handleChange}
        name="subject"
      />
      <QuestionSelector badge={exam.paperSet?.length} onClick={displayQuestionModal} />  
        </div>
    <button
      className="h-8 ml-[8rem] w-24 bg-primary text-white dark:bg-white dark:text-primary hover:opacity-80 transition rounded flex items-center justify-center"
      type="submit"
    >
      {busy ? <ImSpinner3 className="animate-spin" /> : btnTitle}
    </button>  
  </form>
  <QuestionSet
    onSubmit={updateExam}
    visible={QuestionData}
    onClose={hideQuestionModel}
    busy={busy}
    btnTitle={"Submit"}
  />
</>

  )
};
    