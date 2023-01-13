import { ThemedGlobalStyle, ThemeProvider } from "@popup/theme";
import React, { useMemo } from "react";
// import { BrowserRouter as Router } from "react-router-dom";
import { MainRoute } from "@module/MainRoute";
import withApp from "@popup/app/App.enhance";
import { BackgroundProvider } from "@popup/context/background";
import { makeStyles } from "@mui/styles";
import { SnackbarProvider } from "notistack";
import { themeHelper } from "../helper/index";
import { ThemeProvider as ThemeProviderMUI } from "@mui/system";
import { ModalProvider } from "@module/Modal";
import { Router } from "react-router";
import { createBrowserHistory, createMemoryHistory } from "history";
import { isMainnet } from "@popup/configs";
import { LoadingProvider } from "@popup/context/loading";
// import { appSelectors } from "@redux/app";

const history = !isMainnet ? createBrowserHistory() : createMemoryHistory(); // Instead of createBrowserHistory();

const App: React.FunctionComponent = () => {
  // const appSelectorsData = useSelector(appSelectors);
  // console.log("appSelectorsData ", appSelectorsData);
  const useStyles = makeStyles({
    success: { backgroundColor: "#25c2a0" },
    error: { backgroundColor: "#B45BDC" },
    warning: { backgroundColor: "#fa62fc" },
    info: { backgroundColor: "#43b5c5" },
  });
  const classes: any = useStyles();
  const theme = useMemo(() => {
    return themeHelper(true);
  }, []);
  return (
    <ThemeProvider>
      <ThemeProviderMUI theme={theme}>
        <ThemedGlobalStyle />
        <BackgroundProvider>
          <LoadingProvider>
            <ModalProvider>
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
                <Router history={history}>
                  <MainRoute />
                </Router>
              </SnackbarProvider>
            </ModalProvider>
          </LoadingProvider>
        </BackgroundProvider>
      </ThemeProviderMUI>
    </ThemeProvider>
  );
};

export default withApp(React.memo(App));
// export default App;
