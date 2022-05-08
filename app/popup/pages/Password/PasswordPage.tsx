import { withBlankLayout } from "@/popup/components/layout/blank-layout";
import NavigationBar from "@/popup/components/layout/navigation-bar";
import { IconButton, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { makeStyles } from "@mui/styles";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { InputAdornment, OutlinedInput } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import React, { useLayoutEffect, useState } from "react";
import { MainLayout } from "../../components/layout/main-layout";

const { newMnemonic } = require("incognito-chain-web-js/build/wallet");

const useStyles = makeStyles((theme) => ({
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
  continuePressed: (password: string) => void;
}

const PasswordPageBase: React.FC<PasswordPageBaseProps> = (props: PasswordPageBaseProps) => {
  const styles = useStyles();

  const [password, setPassword] = useState<string>("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  const [verify, setVerify] = useState<string>("");
  const [verifyVisible, setVerifyVisible] = useState(false);

  const { onBack = () => {}, continuePressed = () => {}, passwordInitValue = "ABCD" } = props;

  useLayoutEffect(() => {
    setPassword(passwordInitValue);
    setVerify(passwordInitValue);
  }, []);

  const handleClickShowPassword = () => {
    setPasswordVisible(!passwordVisible);
  };

  const passwordOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleClickShowVerify = () => {
    setVerifyVisible(!verifyVisible);
  };

  const verifyOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVerify(event.target.value);
  };

  const handleMouseDownVerify = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const continueOnClick = () => {
    console.log(" TO DO ");

    const checkValid = true;
    if (checkValid) {
      continuePressed(password);
    }
  };

  return (
    <>
      <NavigationBar goBack={onBack} title={"Password"} />
      <MainLayout>
        <div className={styles.bodyView}>
          <Typography variant="subtitle1">
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an
            unknown printer took a galley.
          </Typography>

          <Typography variant="subtitle1" style={{ marginTop: 25, marginBottom: 12 }}>
            Password
          </Typography>
          <FormControl fullWidth variant="outlined" color="info">
            <InputLabel
              htmlFor="outlined-adornment-password"
              color="info"
              sx={{ color: "#9C9C9C" }}
            >
              Create password(min 10 chars)
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              sx={{ backgroundColor: "#404040", marginBottom: 2 }}
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
          </FormControl>

          <Typography variant="subtitle1" style={{ marginTop: 5, marginBottom: 12 }}>
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
          </FormControl>
        </div>
        <div className={styles.bottomView}>
          <Button
            fullWidth
            variant="contained"
            color="secondary"
            disabled={false}
            style={{ height: 50 }}
            onClick={continueOnClick}
          >
            Continue
          </Button>
        </div>
      </MainLayout>
    </>
  );
};
export const PasswordPage = withBlankLayout(PasswordPageBase);
