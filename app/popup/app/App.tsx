import { ThemedGlobalStyle, ThemeProvider } from '@popup/theme';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import MainRoute from "@module/MainRoute/MainRoute";
import withApp from '@popup/app/App.enhance';
import { BackgroundProvider } from "@popup/context/background";
import { ConnectionProvider } from "@popup/context/connection";
import { ProgramPluginsManagerProvider } from "@popup/context/plugins";

const App: React.FunctionComponent = () => {
    return (
        <ThemeProvider>
          <ThemedGlobalStyle />
          <BackgroundProvider>
            <ConnectionProvider>
              <ProgramPluginsManagerProvider>
                <Router>
                  <MainRoute />
                </Router>
              </ProgramPluginsManagerProvider>
            </ConnectionProvider>
          </BackgroundProvider>
        </ThemeProvider>
    );
};

export default withApp(React.memo(App));
