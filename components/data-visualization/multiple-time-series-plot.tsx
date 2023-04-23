import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import {
  tiffanyBlue,
  darkPink,
  lightPink,
  // darkBrown,
  lightBrown,
  darkTiffanyBlue,
  // lightTiffanyBlue,
  // darkGrayTiffanyBlue,
  // lightGrayTiffanyBlue,
} from "../../utils/style";

const colors = [
  tiffanyBlue,
  darkPink,
  lightPink,
  // darkBrown,
  lightBrown,
  darkTiffanyBlue,
  // lightTiffanyBlue,
  // darkGrayTiffanyBlue,
  // lightGrayTiffanyBlue,
];

interface Props {
  data: any[];
}

const MultipleTimeSeriesPlot: React.FC<Props> = (props) => {
  let tags: string[] = [];
  if (props.data.length !== 0) {
    tags = Object.keys(props.data[0]).filter((key: string) => key !== "index");
  }

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart
        data={props.data}
        margin={{ top: 10, right: 10, left: 20, bottom: 20 }}
      >
        <XAxis dataKey="index" />
        <YAxis label={{ value: "Popularity", angle: -90, position: "left" }} />
        <Tooltip />
        <Legend />
        {tags.map((tag, index) => (
          <Line
            key={tag}
            type="monotone"
            dataKey={tag}
            dot={false}
            stroke={colors[index]}
            strokeWidth={2}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
};

export default MultipleTimeSeriesPlot;