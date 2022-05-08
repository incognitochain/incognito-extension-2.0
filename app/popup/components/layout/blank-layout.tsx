import React from "react";
import BaseComponent from "@components/BaseComponent/BaseComponent";
import { Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    backgroundColor: theme.palette.primary.main,
  },
}));

export const BlankLayout: BaseComponent = ({ children }) => {
  const classes: any = useStyles();
  return <div className={classes.container}>{children}</div>;
};

export function withBlankLayout<T>(Component: React.ComponentType<T>): React.ComponentType<T> {
  return (props: T) => {
    return (
      <BlankLayout>
        <Component {...props} />
      </BlankLayout>
    );
  };
}
