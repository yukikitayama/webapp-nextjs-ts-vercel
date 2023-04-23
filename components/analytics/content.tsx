import { useEffect, useState } from "react";
import CircularPrograss from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

import ScatterPlot from "../data-visualization/scatter-plot";
import MultipleTimeSeriesPlot from "../data-visualization/multiple-time-series-plot";

interface Props {
  category: string;
  type: string;
}

const Content: React.FC<Props> = (props) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const initializeData = async () => {
      setIsLoading(true);

      const url = `${process.env.NEXT_PUBLIC_API_GATEWAY_URL}/analytics/tech?category=${props.category}&type=${props.type}`;
      const response = await fetch(url);
      const fetchedData = await response.json();

      setData(fetchedData);
      setIsLoading(false);
    };

    initializeData();
  }, [props.category, props.type]);

  return (
    <div>
      {isLoading && (
        <Box sx={{ textAlign: "center" }}>
          <CircularPrograss />
        </Box>
      )}
      {props.type === "scatter" ? (
        <ScatterPlot data={data} />
      ) : (
        <MultipleTimeSeriesPlot data={data} />
      )}
    </div>
  );
};

export default Content;