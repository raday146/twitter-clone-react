import React from "react";
import { withStyles } from "@material-ui/styles";

import styles from "../styles/splashStyle";

const Splash = ({ classes }) => {
  console.log("img");
  return (
    <div className={`${classes.root}`}>
      <img1111
        className="m-auto"
        width={75}
        heigh={75}
        src="/img/twitter-splash.png"
        alt="logo"
      />
    </div>
  );
};

export default withStyles(styles)(Splash);
