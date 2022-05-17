import { withBlankLayout } from "@/popup/components/layout/blank-layout";
import { Paths } from "@/popup/components/routes/paths";
import { checkPasswordValid } from "@/services/wallet/passwordService";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Theme,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { debounce } from "lodash";
import React, { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) => ({
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

const UnlockPageBase: React.FC = () => {
  const history = useHistory();
  const styles = useStyles();

  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState<string>("");

  const unLockOnClick = useCallback(
    debounce(async () => {
      try {
        const passWordValid = await checkPasswordValid(password);
        if (passWordValid) {
          history.push(Paths.homeRouteStack);
        }
      } catch (error) {
        if (typeof error === "object") {
          setPasswordErrorMessage(error?.message);
        }
      }
    }, 1000),
    [password],
  );

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordErrorMessage("");
    setPassword(event.target.value);
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    setPasswordErrorMessage("");
    event.preventDefault();
  };

  useEffect(() => {}, []);

  const unLockButtonDisable = !password || password.length < 1;

  return (
    <>
      <div className={styles.logoContainer}>
        <img src="./icons/label_incognito.png" width="160" height="40" style={{ marginTop: 10, marginBottom: 10 }} />
        <Typography variant="h5" color="inherit" component="h1">
          {"Welcome back"}
        </Typography>
      </div>
      <div className={styles.buttonsContainer}>
        <Typography variant="h6" sx={{ marginBottom: 2 }}>
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
          {passwordErrorMessage.length > 0 && (
            <FormHelperText error style={{ color: "red", fontSize: 13 }}>
              {passwordErrorMessage}
            </FormHelperText>
          )}
        </FormControl>
        <Button
          disabled={unLockButtonDisable}
          variant="contained"
          color="secondary"
          style={{ height: 50 }}
          onClick={unLockOnClick}
        >
          Unlock
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
export const UnlockPage = withBlankLayout(UnlockPageBase);
