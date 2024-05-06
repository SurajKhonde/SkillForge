import React, { useEffect, useState } from "react";
import { useNotification } from "../../Hooks";
import {
  languageOptions,
  statusOptions,
  typeOptions,
} from "../../Utils/options.js";
import { commonInputClasses } from "../../Utils/theme";
import { validateProject } from "../../Utils/validator";
import Submit from "../Form/Submit";
import GenresSelector from "../../AdminComponents/GenresSelectors";
import Label from "../../AdminComponents/Label.js";
import GenresModal from "../Models/GenresModel";
import Selector from "../../CommonComponents/Selector";
import TagsInput from "../../CommonComponents/TagInput.js";
import PosterSelector from "../../CommonComponents/PosterSelector.js";

const defaultProjectInfo = {
  title: "",
  Description: "",
  tags: [],
  releseDate: "",
   poster: null,
  genres: [],
  type: "",
  language: "",
  status: "",
};

export default function ProjectForm({ busy, btnTitle, initialState, onSubmit }) {
  const [ProjectInfo, setProjectInfo] = useState({ ...defaultProjectInfo });
  const [showGenresModal, setShowGenresModal] = useState(false);
  const [selectedPosterForUI, setSelectedPosterForUI] = useState("");

  const { updateNotification } = useNotification();

  const handleSubmit = (e) => {
    e.preventDefault();
    const { error } = validateProject(ProjectInfo);
    if (error) return updateNotification("error", error);
    const { tags, genres,poster} = ProjectInfo;
    const formData = new FormData();

    const finalProject = { ...ProjectInfo };

    finalProject.tags = JSON.stringify(tags);
    finalProject.genres = JSON.stringify(genres);
    if (poster) finalProject.poster = poster;
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
    if (name === "poster") {
      const poster = files[0];
      updatePosterForUI(poster);
      return setProjectInfo({ ...ProjectInfo, poster });
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
        releseDate: initialState.releseDate.split("T")[0],
         poster: null,
      });
      setSelectedPosterForUI(initialState.poster);
    }
  }, [initialState]);

  const {
    title,
    Description,
    tags,
    releseDate,
    genres,
    type,
    language,
    status,
  } = ProjectInfo;

  return (
    <>
      <div onSubmit={handleSubmit} className="flex space-x-3">
        <div className="w-[70%] space-y-5">
          <div>
            <Label htmlFor="title">Title</Label>
            <input
              id="title"
              value={title}
              onChange={handleChange}
              name="title"
              type="text"
              className={
                commonInputClasses + " border-b-2 font-semibold text-xl"
              }
              placeholder="Think unique Name please?"
            />
          </div>

          <div>
            <Label htmlFor="Description">Brief</Label>
            <textarea
              value={Description}
              onChange={handleChange}
              name="Description"
              id="Description"
              className={commonInputClasses + " border-b-2 resize-none h-24"}
              placeholder="what you wnat to craft..."
            ></textarea>
          </div>

          <div>
            <Label htmlFor="tags">Edage Skill</Label>
            <TagsInput value={tags} name="tags" onChange={updateTags} />
          </div>
          <input
            type="date"
            className={commonInputClasses + " border-2 rounded p-1 w-auto"}
            onChange={handleChange}
            name="releseDate"
            value={releseDate}
          />

          <Submit
            busy={busy}
            value={"Launch🛰️"}
            onClick={handleSubmit}
            type="button"
          />

        </div>
        <div className="w-[30%] space-y-5">
          <PosterSelector
            name="poster"
            onChange={handleChange}
            selectedPoster={selectedPosterForUI}
            lable="Select poster"
            accept="image/jpg, image/jpeg, image/png"
          />
          <GenresSelector badge={genres.length} onClick={displayGenresModal} />

          <Selector
            onChange={handleChange}
            name="type"
            value={type}
            options={typeOptions}
            label="Stack"
          />
          <Selector
            onChange={handleChange}
            name="language"
            value={language}
            options={languageOptions}
            label="P.Language"
          />
          <Selector
            onChange={handleChange}
            name="status"
            value={status}
            options={statusOptions}
            label="Mode"
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
