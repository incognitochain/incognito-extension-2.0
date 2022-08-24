import { getPrivacyDataByTokenID } from "@redux-sync-storage/selectedPrivacy/selectedPrivacy.selectors";
import { Typography } from "@mui/material/";
import { makeStyles } from "@mui/styles";
import { withBlankLayout } from "@popup/components/layout/blank-layout";
import { MainLayout } from "@popup/components/layout/main-layout";
import { defaultAccountSelector } from "@redux/account/account.selectors";
import React from "react";
import { useSelector } from "react-redux";
import HomeNavigation from "./Home.NavigationBar";

const useStyles = makeStyles((theme: any) => ({
  box: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
  },
}));

interface HomeBasePageProps {
  masterKeyName?: string;
  mnemonic?: string;
  onBack?: () => void;
  continueOnClick?: (masterKeyName?: string, mnemonic?: string) => void;
}

const HomeBasePage: React.FC<HomeBasePageProps> = () => {
  const styles = useStyles();
  const defaultAccount: any = useSelector(defaultAccountSelector);
  return (
    <>
      <HomeNavigation />
      <MainLayout>
        <div className={styles.box}>
          <Typography variant="h6">{"AccountName: " + defaultAccount.AccountName}</Typography>
          <Typography variant="h6">{"PublicKey: " + defaultAccount.PublicKey}</Typography>
          <Typography variant="h6">{"PrivateKey: " + defaultAccount.PrivateKey}</Typography>
        </div>
      </MainLayout>
    </>
  );
};

export default withBlankLayout(HomeBasePage);
