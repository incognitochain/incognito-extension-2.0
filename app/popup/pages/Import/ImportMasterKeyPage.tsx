import { withBlankLayout } from "@/popup/components/layout/blank-layout";
import NavigationBar from "@/popup/components/layout/navigation-bar";
import { Button, TextField, Typography } from "@mui/material/";
import { makeStyles } from "@mui/styles";
import { MainLayout } from "@popup/components/layout/main-layout";
import { trim } from "lodash";
import React, { useCallback, useLayoutEffect, useState } from "react";
const { validateMnemonic } = require("incognito-chain-web-js/build/wallet");

const useStyles = makeStyles((theme: any) => ({
  textInputStyle: {
    color: "#ffffff",
    backgroundColor: "#404040",
  },

  box: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
  },

  box2: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
  },
  box3: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
}));

const NAME_PATTERN = /^[A-Za-z0-9]*$/;

interface ImportMasterPageProps {
  masterKeyName?: string;
  mnemonic?: string;
  onBack?: () => void;
  continueOnClick?: (masterKeyName?: string, mnemonic?: string) => void;
}

const ImportMasterPage: React.FC<ImportMasterPageProps> = (props: ImportMasterPageProps) => {
  const styles = useStyles();
  const { masterKeyName = "", onBack = () => {}, continueOnClick = () => {}, mnemonic = "" } = props;

  const [masterKeyNameLocal, setMasterKeyNameLocal] = useState("");
  const [mnemonicLocal, setMnemonicLocal] = useState("");

  const [errorVisible, setErrorVisible] = useState(false);
  const [mnemonicErrorVisible, setMnemonicErrorVisible] = useState(false);

  useLayoutEffect(() => {
    setMasterKeyNameLocal(masterKeyName);
    setMnemonicLocal(mnemonic);
  }, []);

  const continueOnPress = () => {
    const trimmedName = trim(masterKeyNameLocal);
    const trimmedMnemonic = trim(mnemonicLocal);

    if (!NAME_PATTERN.test(masterKeyNameLocal)) {
      return setErrorVisible(true);
    }

    if (!validateMnemonic(trimmedMnemonic)) {
      return setMnemonicErrorVisible(true);
    }

    continueOnClick && continueOnClick(trimmedName, trimmedMnemonic);
  };

  const masterKeyOnChange = useCallback((e: any) => {
    setErrorVisible(false);
    setMasterKeyNameLocal(e.target.value);
  }, []);

  const mnemonicOnChange = useCallback((e: any) => {
    setMnemonicErrorVisible(false);
    setMnemonicLocal(e.target.value);
  }, []);

  const continueButtonDisable = trim(masterKeyNameLocal || "").length === 0 || trim(mnemonicLocal || "").length === 0;

  return (
    <>
      <NavigationBar goBack={onBack} title={"Import Master Key"} />
      <MainLayout>
        <div className={styles.box}>
          <Typography variant="h6">Master key name</Typography>
          <TextField
            fullWidth
            className={styles.textInputStyle}
            variant="outlined"
            margin="normal"
            label=""
            InputProps={{
              style: { color: "white" },
            }}
            InputLabelProps={{
              style: { color: "grey" },
            }}
            autoComplete="off"
            value={masterKeyNameLocal}
            onChange={masterKeyOnChange}
            error={errorVisible}
            helperText={errorVisible ? "Master key names must be alphanumeric. Please choose another." : ""}
          />

          <Typography variant="h6" style={{ marginTop: 10, marginBottom: 10 }}>
            Enter your wallet’s 12 word recovery phrase to countinue.
          </Typography>

          <TextField
            fullWidth
            id="outlined-multiline-static"
            label=""
            multiline
            rows={2}
            className={styles.textInputStyle}
            InputProps={{
              style: { color: "white" },
            }}
            InputLabelProps={{
              style: { color: "grey" },
            }}
            value={mnemonicLocal}
            onChange={mnemonicOnChange}
            error={mnemonicErrorVisible}
            helperText={mnemonicErrorVisible ? "Mnemonic words is invalid." : ""}
          />
        </div>
        <Button
          variant="contained"
          color="secondary"
          fullWidth
          style={{ height: 50, marginBottom: 25 }}
          onClick={() => setMnemonicLocal("until derive famous identify tooth valve cross hero cube news hold barrel")}
        >
          HARD 12 pharse
        </Button>
        <Button
          variant="contained"
          color="secondary"
          disabled={continueButtonDisable}
          fullWidth
          style={{ height: 50, marginBottom: 25 }}
          onClick={continueOnPress}
        >
          I'm ready
        </Button>
      </MainLayout>
    </>
  );
};

export default withBlankLayout(ImportMasterPage);
