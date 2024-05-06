import React, { useEffect, useState } from "react";
import { useNotification } from "../../Hooks";
import {
  languageOptions,
  typeOptions,
  statusOptionfordeveloper,
} from "../../Utils/options.js";
import { commonInputClasses } from "../../Utils/theme";
import { validateDeveloper, validateProject } from "../../Utils/validator";
import Submit from "../Form/Submit";
import GenresSelector from "../../AdminComponents/GenresSelectors";
import Label from "../../AdminComponents/Label.js";
import GenresModal from "../Models/GenresModel";
import Selector from "../../CommonComponents/Selector";
import TagsInput from "../../CommonComponents/TagInput.js";
import PosterSelector from "../../CommonComponents/PosterSelector.js";

const defaultMovieInfo = {
  title: "",
  Description: "",
  LinkdinUrl:"",
  tags: [],
   avatar: null,
  genres: [],
  type: "",
  bhashya: "",
  status: "",
  gender:""
};
const genderOptions = [
  { title: "Male", value: "male" },
  { title: "Female", value: "female" },
  { title: "Other", value: "other" },
];

export default function DeveloperForm({ busy, btnTitle, initialState, onSubmit }) {
  const [ProjectInfo, setProjectInfo] = useState({ ...defaultMovieInfo });
  const [showGenresModal, setShowGenresModal] = useState(false);
  const [selectedPosterForUI, setSelectedPosterForUI] = useState("");

  const { updateNotification } = useNotification();

  const handleSubmit = (e) => {
    e.preventDefault();
    const { error } = validateDeveloper(ProjectInfo);
    if (error) return updateNotification("error", error);
    const { tags, genres,avatar} = ProjectInfo;
    const formData = new FormData();
    const finalProject = {
      ...ProjectInfo,
    };

    finalProject.tags = JSON.stringify(tags);
    finalProject.genres = JSON.stringify(genres);
    if (avatar) finalProject.avatar = avatar;
    for (let key in finalProject) {
      formData.append(key, finalProject[key]);
    }

    onSubmit(formData);
  };
  const updatePosterForUI = (file) => {
    const url = URL.createObjectURL(file);
    setSelectedPosterForUI(url);
  };


  const handleChange = ({ target }) => {
    const { value, name, files } = target;
    if (name === "avatar") {
      const avatar = files[0];
      updatePosterForUI(avatar);
      return setProjectInfo({ ...ProjectInfo, avatar });
    }

    setProjectInfo({ ...ProjectInfo, [name]: value }); 
  };

  const updateTags = (tags) => {
    setProjectInfo({ ...ProjectInfo, tags });
  };
  const updateGenres = (genres) => {
    setProjectInfo({ ...ProjectInfo, genres });
  };


  const hideGenresModal = () => {
    setShowGenresModal(false);
  };

  const displayGenresModal = () => {
    setShowGenresModal(true);
  };

  useEffect(() => {
    if (initialState) {
      setProjectInfo({
        ...initialState,
        avatar: null,
      });
      setSelectedPosterForUI(initialState.avatar);
    }
  }, [initialState]);

  const {
    title,
    Description,
    tags,
    LinkdinUrl,
    genres,
    type,
    bhashya,
    status,
    gender,
  } = ProjectInfo;

  return (
    <>
      <div onSubmit={handleSubmit} className="flex space-x-3">
        <div className="w-[80%] space-y-5">
          <div>
            <Label htmlFor="title">Name</Label>
            <input
              id="title"
              value={title}
              onChange={handleChange}
              name="title"
              type="text"
              className={
                commonInputClasses + " border-b-2 font-semibold text-xl"
              }
              placeholder="What title do you prefer?"
            />
          </div>

          <div>
            <Label htmlFor="Description">Brief</Label>
            <textarea
              value={Description}
              onChange={handleChange}
              name="Description"
              id="Description"
              className={commonInputClasses + " border-b-2 resize-none h-15"}
              placeholder= "Could you share your experience with development?"
            ></textarea>
          </div>
          <div>
            <Label htmlFor="LinkdinUrl">LinkIn Profile</Label>
            <textarea
              value={LinkdinUrl}
              onChange={handleChange}
              name="LinkdinUrl"
              id="LinkdinUrl"
              className={commonInputClasses + " border-b-2 resize-none h-10"}
              placeholder="Would you mind sharing your LinkedIn URL?"
            ></textarea>
          </div>

          <div>
            <Label htmlFor="tags">must need</Label>
            <TagsInput value={tags} name="tags" onChange={updateTags} />
          </div>
          <div>
               <Selector
          options={genderOptions}
          label="Gender"
          value={gender}
          onChange={handleChange}
          name="gender"
        />
          </div>

          <Submit
            busy={busy}
            value={btnTitle}
            onClick={handleSubmit}
            type="button"
          />

        </div>
        <div className="w-[40%] space-y-5">
          <PosterSelector
            name="avatar"
            onChange={handleChange}
            selectedPoster={selectedPosterForUI}
            lable="Select Your Avatar"
            accept="image/jpg, image/jpeg, image/png"
          />
          <GenresSelector badge={genres.length} onClick={displayGenresModal} />

          <Selector
            onChange={handleChange}
            name="type"
            value={type}
            options={typeOptions}
            label=" Work-Role"
          />
          <Selector
            onChange={handleChange}
            name="bhashya"
            value={bhashya}
            options={languageOptions}
            label="Language"
          />
          <Selector
            onChange={handleChange}
            name="status"
            value={status}
            options={statusOptionfordeveloper}
            label="Status"
          />
        </div>
      </div>      
      <GenresModal
        onSubmit={updateGenres}
        visible={showGenresModal}
        onClose={hideGenresModal}
        previousSelection={genres}
      />
    </>
  );
}
