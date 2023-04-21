import Grid from "@mui/material/Grid";
import { Dayjs } from "dayjs";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import { teal } from "@mui/material/colors";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import {
  PieChart,
  Pie,
  Tooltip,
  LabelList,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";

import {
  tabBlue,
  tabOrange,
  tabGreen,
  tabRed,
  tabPurple,
  tabBrown,
  tabPink,
  tiffanyBlue,
} from "../../utils/style";

interface InteractivePieChartProps {
  title?: string;
  yAxisLabel?: string;
  data?: {
    index: string;
    value: number;
  }[];
  start: Dayjs | null;
  setStart(newValue: Dayjs | null): void;
  end: Dayjs | null;
  setEnd(newValue: Dayjs | null): void;
  fetchData?: () => void;
  isLoading?: boolean;
}

// matplotlib tableau palette
// const colors = [
//   tabBlue,
//   tabOrange,
//   tabGreen,
//   tabRed,
//   tabPurple,
//   tabBrown,
//   tabPink
// ];
const colors = [
  tiffanyBlue,
  teal[500],
  teal[400],
  teal[300],
  teal[200],
  teal[100],
  teal[50],
];

const InteractivePieChart: React.FC<InteractivePieChartProps> = (props) => {
  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
      spacing={1}
    >
      <Grid item xs={12}>
        <Typography align="center" variant="h5" gutterBottom>
          {props.title}
        </Typography>
      </Grid>

      {props.isLoading && (
        <Grid item xs={12} textAlign="center">
          <CircularProgress />
        </Grid>
      )}

      <Grid item xs={12}>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={props.data}
              dataKey="value"
              nameKey="index"
              startAngle={90}
              endAngle={-270}
              outerRadius="90%"
            >
              {props.data!.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </Grid>

      <Grid item xs={12}>
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={1}
        >
          <MobileDatePicker
            label="Start"
            value={props.start}
            onChange={(newValue) => props.setStart(newValue)}
            slotProps={{ textField: { size: "small" } }}
          />
          <MobileDatePicker
            label="End"
            value={props.end}
            onChange={(newValue) => props.setEnd(newValue)}
            slotProps={{ textField: { size: "small" } }}
          />
          <Button variant="outlined" size="small" onClick={props.fetchData}>
            Update
          </Button>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default InteractivePieChart;
