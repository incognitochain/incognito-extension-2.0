import { Theme, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { withBlankLayout } from "@popup/components/layout/blank-layout";
import React from "react";
import { MainLayout } from "../../components/layout/main-layout";

const useStyles = makeStyles((theme: Theme) => ({
  box: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
}));

const NotFoundPage: React.FC = () => {
  const styles = useStyles();

  return (
    <div className={styles.box}>
      <Typography variant="h6" style={{ color: "white", marginTop: 10, marginBottom: 10 }}>
        Page Not Found.
      </Typography>
    </div>
  );
};

export default withBlankLayout(NotFoundPage);
