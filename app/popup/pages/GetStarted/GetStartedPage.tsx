import { withBlankLayout } from "@/popup/components/layout/blank-layout";
import Button from "@mui/material/Button";
import { makeStyles } from "@mui/styles";
import React from "react";
import { useHistory } from "react-router-dom";
import { Paths } from "../../components/routes/paths";
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
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 10,
  },
}));

const GetStartedPageBase: React.FC = () => {
  const styles = useStyles();
  const history = useHistory();
  return (
    <>
      <div className={styles.logoContainer}>
        <img src="./icons/ic_circle.png" width="75" height="75" />
        <img
          src="./icons/label_incognito.png"
          width="160"
          height="40"
          style={{ marginTop: 10, marginBottom: 10 }}
        />
        <img src="./icons/label_extention.png" width="70" height="14" />
      </div>
      <div className={styles.buttonsContainer}>
        <Button
          variant="contained"
          color="secondary"
          style={{ height: 50 }}
          onClick={() => {
            history.push(Paths.createNewKeyStack);
          }}
        >
          Create new key
        </Button>
        <div style={{ height: 20 }}></div>
        <Button
          variant="contained"
          color="secondary"
          style={{ height: 50, backgroundColor: "#ffffff", color: "#1A73E8" }}
          onClick={() => {
            history.push(Paths.signInPage);
          }}
        >
          Import pharse
        </Button>
      </div>
    </>
  );
};
export const GetStartedPage = withBlankLayout(GetStartedPageBase);
