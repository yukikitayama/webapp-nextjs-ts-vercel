import { useState, useEffect, Fragment } from "react";
import dayjs, { Dayjs } from "dayjs";

import TimeSeriesPlot from "../data-visualization/time-series-plot";
import { getLocalDateFromDatetime, getDefaultDate } from "../../utils/datetime";

const now = new Date();
// First day of the current month
const startDaily = new Date(now.getFullYear(), now.getMonth(), 1);
// Last day of the current month
// const endDaily = new Date(now.getFullYear(), now.getMonth() + 1, 0);
// Current day
const endDaily = getDefaultDate(0);

const DailyPlot = () => {
  const [data, setData] = useState<{ index: string; value: number }[]>([]);
  const [start, setStart] = useState<Dayjs | null>(dayjs(startDaily));
  const [end, setEnd] = useState<Dayjs | null>(dayjs(endDaily));
  const [isLoading, setIsLoading] = useState(false);

  const updateData = async () => {
    setIsLoading(true);

    const startDate = getLocalDateFromDatetime(start!.toDate());
    const endDate = getLocalDateFromDatetime(end!.toDate());
    const url = `${process.env.NEXT_PUBLIC_API_GATEWAY_URL}/expenses?aggregation=daily&start=${startDate}&end=${endDate}`;
    const response = await fetch(url);
    const fetchedData = await response.json();

    // Compute cumulative sum of daily expense
    let cumsum = 0;
    const transformedData: { index: string; value: number }[] = [];
    fetchedData.forEach((element: { index: string; value: number }) => {
      cumsum += element.value;
      transformedData.push({
        index: element.index,
        // use toFixed(2) to make 2 decimal places because
        // somehow without it make many zeros
        value: +cumsum.toFixed(2),
      });
    });
    setData(transformedData);
    setIsLoading(false);
  };

  useEffect(() => {
    const initializeData = async () => {
      setIsLoading(true);

      const startDate = getLocalDateFromDatetime(startDaily);
      const endDate = getLocalDateFromDatetime(endDaily);
      const url = `${process.env.NEXT_PUBLIC_API_GATEWAY_URL}/expenses?aggregation=daily&start=${startDate}&end=${endDate}`;
      const response = await fetch(url);
      const fetchedData = await response.json();

      // Compute cumulative sum of daily expense
      let cumsum = 0;
      const transformedData: { index: string; value: number }[] = [];
      fetchedData.forEach((element: { index: string; value: number }) => {
        cumsum += element.value;
        transformedData.push({
          index: element.index,
          // use toFixed(2) to make 2 decimal places because
          // somehow without it make many zeros
          value: +cumsum.toFixed(2),
        });
      });
      setData(transformedData);
      setIsLoading(false);
    };

    initializeData();
  }, []);

  return (
    <Fragment>
      <TimeSeriesPlot
        title="Daily"
        yAxisLabel="USD"
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

export default DailyPlot;