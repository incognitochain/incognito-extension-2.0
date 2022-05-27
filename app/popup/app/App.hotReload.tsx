import React from "react";
import Assets from "@module/Assets/Assets";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemedGlobalStyle, ThemeProvider } from "@popup/theme";
import withApp from "@popup/app/App.enhance";

const AppHotReload: React.FunctionComponent = () => {
  return (
    <ThemeProvider>
      <ThemedGlobalStyle />
      <Router>
        <Assets />
      </Router>
    </ThemeProvider>
  );
};

export default withApp(React.memo(AppHotReload));
