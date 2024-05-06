import React, { createContext, useState } from 'react'
import { getDeveloper } from '../Api/Developer';
import {useNotification} from "../Hooks/index"


export const developerContext = createContext();

const limit = 4;
let currentPageNo = 0;
export default function DeveloperProvider({  children }) {
    const [Developer, SetDeveloper] = useState([]);
    const [reachedToEnd, setReachedToEnd] = useState(false);
    const { updateNotification } = useNotification();
    const fetchdeveloper = async (pageNo = currentPageNo) => {
        const { profiles, error } = await getDeveloper(pageNo, limit);
        if (error) return updateNotification("error", error);
        if (!profiles.length) {
            currentPageNo = pageNo - 1;
            return setReachedToEnd(true);
        }
        SetDeveloper([...profiles]);
    };
    const fetchNextPage = () => {
        if (reachedToEnd) return;
        currentPageNo += 1;
        fetchdeveloper(currentPageNo);
    };
    const fetchPrevPage = () => {
        if (currentPageNo <= 0) return;
        if (reachedToEnd) setReachedToEnd(false);

        currentPageNo -= 1;
        fetchdeveloper(currentPageNo);
    };
    
    return (
        <developerContext.Provider
            value={{
                Developer,
                fetchPrevPage,
                fetchNextPage,
                fetchdeveloper

            }}>{  children}
          
        </developerContext.Provider>
    );
};

