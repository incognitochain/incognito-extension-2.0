import { ThemedGlobalStyle, ThemeProvider } from '@popup/theme';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import MainRoute from "@module/MainRoute/MainRoute";
import withApp from '@popup/app/App.enhance';
import { BackgroundProvider } from "@popup/context/background";
import { ConnectionProvider } from "@popup/context/connection";

const App: React.FunctionComponent = () => {
    return (
        <ThemeProvider>
          <ThemedGlobalStyle />
          <BackgroundProvider>
            <ConnectionProvider>
              <Router>
                <MainRoute />
              </Router>
            </ConnectionProvider>
          </BackgroundProvider>
        </ThemeProvider>
    );
};

export default withApp(React.memo(App));
