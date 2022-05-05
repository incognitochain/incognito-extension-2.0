import React from "react";
import { NavigationFrame } from "../navigation-frame";
import { makeStyles } from "@material-ui/core/styles";
import { useBackground } from "../../context/background";
import { Helmet } from "react-helmet";

const useStyles = makeStyles((theme) => ({
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

export const Layout: React.FC = ({ children }) => {
  const { isNotification } = useBackground();
  const classes = useStyles();
  return (
    <>
      {/* <Helmet>
        <title>{isNotification ? "Incognito Notification" : "Incognito Wallet"}</title>
      </Helmet>
      <NavigationFrame /> */}
      {children}
    </>
  );
};
