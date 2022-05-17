import { Checkbox, FormControlLabel, Link, makeStyles, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { withLayout } from "../components/layout";
import { Links } from "../components/routes/paths";
import { useBackground } from "../context/background";
import { MnemonicAndSeed } from "../types";
import { useCallAsync } from "../utils/notifications";
import { generateMnemonicAndSeed } from "../utils/wallet-seed";
import { withBlankLayout } from "../components/layout/blank-layout";
import { LoadingIndicator } from "../components/loading-indicator";
import { CheckBox } from "@material-ui/icons";
import { withMainLayout } from "../components/layout/main-layout";
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

const CreateWalletPageBase: React.FC = () => {
  const history = useHistory();
  const handleRestoreClick = () => {
    history.push(Links.restore());
  };
  return (
    <Container maxWidth="sm">
      <>
        <CreateWalletForm />
        <br />
        <Link style={{ cursor: "pointer" }} onClick={handleRestoreClick}>
          Restore existing wallet11
        </Link>
      </>
    </Container>
  );
};

const CreateWalletForm: React.FC = () => {
  const { request } = useBackground();
  const [mnemonicAndSeed, setMnemonicAndSeed] = useState<MnemonicAndSeed>();
  const [savedWords, setSavedWords] = useState(false);
  const callAsync = useCallAsync();

  // promise: Promise<T>

  useEffect(() => {
    generateMnemonicAndSeed().then(setMnemonicAndSeed);
  }, []);

  function submit(password: string) {
    if (!mnemonicAndSeed) {
      return null;
    }

    const { mnemonic, seed } = mnemonicAndSeed;
    callAsync(request("popup_createWallet", { mnemonic, seed, password }), {
      progress: { message: "Creating wallet..." },
      success: { message: "Assets created" },
    });
  }

  if (!savedWords) {
    if (!mnemonicAndSeed) {
      return null;
    }

    return (
      <SeedWordsForm mnemonicAndSeed={mnemonicAndSeed} goForward={() => setSavedWords(true)} />
    );
  }

  return <ChoosePasswordForm goBack={() => setSavedWords(false)} onSubmit={submit} />;
};

interface SeedWordsFormProps {
  goForward: () => void;
  mnemonicAndSeed: MnemonicAndSeed;
}

const SeedWordsForm: React.FC<SeedWordsFormProps> = ({ mnemonicAndSeed, goForward }) => {
  const [confirmed, setConfirmed] = useState(false);
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          EEE11
        </Typography>
        <Typography paragraph>Create new wallet to hold Solana and SPL tokens.</Typography>
        <Typography>
          Please write down the following twelve words and keep them in a safe place:
        </Typography>
        {mnemonicAndSeed ? (
          <TextField
            variant="outlined"
            fullWidth
            multiline
            margin="normal"
            value={mnemonicAndSeed.mnemonic}
            label="Seed Words"
            onFocus={(e) => e.currentTarget.select()}
          />
        ) : (
          <LoadingIndicator />
        )}
        <Typography paragraph>
          Your private keys are only stored on your current computer or device. You will need these
          words to restore your wallet if your device is damaged or lost.
        </Typography>
        <FormControlLabel
          control={
            <Checkbox
              checked={confirmed}
              disabled={!mnemonicAndSeed}
              onChange={(e) => setConfirmed(e.target.checked)}
            />
          }
          label="I have saved these words in a safe place."
        />
      </CardContent>
      <CardActions style={{ justifyContent: "flex-end" }}>
        <Button color="primary" disabled={!confirmed} onClick={goForward}>
          Continue
        </Button>
      </CardActions>
    </Card>
  );
};

interface ChoosePasswordFormProps {
  goBack: () => void;
  onSubmit: (password: string) => void;
}

const ChoosePasswordForm: React.FC<ChoosePasswordFormProps> = ({ goBack, onSubmit }) => {
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Choose a Password (Optional)
        </Typography>
        <Typography>Optionally pick a password to protect your wallet.</Typography>
        <TextField
          variant="outlined"
          fullWidth
          margin="normal"
          label="New Password"
          type="password"
          autoComplete="new-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <TextField
          variant="outlined"
          fullWidth
          margin="normal"
          label="Confirm Password"
          type="password"
          autoComplete="new-password"
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
        />
        <Typography>
          If you forget your password you will need to restore your wallet using your seed words.
        </Typography>
      </CardContent>
      <CardActions style={{ justifyContent: "space-between" }}>
        <Button onClick={goBack}>Back</Button>
        <Button
          color="primary"
          disabled={password !== passwordConfirm}
          onClick={() => onSubmit(password)}
        >
          Create Wallet
        </Button>
      </CardActions>
    </Card>
  );
};

// export const CreateWalletPage = withLayout(CreateWalletPageBase);
export const CreateWalletPage = CreateWalletPageBase;
