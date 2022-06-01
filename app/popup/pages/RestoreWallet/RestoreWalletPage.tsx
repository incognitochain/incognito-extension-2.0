import Header from "@components/BaseComponent/Header";
import BodyLayout from "@components/layout/BodyLayout";
import PasswordInput from "@popup/components/Inputs/PasswordInput";
import TextArea from "@popup/components/Inputs/TextArea";
import { Paths } from "@popup/components/routes/paths";
import { useBackground } from "@popup/context/background";
import { useCallAsync } from "@popup/utils/notifications";
import { trim } from "lodash";
import React, { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";
import { useLoading } from "@popup/context/loading";
import {
  DescriptionText,
  MnemonicTextArea,
  PasswordLabel,
  PrimaryButtonContaniner,
  VerifyLabel,
} from "./RestoreWalletPage.styled";
import { route as AssetsRoute } from "@module/Assets/Assets.route";

const { validateMnemonic } = require("incognito-chain-web-js/build/wallet");

let validator = require("password-validator");

let schema = new validator();

schema
  .is()
  .min(8, "password requires 8 characters minimum")
  .has()
  .not()
  .spaces(0, "The password should not have spaces");

const RestoreWalletPage: React.FC = () => {
  const history = useHistory();
  const callAsync = useCallAsync();
  const { request } = useBackground();
  const { showLoading } = useLoading();

  const [mnemonic, setMnemonic] = useState("");
  const [mnemonicError, setMnemonicError] = useState(false);

  const [password, setPassword] = useState<string>("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");

  const [verify, setVerify] = useState<string>("");
  const [verifyErrorMessage, setVerifyErrorMessage] = useState("");

  const restoreWallet = async () => {
    showLoading(true);
    callAsync(request("popup_importWallet", { mnemonic, password }), {
      progress: { message: "Restore Wallet..." },
      success: { message: "Restore Done" },
      onSuccess: (result: any) => {
        // history.push(Paths.homeRouteStack);
        showLoading(false);
        history.push(AssetsRoute);
      },
    });
  };

  const onBack = () => {
    history.goBack();
  };

  const mnemonicOnChange = useCallback((e: any) => {
    setMnemonicError(false);
    setMnemonic(e.target.value);
  }, []);

  const passwordOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setPasswordErrorMessage("");
    setPassword(event.target.value);
  };

  const verifyOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setVerifyErrorMessage("");
    setVerify(event.target.value);
  };

  const restoreWalletOnPressed = () => {
    if (checkValid()) {
      restoreWallet();
    }
  };

  const checkValid = (): boolean => {
    let isValid = true;
    const trimmedMnemonic = trim(mnemonic);

    const passwordErrorList: any[] = schema.validate(password, { details: true }) || [];
    const verifyErrorList: any[] = schema.validate(verify, { details: true }) || [];

    if (passwordErrorList.length > 0) {
      isValid = false;
      setPasswordErrorMessage(passwordErrorList[0].message);
    }

    if (verifyErrorList.length > 0) {
      isValid = false;
      setVerifyErrorMessage(verifyErrorList[0].message);
    }

    if (password.length !== verify.length || password !== verify) {
      isValid = false;
      setVerifyErrorMessage("Password and verify password does not match!");
    }

    if (!validateMnemonic(trimmedMnemonic)) {
      isValid = false;
      setMnemonicError(true);
    }

    return isValid;
  };

  return (
    <>
      <Header title={"Reset Wallet"} onBackClick={onBack} />
      <BodyLayout>
        <DescriptionText>
          {
            "Restore your wallet using your twelve seed words. Note that this will delete any existing wallet on this device."
          }
        </DescriptionText>

        <MnemonicTextArea>
          <TextArea
            value={mnemonic}
            multiple={true}
            placeholder={"12 word recovery phrase"}
            onChange={mnemonicOnChange}
            errorEnable={mnemonicError}
            errorText={"Mnemonic words is invalid."}
          />
        </MnemonicTextArea>

        <PasswordLabel>Password</PasswordLabel>
        <PasswordInput
          value={password}
          placeholder={"Create password (min 10 chars)"}
          onChange={passwordOnChange}
          errorEnable={true}
          errorText={passwordErrorMessage}
        />
        <VerifyLabel>Verify</VerifyLabel>
        <PasswordInput
          value={verify}
          placeholder={"Enter the password again"}
          onChange={verifyOnChange}
          errorEnable={true}
          errorText={verifyErrorMessage}
        />
        <PrimaryButtonContaniner onClick={restoreWalletOnPressed} disabled={false}>
          {"Restore"}
        </PrimaryButtonContaniner>
      </BodyLayout>
    </>
  );

  // return (
  //   <div style={{ flex: 1, display: "flex", flexDirection: "column", backgroundColor: "#404040" }}>
  //     <NavigationBar goBack={onBack} title={"Reset Wallet"} />
  //     <MainLayout>
  //       <Typography variant="subtitle1" style={{ marginBottom: 12 }}>
  //         Restore your wallet using your twelve seed words. Note that this will delete any existing wallet on this
  //         device.
  //       </Typography>
  //       <FormControl fullWidth variant="outlined" color="info">
  //         <InputLabel htmlFor="outlined-adornment-password" color="info" sx={{ color: "#9C9C9C" }}>
  //           12 word recovery phrase
  //         </InputLabel>
  //         <OutlinedInput
  //           id="outlined-adornment-password"
  //           sx={{ backgroundColor: "#404040" }}
  //           multiline={true}
  //           value={mnemonic}
  //           maxRows={2}
  //           onChange={mnemonicOnChange}
  //           inputProps={{
  //             style: { color: "white", height: 50 },
  //           }}
  //           label="12 word recovery phrase"
  //         />
  //         {mnemonicError.length > 0 && (
  //           <FormHelperText error style={{ color: "red", fontSize: 13 }}>
  //             {mnemonicError}
  //           </FormHelperText>
  //         )}
  //       </FormControl>

  //       <Typography variant="h6" style={{ marginTop: 10, marginBottom: 10 }}>
  //         Password
  //       </Typography>
  //       <FormControl fullWidth variant="outlined" color="info">
  //         <InputLabel htmlFor="outlined-adornment-password" color="info" sx={{ color: "#9C9C9C" }}>
  //           Create new password (min 10 chars)
  //         </InputLabel>
  //         <OutlinedInput
  //           id="outlined-adornment-password"
  //           sx={{ backgroundColor: "#404040" }}
  //           type={passwordVisible ? "text" : "password"}
  //           value={password}
  //           onChange={passwordOnChange}
  //           endAdornment={
  //             <InputAdornment position="end">
  //               <IconButton
  //                 aria-label="toggle password visibility"
  //                 onClick={handleClickShowPassword}
  //                 onMouseDown={handleMouseDownPassword}
  //                 edge="end"
  //                 sx={{ color: "white" }}
  //               >
  //                 {passwordVisible ? <VisibilityOffIcon /> : <VisibilityIcon />}
  //               </IconButton>
  //             </InputAdornment>
  //           }
  //           inputProps={{
  //             style: { color: "white" },
  //           }}
  //           label="Create new password (min 10 chars)"
  //         />

  //         {passwordError.length > 0 && (
  //           <FormHelperText error style={{ color: "red", fontSize: 13 }}>
  //             {passwordError}
  //           </FormHelperText>
  //         )}
  //       </FormControl>

  //       <Typography variant="h6" style={{ marginTop: 5, marginBottom: 10 }}>
  //         Verify
  //       </Typography>
  //       <FormControl fullWidth variant="outlined" color="info">
  //         <InputLabel htmlFor="outlined-adornment-verify" color="info" sx={{ color: "#9C9C9C" }}>
  //           Enter the password again
  //         </InputLabel>
  //         <OutlinedInput
  //           id="outlined-adornment-verify"
  //           sx={{ backgroundColor: "#404040", marginBottom: 2 }}
  //           type={verifyVisible ? "text" : "password"}
  //           value={verify}
  //           onChange={verifyOnChange}
  //           endAdornment={
  //             <InputAdornment position="end">
  //               <IconButton
  //                 aria-label="toggle verify visibility"
  //                 onClick={handleClickShowVerify}
  //                 onMouseDown={handleMouseDownVerify}
  //                 edge="end"
  //                 sx={{ color: "white" }}
  //               >
  //                 {verifyVisible ? <VisibilityOffIcon /> : <VisibilityIcon />}
  //               </IconButton>
  //             </InputAdornment>
  //           }
  //           inputProps={{
  //             style: { color: "white" },
  //           }}
  //           label="Enter the password again"
  //         />

  //         {verifyPassword.length > 0 && (
  //           <FormHelperText error style={{ color: "red", fontSize: 13 }}>
  //             {verifyPassword}
  //           </FormHelperText>
  //         )}
  //       </FormControl>

  //       <Button
  //         fullWidth
  //         variant="contained"
  //         color="secondary"
  //         style={{ height: 50, marginTop: 20 }}
  //         onClick={restoreWalletOnPressed}
  //       >
  //         {"Restore"}
  //       </Button>
  //     </MainLayout>
  //   </div>
  // );
};

export default RestoreWalletPage;
