import { withBlankLayout } from "@/popup/components/layout/blank-layout";
import NavigationBar from "@/popup/components/layout/navigation-bar";
import { useBackground } from "@/popup/context/background";
import { useCallAsync } from "@/popup/utils/notifications";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Typography } from "@mui/material/";
import IconButton from "@mui/material/IconButton";
import { makeStyles } from "@mui/styles";
import { MainLayout } from "@popup/components/layout/main-layout";
import React from "react";
import { Paths } from "@/popup/components/routes/paths";
import { useHistory } from "react-router-dom";

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

interface HomeBasePageProps {
  masterKeyName?: string;
  mnemonic?: string;
  onBack?: () => void;
  continueOnClick?: (masterKeyName?: string, mnemonic?: string) => void;
}

const HomeBasePage: React.FC<HomeBasePageProps> = (props: HomeBasePageProps) => {
  const styles = useStyles();
  const { request } = useBackground();
  const callAsync = useCallAsync();
  const history = useHistory();

  const lockWallet = () => {
    console.log("TO DO  9999");
    callAsync(request("popup_lockWallet", {}), {
      progress: { message: "locking wallet..." },
      success: { message: "Wallet locked" },
      onSuccess: (result) => {
        history.push(Paths.unlockPage);
      },
    });
  };

  return (
    <>
      <NavigationBar
        rightIconVisible={false}
        title={" HOME"}
        rightIcon={
          <IconButton style={{ position: "absolute", right: 30 }} size="large" edge="end" onClick={lockWallet}>
            <LockOutlinedIcon />
          </IconButton>
        }
      />
      <MainLayout>
        <div className={styles.box}>
          <Typography variant="h6">Wallet...</Typography>
        </div>
      </MainLayout>
    </>
  );
};

export default withBlankLayout(HomeBasePage);
