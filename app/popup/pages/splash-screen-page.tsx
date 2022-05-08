import React from "react";
import Container from "@mui/material/Container";
import { SolanaIcon } from "../components/solana-icon";
import { makeStyles } from "@mui/styles";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Theme } from "@mui/material";
import BaseComponent from "@components/BaseComponent/BaseComponent";

const useStyles = makeStyles((theme: Theme) => ({
  bar: {
    backgroundColor: "black",
    color: theme.palette.primary.main,
  },
  title: {
    flexGrow: 1,
  },
}));

const SplashScreenPageBase: BaseComponent = ({ children }) => {
  const classes: any = useStyles();

  return (
    <>
      <AppBar className={classes.bar} position="static">
        <Toolbar>
          <Typography variant="h5" className={classes.title} component="h1">
            Solana Wallet
          </Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="sm" style={{ textAlign: "center" }}>
        <SolanaIcon size={"50px"} />
      </Container>
    </>
  );
};

export const SplashScreenPage = SplashScreenPageBase;
