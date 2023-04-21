import React, { Fragment } from "react";
import Grid from "@mui/material/Grid";

import Navigation from "./navigation";
import Footer from "./footer";

const Layout: React.FC<{ children: React.ReactNode }> = (props) => {
  return (
    <Fragment>
      <Navigation />
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        mb={10}  // Bottom margin to avoid the overlapping content and bottom navigation
      >
        <Grid item xs={12} md={8} p={2}>
          <main>{props.children}</main>
        </Grid>
      </Grid>
      <Footer />
    </Fragment>
  );
};

export default Layout;