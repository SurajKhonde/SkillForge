export const validateProject= (ProjectInfo) => {
  const {
    title,
    Description,
    language,
    releseDate,
    status,
    type,
    genres
  } = ProjectInfo;

  if (!title.trim()) return { error: "Title is missing!" };
  if (!Description.trim()) return { error: "Story line is missing!" };
  if (!language.trim()) return { error: "Language is missing!" };
  if (!releseDate.trim()) return { error: "Relese date is missing!" };
  if (!status.trim()) return { error: "Status is missing!" };
  if (!type.trim()) return { error: "Type is missing!" };

  // validation for genres we are checking if genres is an array or not
  if (!genres.length) return { error: "Genres are missing!" };
  // we are checking genres needs to field with string value
  for (let gen of genres) {
    if (!gen.trim()) return { error: "Invalid genres!" };
  }

  return { error: null };
};
export const validateDeveloper= (developerInfo) => {
  const {
    title,
    Description,
    bhashya,
    type,
    genres,
    gender,
  } = developerInfo;

  if (!title.trim()) return { error: "Title is missing!" };
  if (!Description.trim()) return { error: "Story line is missing!" };
  if (!bhashya.trim()) return { error: "Language is missing!" };
  if (!type.trim()) return { error: "Type is missing!" };
  if (!gender.trim()) return { error: "Actor gender is missing!" };

  // validation for genres we are checking if genres is an array or not
  if (!genres.length) return { error: "Genres are missing!" };
  // we are checking genres needs to field with string value
  for (let gen of genres) {
    if (!gen.trim()) return { error: "Invalid genres!" };
  }

  return { error: null };
};
