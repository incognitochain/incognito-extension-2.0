import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import ArrowBackIos from "@material-ui/icons/ArrowBackIos";
import React, { memo } from "react";
import { Button } from "@mui/material";

interface NavigationBarProps {
  rightIconVisible?: boolean;
  goBack?: () => void;
  title?: string;
  rightIcon?: React.ReactNode;
}

const NavigationBar: React.FC<NavigationBarProps> = ({
  rightIconVisible = true,
  goBack,
  title = "Incognito Wallet",
  rightIcon = null,
}) => {
  return (
    <AppBar color="primary" position="static">
      <Toolbar>
        {rightIconVisible && (
          <IconButton onClick={goBack} size="large" edge="start">
            <ArrowBackIos />
          </IconButton>
        )}
        <Typography variant="h5" color="inherit" component="h1">
          {title}
        </Typography>

        {rightIcon}
      </Toolbar>
    </AppBar>
  );
};

export default NavigationBar;
