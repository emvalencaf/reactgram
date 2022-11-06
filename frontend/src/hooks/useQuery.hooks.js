// Hooks
import { useLocation } from "react-router-dom";
import { useMemo } from "react";

// Will extracted the values from querystring 
export const useQuery = () => {

    const { search } = useLocation();

    // all the data in a querystring will return as an object when search changes states
    return useMemo(() => new URLSearchParams(search), [search]);

};