import { Button, FormControl, FormHelperText, InputLabel, OutlinedInput, Typography } from "@mui/material";
import { MainLayout } from "@popup/components/layout/main-layout";
import NavigationBar from "@popup/components/layout/navigation-bar";
import { useBackground } from "@popup/context/background";
import { useCallAsync } from "@popup/utils/notifications";
import { trim } from "lodash";
import React, { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";

let accountNameValidator = require("password-validator");

let schema = new accountNameValidator();
var reg = /\w+$/i;

schema
  .is()
  .min(1, "Must be at least 1 characters")
  .max(50, "Must be 50 characters or less")
  .has()
  .not()
  .spaces(0, "Account name should not have spaces");

const CreateAccountPage: React.FC = () => {
  const history = useHistory();
  const callAsync = useCallAsync();
  const { request } = useBackground();

  const [keychainName, setKeychainName] = useState("");
  const [keychainNameError, setKeychainNameError] = useState("");

  const keychainOnChange = useCallback((e: any) => {
    setKeychainName(e.target.value);
    setKeychainNameError("");
  }, []);

  const onBack = () => {
    history.goBack();
  };

  const createKeychainOnPressed = () => {
    if (checkValid()) {
      callAsync(request("popup_createAccount", { accountName: trim(keychainName) }), {
        progress: { message: "Account Creating..." },
        success: { message: "Account Created" },
        onSuccess: (result) => {
          history.goBack();
        },
      });
    }
  };

  const checkValid = (): boolean => {
    let checkValid = true;

    const errorList: any[] = schema.validate(keychainName, { details: true }) || [];

    if (errorList.length > 0) {
      checkValid = false;
      setKeychainNameError(errorList[0].message);
    } else if (!keychainName.match(reg)) {
      checkValid = false;
      setKeychainNameError(`Please use a valid account name (Ex: "Cat, Account-1,..").`);
    }
    return checkValid;
  };

  return (
    <>
      <NavigationBar goBack={onBack} title={"Create keychain"} />
      <MainLayout>
        <Typography variant="h6">Keychain name</Typography>
        <FormControl fullWidth variant="outlined" color="info">
          <InputLabel htmlFor="outlined-adornment-password" color="info" sx={{ color: "#9C9C9C" }}>
            Enter a keychain name
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            sx={{ backgroundColor: "#404040" }}
            value={keychainName}
            onChange={keychainOnChange}
            autoComplete="off"
            inputProps={{
              style: { color: "white" },
            }}
            label="Create password(min 10 chars)"
          />

          {keychainNameError.length > 0 && (
            <FormHelperText error style={{ color: "red", fontSize: 13 }}>
              {keychainNameError}
            </FormHelperText>
          )}
        </FormControl>
        <Button
          variant="contained"
          color="secondary"
          style={{ height: 50, marginTop: 15, backgroundColor: "#ffffff", color: "#1A73E8" }}
          onClick={createKeychainOnPressed}
        >
          Create keychain
        </Button>
      </MainLayout>
    </>
  );
};
export default CreateAccountPage;
