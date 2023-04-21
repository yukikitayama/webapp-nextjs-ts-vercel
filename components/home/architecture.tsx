import { Fragment } from "react";
import Image from "next/image";
import Typography from "@mui/material/Typography";

import classes from "./architecture.module.css";

const Architecture = () => {
  return (
    <Fragment>
      <Typography variant="h5" align="center">
        Architecture
      </Typography>
      <div className={classes.architecture}>
        <Image
          src="/images/site/architecture_transparent.png"
          alt="An image of webapp architecture diagram"
          // width={3376}
          // height={2398}
          fill={true}
          style={{ objectFit: "contain"}}
          priority={true}
        />
      </div>
    </Fragment>
  );
};

export default Architecture;