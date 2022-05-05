import { makeStyles } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    backgroundColor: theme.palette.primary.main,
  },
}));

export const BlankLayout: React.FC = ({ children }) => {
  const classes = useStyles();
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
