import { withBlankLayout } from "@/popup/components/layout/blank-layout";
import NavigationBar from "@/popup/components/layout/navigation-bar";
import { Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import CardContent from "@material-ui/core/CardContent";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@mui/material/TextField";
import React, { useCallback, useLayoutEffect, useMemo, useState } from "react";
import { MainLayout } from "../../components/layout/main-layout";

const useStyles = makeStyles((theme) => ({
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

interface CreateNewKeyPageProps {
  masterKeyName?: string;
  onBack?: () => void;
  onReadyClick?: (masterKeyName?: string, checkBoxAccept?: boolean) => void;
  checkBoxAccept?: boolean;
}

const CreateNewKeyPage: React.FC<CreateNewKeyPageProps> = (props: CreateNewKeyPageProps) => {
  const styles = useStyles();

  const {
    masterKeyName = "",
    checkBoxAccept = false,
    onBack = () => {},
    onReadyClick = () => {},
  } = props;

  const [masterKeyNameLocal, setMasterKeyNameLocal] = useState("");
  const [checkBoxAcceptLocal, setCheckBoxAcceptLocal] = useState(false);
  const [errorVisible, setErrorVisible] = useState(false);

  useLayoutEffect(() => {
    setMasterKeyNameLocal(masterKeyName);
    setCheckBoxAcceptLocal(checkBoxAccept);
  }, []);

  const readyOnClick = () => {
    if (!NAME_PATTERN.test(masterKeyNameLocal)) {
      return setErrorVisible(true);
    }
    onReadyClick && onReadyClick(masterKeyNameLocal, checkBoxAcceptLocal);
  };

  const masterKeyOnChange = useCallback((e: any) => {
    setErrorVisible(false);
    setMasterKeyNameLocal(e.target.value);
  }, []);

  const readyButtonDisable: boolean =
    !checkBoxAcceptLocal || !masterKeyNameLocal || masterKeyNameLocal.length < 0;

  return (
    <>
      <NavigationBar goBack={onBack} title={"Create new key"} />
      <MainLayout>
        <div className={styles.box}>
          <div className={styles.box2}>
            <CardContent>
              <Typography variant="h6">Master key name</Typography>
              <TextField
                fullWidth
                className={styles.textInputStyle}
                variant="outlined"
                margin="normal"
                label="Enter a name for your master key"
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
                helperText={
                  errorVisible
                    ? "Master key names must be alphanumeric. Please choose another."
                    : ""
                }
              />
              <Typography variant="subtitle1">
                The next screen will contain 12 special words that will allow you to recover your
                funds.
              </Typography>
              <div style={{ height: 10 }}></div>
              <Typography variant="subtitle1">
                Be prepared to record them in a safe place. If anyone gains access to them, they
                will gain access to your funds.
              </Typography>
            </CardContent>
          </div>
          <div className={styles.box3}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={checkBoxAcceptLocal}
                  style={{ transform: "scale(1.2)" }}
                  onChange={() => setCheckBoxAcceptLocal(!checkBoxAcceptLocal)}
                />
              }
              label={
                <Typography
                  variant="subtitle1"
                  style={{ color: checkBoxAcceptLocal ? "white" : "grey" }}
                >
                  I accept that if I lose these words I will lose access to my funds.
                </Typography>
              }
            />
            <Button
              variant="contained"
              color="secondary"
              disabled={readyButtonDisable}
              style={{ height: 50, marginTop: 20 }}
              onClick={readyOnClick}
            >
              I'm ready
            </Button>
          </div>
        </div>
      </MainLayout>
    </>
  );
};

export default withBlankLayout(CreateNewKeyPage);
