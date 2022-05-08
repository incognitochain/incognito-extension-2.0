import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import { useCallAsync } from "../utils/notifications";
import Link from "@mui/material/Link";
import { useBackground } from "../context/background";
import { withLayout } from "../components/layout";
import { Links } from "../components/routes/paths";

const LoginPageBase: React.FC = () => {
  const { isNotification } = useBackground();
  const history = useHistory();
  const goToRestore = () => {
    history.push(Links.restore());
  };

  const handleSuccess = () => {
    if (isNotification) {
      history.push(Links.notifications());
    } else {
      history.push(Links.accounts());
    }
  };

  return (
    <Container maxWidth="sm">
      <>
        <LoginForm onSuccess={handleSuccess} />
        <br />
        <Link style={{ cursor: "pointer" }} onClick={goToRestore}>
          Restore existing wallet
        </Link>
      </>
    </Container>
  );
};

const LoginForm: React.FC<{ onSuccess: () => void }> = ({ onSuccess }) => {
  const [password, setPassword] = useState("");
  const [stayLoggedIn, setStayLoggedIn] = useState(false);
  const callAsync = useCallAsync();
  const { request } = useBackground();

  function submit() {
    callAsync(request("popup_unlockWallet", { password }), {
      progress: { message: "Unlocking wallet..." },
      success: { message: "Wallet unlocked" },
      onSuccess: onSuccess,
    });
  }

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Unlock Wallet
        </Typography>
        <TextField
          variant="outlined"
          fullWidth
          margin="normal"
          label="Password"
          type="password"
          autoFocus
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{
            onKeyPress: (event: React.KeyboardEvent<HTMLInputElement>) => {
              if (event.key === "Enter") {
                submit();
              }
            },
          }}
        />
        <FormControlLabel
          control={
            <Checkbox checked={stayLoggedIn} onChange={(e) => setStayLoggedIn(e.target.checked)} />
          }
          label="Keep wallet unlocked"
        />
      </CardContent>
      <CardActions style={{ justifyContent: "flex-end" }}>
        <Button color="primary" onClick={submit}>
          Unlock
        </Button>
      </CardActions>
    </Card>
  );
};

export const LoginPage = withLayout(LoginPageBase);
