import { useState } from "react";
import { blue } from "@mui/material/colors";
import { tiffanyBlue } from "../../utils/style";
import Grid from "@mui/material/Grid";
import { Dayjs } from "dayjs";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// const color = blue[500];
const color = tiffanyBlue;

interface TimeSeriesPlotProps {
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

const TimeSeriesPlot: React.FC<TimeSeriesPlotProps> = (props) => {
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
          <LineChart data={props.data}>
            <Line
              type="monotone"
              dataKey="value"
              stroke={color}
              dot={false}
              strokeWidth={2}
            />
            <XAxis dataKey="index" />
            <YAxis
              label={{
                value: `${props.yAxisLabel ? props.yAxisLabel : ""}`,
                angle: -90,
                position: "insideLeft",
              }}
            />
            <Tooltip />
          </LineChart>
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

export default TimeSeriesPlot;
