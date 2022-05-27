import React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { DebugButtons } from "../components/debug-buttons";
import { LoadingIndicator } from "../components/loading-indicator";
import { usePopupState } from "../context/background";
import { withLayout } from "../components/layout";

export const WalletPageBase: React.FC = () => {
  const popupState = usePopupState();
  const isProdNetwork = popupState.selectedNetwork.cluster === "mainnet-beta";

  if (!popupState?.selectedAccount) {
    return <LoadingIndicator />;
  }

  return (
    <Container fixed maxWidth="md">
      <Grid container spacing={3}>
        <Grid item xs={12}></Grid>
        {isProdNetwork ? null : (
          <Grid item xs={12}>
            <DebugButtons />
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export const WalletPage = withLayout(WalletPageBase);
