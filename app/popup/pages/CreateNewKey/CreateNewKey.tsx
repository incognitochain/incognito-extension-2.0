import Button from "@material-ui/core/Button";
// import { makeStyles } from "@mui/material";
// import { makeStyles } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { withBlankLayout } from "../../components/layout/blank-layout";
import { Links } from "../../components/routes/paths";

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
  console.log(" 11 GetStartedPageBase Render");

  const history = useHistory();
  const styles = useStyles();
  const createNewKeyOnClick = () => {
    console.log(" TO DO");
    history.push(Links.createNewKeyPage());
  };

  const importPharseOnClick = () => {
    alert("comming soon!");
  };

  useEffect(() => {
    console.log(" GetStartedPageBase DONE");
  }, []);

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
          onClick={createNewKeyOnClick}
        >
          Create new key
        </Button>
        <div style={{ height: 20 }}></div>
        <Button
          variant="contained"
          color="secondary"
          style={{ height: 50, backgroundColor: "#ffffff", color: "#1A73E8" }}
          onClick={importPharseOnClick}
        >
          Import pharse
        </Button>
      </div>
    </>
  );
};

export const GetStartedPage = withBlankLayout(GetStartedPageBase);
