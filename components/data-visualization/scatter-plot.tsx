import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  Tooltip,
  LabelList,
  ResponsiveContainer,
} from "recharts";

import { tiffanyBlue } from "../../utils/style";

interface Props {
  data: {
    tag: string;
    growth: number;
    popularity: number;
  }[];
}

const ScatterPlot: React.FC<Props> = (props) => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <ScatterChart margin={{ top: 10, right: 60, left: 20, bottom: 20 }}>
        <XAxis
          dataKey="growth"
          type="number"
          label={{ value: "Growth", position: "bottom" }}
        />
        <YAxis
          dataKey="popularity"
          type="number"
          label={{ value: "Popularity", angle: -90, position: "left" }}
        />
        <Tooltip cursor={{ strokeDasharray: "3 3" }} />
        <Scatter data={props.data} fill={tiffanyBlue}>
          <LabelList dataKey="tag" position="right" />
        </Scatter>
      </ScatterChart>
    </ResponsiveContainer>
  );
};

export default ScatterPlot;