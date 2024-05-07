import { useEffect, useState } from "react";

import { API_END_POINT } from "@/constants";
import { parseSiderItem } from "@/mixins";

import { useApi } from "../useApi";

const END_POINT = API_END_POINT.department;

export const useDepartment = () => {
  const { data, get } = useApi(END_POINT);

  const [dataDepartment, setDataDepartment] = useState(null);

  useEffect(() => {
    const parseData = parseSiderItem(data, "department", "name", "majors");
    setDataDepartment(parseData);
  }, [data]);

  const getDataDepartment = async () => {
    await get();
  };

  return {
    dataDepartment,
    getDataDepartment,
  };
};
