import { ThemedGlobalStyle, ThemeProvider } from '@popup/theme';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import MainRoute from "@module/MainRoute/MainRoute";
import withApp from '@popup/app/App.enhance';

const App: React.FunctionComponent = () => {
    return (
        <ThemeProvider>
            <ThemedGlobalStyle />
            <Router>
                <MainRoute />
            </Router>
        </ThemeProvider>
    );
};

export default withApp(React.memo(App));
