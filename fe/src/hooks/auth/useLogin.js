import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

import { API_END_POINT } from "@/constants";
import { useApi } from "../useApi";

const END_POINT = API_END_POINT.login;

export const useLogin = () => {
  const history = useNavigate();

  const { data, post, error } = useApi(END_POINT);

  const [dataLogin, setDataLogin] = useState(null);

  useEffect(() => {
    if (!data && !data?.user) return;
    localStorage.setItem("user", JSON.stringify(data?.user));
    setDataLogin(data.user);
    history("/social/feed");
  }, [data]);

  const handleGoogle = async (response) => {
    await post({ credential: response.credential });
  };
  return { dataLogin, handleGoogle, error };
};
