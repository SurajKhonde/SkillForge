import { catchError, getToken } from "../Utils/helper";
import client from "./client";
export const ExamPaper= async (formdata) => {
    const token = getToken();
    try {
        const { data } = await client.post("exam/setExam", formdata, {
             headers: {
                    authorization: "Bearer " + token,
      },
        });
        return data;
    } catch (error) {
        return catchError(error)
    }
};