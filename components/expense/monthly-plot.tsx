import { useState, useEffect, Fragment } from "react";
import dayjs, { Dayjs } from "dayjs";

import TimeSeriesPlot from "../data-visualization/time-series-plot";
import { getLocalDateFromDatetime, getDefaultDate } from "../../utils/datetime";

// 2021-10-01
const startMonthly = new Date(2021, 9, 1);
// Current day
const endMonthly = getDefaultDate(0);

const MonthlyPlot = () => {
  const [data, setData] = useState<{ index: string; value: number }[]>([]);
  const [start, setStart] = useState<Dayjs | null>(dayjs(startMonthly));
  const [end, setEnd] = useState<Dayjs | null>(dayjs(endMonthly));
  const [isLoading, setIsLoading] = useState(false);

  const updateData = async () => {
    setIsLoading(true);

    const startDate = getLocalDateFromDatetime(start!.toDate());
    const endDate = getLocalDateFromDatetime(end!.toDate());
    const url = `${process.env.NEXT_PUBLIC_API_GATEWAY_URL}/expenses?aggregation=monthly&start=${startDate}&end=${endDate}`;
    const response = await fetch(url);
    const fetchedData = await response.json();

    setData(fetchedData);
    setIsLoading(false);
  };

  useEffect(() => {
    const initializeData = async () => {
      setIsLoading(true);

      const startDate = getLocalDateFromDatetime(startMonthly);
      const endDate = getLocalDateFromDatetime(endMonthly);
      const url = `${process.env.NEXT_PUBLIC_API_GATEWAY_URL}/expenses?aggregation=monthly&start=${startDate}&end=${endDate}`;
      const response = await fetch(url);
      const fetchedData = await response.json();

      setData(fetchedData);
      setIsLoading(false);
    };

    initializeData();
  }, []);

  return (
    <Fragment>
      <TimeSeriesPlot
        title="Monthly"
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

export default MonthlyPlot;