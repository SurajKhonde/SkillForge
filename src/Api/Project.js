import { catchError, getToken } from "../Utils/helper";
import client from "./client";

export const CreateProject = async (formData) => {
  const token = getToken();
  try {
    const { data } = await client.post("/project/create", formData, {
      headers: {
        authorization: "Bearer " + token,
        "content-type": "multipart/form-data",
      },
    });
    return data;
  } catch (error) {
    return catchError(error);
  }
};

export const getProjectUpdate = async (id) => {
  const token = getToken();
  try {
    const { data } = await client("/project/for-update/" + id, {
      headers: {
        authorization: "Bearer " + token,
      },
    });
    return data;
  } catch (error) {
    return catchError(error);
  }
};

export const getTask = async (pageNo, limit) => {
  const token = getToken();
  try {
    const { data } = await client.get(
      `/project/task?pageNo=${pageNo}&limit=${limit}`,
      {
        headers: {
          authorization: "Bearer " + token,
          "content-type": "multipart/form-data",
        },
      }
    );
    return data;
  } catch (error) {
    return catchError(error);
  }
};

export const updateProject = async (id, formData) => {
  const token = getToken();
  try {
    const { data } = await client.patch("/project/update/" + id, formData, {
      headers: {
        authorization: "Bearer " + token,
        "content-type": "multipart/form-data",
      },
    });
    return data;
  } catch (error) {
    return catchError(error);
  }
};

export const deleteProject = async (id) => {
  const token = getToken();
  try {
    const { data } = await client.delete(`/project/${id}`, {
      headers: {
        authorization: "Bearer " + token,
      },
    });
    return data;
  } catch (error) {
    return catchError(error);
  }
};
export const AllProject = async () => {
  const token = getToken();
  try {
    const { data } = await client.get("/project/allTask", {
      headers: {
        authorization: "Bearer " + token,
      },
    });
    return data;
  } catch (error) {
    return catchError(error);
  }
};

