import { withBlankLayout } from "@popup/components/layout/blank-layout";
import NavigationBar from "@popup/components/layout/navigation-bar";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import {
  InputAdornment,
  OutlinedInput,
  FormControl,
  InputLabel,
  FormHelperText,
  IconButton,
  Typography,
  Button,
} from "@mui/material";
import { MainLayout } from "@popup/components/layout/main-layout";
import React, { useLayoutEffect, useState } from "react";
import { makeStyles } from "@mui/styles";

let passwordValidator = require("password-validator");
let schema = new passwordValidator();

schema
  .is()
  .min(8, "password requires 8 characters minimum")
  .has()
  .not()
  .spaces(0, "The password should not have spaces");

const useStyles = makeStyles((theme: any) => ({
  bodyView: {
    flex: 1,
    display: "flex",
    justifyContent: "flex-start",
    flexDirection: "column",
  },
  bottomView: {
    height: 80,
  },
}));

interface PasswordPageBaseProps {
  onBack?: () => void;
  passwordInitValue?: string;
  continuePressed?: (password: string) => void;
  buttonTitle?: string;
}

const PasswordPageBase: React.FC<PasswordPageBaseProps> = (props: PasswordPageBaseProps) => {
  const styles = useStyles();

  const [password, setPassword] = useState<string>("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  const [verify, setVerify] = useState<string>("");
  const [verifyVisible, setVerifyVisible] = useState(false);
  const [verifyPassword, setVerifyError] = useState("");

  const { onBack = () => {}, continuePressed = () => {}, passwordInitValue = "", buttonTitle = "Continue" } = props;

  useLayoutEffect(() => {
    setPassword(passwordInitValue);
    setVerify(passwordInitValue);
  }, []);

  const handleClickShowPassword = () => {
    setPasswordVisible(!passwordVisible);
  };

  const passwordOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordError("");
    setPassword(event.target.value);
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleClickShowVerify = () => {
    setVerifyVisible(!verifyVisible);
  };

  const verifyOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVerifyError("");
    setVerify(event.target.value);
  };

  const handleMouseDownVerify = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const continueOnClick = () => {
    if (checkValid()) {
      continuePressed(password);
    }
  };

  const checkValid = (): boolean => {
    let checkValid = true;

    const passwordErrorList: any[] = schema.validate(password, { details: true }) || [];
    const verifyErrorList: any[] = schema.validate(verify, { details: true }) || [];

    // console.log("ERROR: ", {
    //   passwordErrorList,
    //   verifyErrorList,
    // });

    if (passwordErrorList.length > 0) {
      checkValid = false;
      setPasswordError(passwordErrorList[0].message);
    }

    if (verifyErrorList.length > 0) {
      checkValid = false;
      setVerifyError(verifyErrorList[0].message);
    }

    if (password.length !== verify.length || password !== verify) {
      checkValid = false;
      setVerifyError("Password and verify password does not match!");
    }

    return checkValid;
  };

  return (
    <>
      <NavigationBar goBack={onBack} title={"Password"} />
      <MainLayout>
        <div className={styles.bodyView}>
          <Typography variant="subtitle1">
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a
            galley.
          </Typography>

          <Typography variant="h6" style={{ marginTop: 25, marginBottom: 12 }}>
            Password
          </Typography>
          <FormControl fullWidth variant="outlined" color="info">
            <InputLabel htmlFor="outlined-adornment-password" color="info" sx={{ color: "#9C9C9C" }}>
              Create password(min 10 chars)
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              sx={{ backgroundColor: "#404040" }}
              type={passwordVisible ? "text" : "password"}
              value={password}
              onChange={passwordOnChange}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                    sx={{ color: "white" }}
                  >
                    {passwordVisible ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                </InputAdornment>
              }
              inputProps={{
                style: { color: "white" },
              }}
              label="Create password(min 10 chars)"
            />

            {passwordError.length > 0 && (
              <FormHelperText error style={{ color: "red", fontSize: 13 }}>
                {passwordError}
              </FormHelperText>
            )}
          </FormControl>

          <Typography variant="h6" style={{ marginTop: 5, marginBottom: 12 }}>
            Verify
          </Typography>
          <FormControl fullWidth variant="outlined" color="info">
            <InputLabel htmlFor="outlined-adornment-verify" color="info" sx={{ color: "#9C9C9C" }}>
              Enter the password again
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-verify"
              sx={{ backgroundColor: "#404040", marginBottom: 2 }}
              type={verifyVisible ? "text" : "password"}
              value={verify}
              onChange={verifyOnChange}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle verify visibility"
                    onClick={handleClickShowVerify}
                    onMouseDown={handleMouseDownVerify}
                    edge="end"
                    sx={{ color: "white" }}
                  >
                    {verifyVisible ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                </InputAdornment>
              }
              inputProps={{
                style: { color: "white" },
              }}
              label="Enter the password again"
            />

            {verifyPassword.length > 0 && (
              <FormHelperText error style={{ color: "red", fontSize: 13 }}>
                {verifyPassword}
              </FormHelperText>
            )}
          </FormControl>
        </div>
        <div className={styles.bottomView}>
          <Button fullWidth variant="contained" color="secondary" style={{ height: 50 }} onClick={continueOnClick}>
            {buttonTitle}
          </Button>
        </div>
      </MainLayout>
    </>
  );
};
export const PasswordPage = withBlankLayout(PasswordPageBase);
