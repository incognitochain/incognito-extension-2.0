import { ThemedGlobalStyle, ThemeProvider } from "@popup/theme";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import MainRoute from "@module/MainRoute/MainRoute";
import withApp from "@popup/app/App.enhance";
import { BackgroundProvider } from "@popup/context/background";
import { ConnectionProvider } from "@popup/context/connection";
import { ProgramPluginsManagerProvider } from "@popup/context/plugins";
import { makeStyles } from "@mui/styles";
import { SnackbarProvider } from "notistack";

const App: React.FunctionComponent = () => {
  const useStyles = makeStyles({
    success: { backgroundColor: "#25c2a0" },
    error: { backgroundColor: "#B45BDC" },
    warning: { backgroundColor: "#fa62fc" },
    info: { backgroundColor: "#43b5c5" },
  });
  const classes: any = useStyles();

  return (
    <ThemeProvider>
      <ThemedGlobalStyle />
      <BackgroundProvider>
        <ConnectionProvider>
          <ProgramPluginsManagerProvider>
            <SnackbarProvider
              maxSnack={5}
              autoHideDuration={2000}
              classes={{
                variantSuccess: classes.success,
                variantError: classes.error,
                variantWarning: classes.warning,
                variantInfo: classes.info,
              }}
            >
              <Router>
                <MainRoute />
              </Router>
            </SnackbarProvider>
          </ProgramPluginsManagerProvider>
        </ConnectionProvider>
      </BackgroundProvider>
    </ThemeProvider>
  );
};

export default withApp(React.memo(App));
