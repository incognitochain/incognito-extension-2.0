import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
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
