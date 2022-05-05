import { makeStyles } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#303030",
    borderWidth: 1,
    marginTop: 5,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: theme.spacing(3),
  },
}));

export const MainLayout: React.FC = ({ children }) => {
  const classes = useStyles();
  return <div className={classes.container}>{children}</div>;
};

export function withMainLayout<T>(Component: React.ComponentType<T>): React.ComponentType<T> {
  return (props: T) => {
    return (
      <MainLayout>
        <Component {...props} />
      </MainLayout>
    );
  };
}
