import { useEffect, useState } from "react";

import { API_END_POINT } from "@/constants";

import { useApi } from "../useApi";

const END_POINT = API_END_POINT.posts;

export const usePosts = () => {
    const { data, get } = useApi(END_POINT);

    const [dataPosts, setDataPosts] = useState(null);

    useEffect(() => {
        setDataPosts(data);
    }, [data]);

    const getDataPosts = async () => {
        await get();
    };

    return {
        dataPosts,
        getDataPosts,
    };
};
