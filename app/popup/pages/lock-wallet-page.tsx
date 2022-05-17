import React, { useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Paths } from "../components/routes/paths";
import { withLayout } from "../components/layout";
import { useCallAsync } from "../utils/notifications";
import { useBackground } from "../context/background";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Typography } from "@mui/material";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";

const LockWalletPageBase: React.FC = () => {
  const callAsync = useCallAsync();
  const { request } = useBackground();

  useEffect(() => {
    callAsync(request("popup_lockWallet", {}), {
      progress: { message: "locking wallet..." },
      success: { message: "Assets locked" },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Your wallet is locked
        </Typography>
      </CardContent>
      <CardActions style={{ justifyContent: "flex-end" }}>
        <Button color="primary" component={RouterLink} to={Paths.accounts}>
          Unlock
        </Button>
      </CardActions>
    </Card>
  );
};

export const LockWalletPage = withLayout(LockWalletPageBase);
