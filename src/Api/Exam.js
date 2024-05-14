import { catchError, getToken } from "../Utils/helper";
import client from "./client";
export const ExamPaper= async (formdata) => {
    const token = getToken();
    try {
        const { data } = await client.post("exam/setExam", formdata, {
             headers: {
                authorization: "Bearer " + token,
                 "Content-Type":'application/json'
      },
        });
        return data;
    } catch (error) {
        return catchError(error)
    }
};

export const GetExamPaper = async () => {
    const token = getToken();
    try {
        const { data } = await client.get("exam/getPaper", {
            headers: {
                authorization: "Bearer " + token,
                "Content-Type": 'application/json'
            },
        });
        return data;
    } catch (error) {
        return catchError(error)
    }
};

