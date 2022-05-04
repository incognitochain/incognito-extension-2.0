import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import ArrowBackIos from "@material-ui/icons/ArrowBackIos";
import React, { memo } from "react";

interface NavigationBarProps {
  goBack?: () => void;
  title?: string;
}

const NavigationBar: React.FC<NavigationBarProps> = ({ goBack, title = "Incognito Wallet" }) => {
  return (
    <AppBar color="primary" position="static">
      <Toolbar>
        <IconButton onClick={goBack}>
          <ArrowBackIos />
        </IconButton>
        <Typography variant="h5" color="inherit" component="h1">
          {title}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default NavigationBar;
