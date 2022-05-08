import CssBaseline from "@mui/material/CssBaseline";
import useMediaQuery from "@mui/material/useMediaQuery";
import { SnackbarProvider } from "notistack";
import React, { Suspense, useEffect, useMemo } from "react";
import { BrowserRouter, Router } from "react-router-dom";
import { LoadingIndicator } from "../components/loading-indicator";
import { Routes } from "../components/routes/routes";
import { BackgroundProvider } from "../context/background";
import { ConnectionProvider } from "../context/connection";
import { ProgramPluginsManagerProvider } from "../context/plugins";
import { themeHelper } from "../helper/index";
import { history } from "../utils/history";
import { makeStyles } from "@mui/styles";
import { ThemeProvider } from "@mui/system";

const useStyles = makeStyles({
  success: { backgroundColor: "#25c2a0" },
  error: { backgroundColor: "#B45BDC" },
  warning: { backgroundColor: "#fa62fc" },
  info: { backgroundColor: "#43b5c5" },
});

export const App: React.FC = () => {
  console.log(" App Render");

  // const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const prefersDarkMode = true;
  console.log("prefersDarkMode : ", prefersDarkMode);
  const theme = useMemo(() => {
    console.log("theme thay doi");
    return themeHelper(prefersDarkMode);
  }, []);
  const classes: any = useStyles();

  useEffect(() => {
    console.log(" App Render Done");
  }, []);

  // Disallow rendering inside an iframe to prevent clickjacking.
  if (window.self !== window.top) {
    return null;
  }

  return (
    <Suspense fallback={<LoadingIndicator />}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BackgroundProvider>
          <ConnectionProvider>
            <ProgramPluginsManagerProvider>
              <SnackbarProvider
                maxSnack={5}
                autoHideDuration={8000}
                classes={{
                  variantSuccess: classes.success,
                  variantError: classes.error,
                  variantWarning: classes.warning,
                  variantInfo: classes.info,
                }}
              >
                <BrowserRouter>
                  <Routes />
                </BrowserRouter>
              </SnackbarProvider>
            </ProgramPluginsManagerProvider>
          </ConnectionProvider>
        </BackgroundProvider>
      </ThemeProvider>
    </Suspense>
  );
};
