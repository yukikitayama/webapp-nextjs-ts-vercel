import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import Content from "../../components/analytics/content";
import Explanation from "../../components/analytics/explanation";

const AnalyticsPage = () => {
  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
      spacing={2}
    >
      <Grid item xs={12}>
        <Typography variant="h5" component="div" align="center">
          Programming languages
        </Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        <Content category="programming-language" type="scatter" />
      </Grid>
      <Grid item xs={12} md={6}>
        <Content category="programming-language" type="time-series" />
      </Grid>

      <Grid item xs={12}>
        <Typography variant="h5" component="div" align="center">
          Frontend tools
        </Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        <Content category="frontend" type="scatter" />
      </Grid>
      <Grid item xs={12} md={6}>
        <Content category="frontend" type="time-series" />
      </Grid>

      <Grid item xs={12}>
        <Typography variant="h5" component="div" align="center">
          Backend tools
        </Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        <Content category="backend" type="scatter" />
      </Grid>
      <Grid item xs={12} md={6}>
        <Content category="backend" type="time-series" />
      </Grid>

      <Grid item xs={12}>
        <Typography variant="h5" component="div" align="center">
          Databases
        </Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        <Content category="database" type="scatter" />
      </Grid>
      <Grid item xs={12} md={6}>
        <Content category="database" type="time-series" />
      </Grid>

      <Grid item xs={12}>
        <Explanation />
      </Grid>
    </Grid>
  );
};

export default AnalyticsPage;
