import Grid from "@mui/material/Grid";

import FitnessPlot from "../../components/fitness/fitness-plot";

const data = [
  { id: "sleep", title: "Sleep", yAxisLabel: "Minutes" },
  { id: "deep-sleep", title: "Deep sleep", yAxisLabel: "Proportion" },
  { id: "steps", title: "Steps", yAxisLabel: "Steps" },
  { id: "weight", title: "Weight", yAxisLabel: "kg" },
  { id: "calories", title: "Calories burn", yAxisLabel: "Calories" },
];

const FitnessPage = () => {
  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
      spacing={10}
    >
      {data.map((d) => (
        <Grid item xs={12} md={6} key={d.id}>
          <FitnessPlot data={d} />
        </Grid>
      ))}
    </Grid>
  );
};

export default FitnessPage;