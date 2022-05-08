import React from "react";
import BaseComponent from "@components/BaseComponent/BaseComponent";
import { Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme: Theme) => ({
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

export const MainLayout: BaseComponent = ({ children }) => {
  const classes: any = useStyles();
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
