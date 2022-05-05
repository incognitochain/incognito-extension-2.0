import { withBlankLayout } from "@/popup/components/layout/blank-layout";
import NavigationBar from "@/popup/components/layout/navigation-bar";
import { Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { Box, IconButton, InputAdornment, OutlinedInput } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";

const useStyles = makeStyles((theme) => ({
  logoContainer: {
    flex: 3,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.palette.primary.main,
  },

  buttonsContainer: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },

  incognitoStyle: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 10,
  },
}));

const SignInPageBase: React.FC = () => {
  const history = useHistory();
  const styles = useStyles();

  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const goOnClick = () => {
    console.log(" goOnClick TO DO");
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  useEffect(() => {}, []);

  return (
    <>
      <NavigationBar goBack={() => history.goBack()} title={""} />
      <div className={styles.logoContainer}>
        <img
          src="./icons/label_incognito.png"
          width="160"
          height="40"
          style={{ marginTop: 10, marginBottom: 10 }}
        />
        <Typography variant="h5" color="inherit" component="h1">
          {"Welcome back"}
        </Typography>
      </div>
      <div className={styles.buttonsContainer}>
        <Typography variant="h6" sx={{ marginBottom: 13 }}>
          Password
        </Typography>
        <FormControl fullWidth variant="outlined" color="info">
          <InputLabel htmlFor="outlined-adornment-password" color="info" sx={{ color: "#9C9C9C" }}>
            Enter your password
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            sx={{ backgroundColor: "#404040", marginBottom: 2 }}
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={handleChangePassword}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                  sx={{ color: "white" }}
                >
                  {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </IconButton>
              </InputAdornment>
            }
            inputProps={{
              style: { color: "white" },
            }}
            label="Enter your password"
          />
        </FormControl>
        <Button variant="contained" color="secondary" style={{ height: 50 }} onClick={goOnClick}>
          Go Incognito
        </Button>

        <Box
          sx={{
            margin: 2,
            textAlign: "center",
            justifyItems: "ceter",
            alignItems: "center",
          }}
        >
          <Typography
            onClick={() => {
              console.log("TO DO");
            }}
            sx={{
              color: "#757575",
            }}
          >
            {"Forgot your password?"}
          </Typography>
        </Box>
      </div>
    </>
  );
};
export const SignInPage = withBlankLayout(SignInPageBase);