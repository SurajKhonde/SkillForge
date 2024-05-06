import { catchError, getToken } from "../Utils/helper";
import client from "./client";

export const ResisterDeveloper = async (formData) => {
  const token = getToken();
  try {
    const { data } = await client.post("developer/create", formData, {
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
export const getDeveloperProfile = async () => {
  const token = getToken();
  try {
    const { data } = await client.get("developer/getSigledevloper", {
      headers: {
        authorization: "Bearer " + token,
      },
    });
    return data;

  } catch (error) {
    return catchError(error);

  }
};
export const getDeveloper = async (pageNo, limit) => {
  const token = getToken();
  try {
    const { data } = await client.get(
      `developer/getdeveloper?pageNo=${pageNo}&limit=${limit}`, {
      headers: {
        authorization: "Bearer " + token,
      },
    });
    return data
  } catch (error) {
    return catchError(error);

  }

};
export const takChallange = async (id) => {
  const token = getToken();
  try {
    const { data } = await client.post(
      `/developer/acceptTask?developerId=${id}`,
      null, // Pass null as the second argument if you don't have a request body
      {
        headers: {
          authorization: "Bearer " + token,
        },
      }
    );
    return data;
  } catch (error) {
    return catchError(error);
  }
};
export const userDetails = async () => {
  const token = getToken()
  try {
    const { data } = await client.get("/developer/userInfo", {
      headers: {
        authorization: "Bearer " + token,
      },
    });
    return data;

  } catch (error) {
    return catchError(error);
  }
};
export const userAssignment = async () => {
  const token = getToken()
  try {
    const { data } = await client.get("/developer/assignedTask", {
      headers: {
        authorization: "Bearer " + token,
      },
    });
    return data;

  } catch (error) {
    return catchError(error);
  }
};
