import { useState, useEffect, Fragment } from "react";
import dayjs, { Dayjs } from "dayjs";

import InteractivePieChart from "../data-visualization/interactive-pie-chart";
import { getLocalDateFromDatetime, getDefaultDate } from "../../utils/datetime";

// First day of a month 6 months ago
const startDate = new Date();
startDate.setMonth(startDate.getMonth() - 6);
startDate.setHours(0, 0, 0, 0);
const startCategory = dayjs(startDate);
// Current day
const endCategory = dayjs(getDefaultDate(0));

const CategoryPlot = () => {
  const [data, setData] = useState<{ index: string; value: number }[]>([]);
  const [start, setStart] = useState<Dayjs | null>(startCategory);
  const [end, setEnd] = useState<Dayjs | null>(endCategory);
  const [isLoading, setIsLoading] = useState(false);

  const updateData = async () => {
    setIsLoading(true);

    const startDate = getLocalDateFromDatetime(start!.toDate());
    const endDate = getLocalDateFromDatetime(end!.toDate());
    const url = `${process.env.NEXT_PUBLIC_API_GATEWAY_URL}/expenses?aggregation=category&start=${startDate}&end=${endDate}`;
    const response = await fetch(url);
    const fetchedData = await response.json();

    setData(fetchedData);
    setIsLoading(false);
  };

  useEffect(() => {
    const initializeData = async () => {
      setIsLoading(true);

      const startDate = getLocalDateFromDatetime(startCategory.toDate());
      const endDate = getLocalDateFromDatetime(endCategory.toDate());
      const url = `${process.env.NEXT_PUBLIC_API_GATEWAY_URL}/expenses?aggregation=category&start=${startDate}&end=${endDate}`;
      const response = await fetch(url);
      const fetchedData = await response.json();

      setData(fetchedData);
      setIsLoading(false);
    };

    initializeData();
  }, []);

  return (
    <Fragment>
      <InteractivePieChart
        title="Category"
        data={data}
        start={start}
        setStart={setStart}
        end={end}
        setEnd={setEnd}
        fetchData={updateData}
        isLoading={isLoading}
      />
    </Fragment>
  );
};

export default CategoryPlot;