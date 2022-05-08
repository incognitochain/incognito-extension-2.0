import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { makeStyles } from "@mui/styles";
import React from "react";
import { withBlankLayout } from "../../components/layout/blank-layout";
import { Theme } from "@mui/material";

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
    justifyContent: "center",
    flexDirection: "column",

    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },

  incognitoStyle: {
    backgroundColor: "green",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 10,
  },
}));

interface MasterKeyPharseCreatedPageBaseProps {
  onContinue?: () => void;
}

const MasterKeyPharseCreatedPageBase: React.FC<MasterKeyPharseCreatedPageBaseProps> = (
  props: MasterKeyPharseCreatedPageBaseProps,
) => {
  const styles = useStyles();

  const { onContinue = () => {} } = props;
  return (
    <>
      <div className={styles.logoContainer}>
        <img src="./icons/ic_circle.png" width="75" height="75" />
        <Typography variant="h6" style={{ color: "white", marginTop: 10, marginBottom: 10 }}>
          You're ready to go Incognito.
        </Typography>
        <Typography variant="subtitle1" style={{ color: "grey" }}>
          Master key created.
        </Typography>
        <Typography variant="subtitle1" style={{ color: "grey" }}>
          Launch the extension to continue.
        </Typography>
      </div>
      <div className={styles.buttonsContainer}>
        <Button variant="contained" color="secondary" style={{ height: 50 }} onClick={onContinue}>
          Continue
        </Button>
      </div>
    </>
  );
};

export const MasterKeyPharseCreatedPage = withBlankLayout(MasterKeyPharseCreatedPageBase);
