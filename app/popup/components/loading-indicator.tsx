import React, { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { useEffectAfterTimeout } from "../utils/utils";
import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/material";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    padding: theme.spacing(2),
  },
}));

export interface Props {
  height?: number;
  delay?: number;
}

export const LoadingIndicator: React.FC<Props & React.ComponentProps<"div">> = ({
  height = null,
  delay = 500,
  ...rest
}) => {
  const classes: any = useStyles();
  const [visible, setVisible] = useState(false);

  useEffectAfterTimeout(() => setVisible(true), delay);

  let style: React.CSSProperties = {};
  if (height) {
    style.height = height;
  }

  if (!visible) {
    return height ? <div style={style} /> : null;
  }

  return (
    <div className={classes.root} style={style} {...rest}>
      <CircularProgress />
    </div>
  );
};
