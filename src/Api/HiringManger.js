import { catchError, getToken } from "../Utils/helper";
import client from "./client";


export const createHR = async (formData) => {
  const token = getToken();
  try {
    const { data } = await client.post("/hr/create", formData, {
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
export const deletehr = async (id) => {
  const token = getToken();
  try {
    const { data } = await client.delete("/hr/removehr" + id, {
      headers: {
        authorization: "Bearer " + token,
      },
    });
    return data;
  } catch (error) {
    return catchError(error);
  }
};

export const gethr = async (pageNo, limit) => {
  const token = getToken();
  try {
    const { data } = await client(
      `/hr/gethiringManger?pageNo=${pageNo}&limit=${limit}`,
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

export const getsinglehr = async (id) => {
  try {
    const { data } = await client(`/hr/getSigleHiringManger/${id}`);
    return data;
  } catch (error) {
    return catchError(error);
  }
};





