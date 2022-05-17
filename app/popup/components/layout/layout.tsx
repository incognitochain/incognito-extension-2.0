import React from "react";
import { NavigationFrame } from "../navigation-frame";
import { useBackground } from "../../context/background";
import { Helmet } from "react-helmet";
import BaseComponent from "@components/BaseComponent/BaseComponent";
import { Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme: Theme) => ({
  content: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    flex: 1,
    display: "flex",
    flexDirection: "column",
    backgroundColor: theme.palette.primary.main,
  },
}));

export const Layout: BaseComponent = ({ children }) => {
  const { isNotification } = useBackground();
  const classes: any = useStyles();
  return (
    <>
      {/* <Helmet>
        <title>{isNotification ? "Incognito Notification" : "Incognito Assets"}</title>
      </Helmet>
      <NavigationFrame /> */}
      {children}
    </>
  );
};
