import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Hidden from "@mui/material/Hidden";
import IconButton from "@mui/material/IconButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import AccountIcon from "@material-ui/icons/AccountCircle";
import AddIcon from "@material-ui/icons/Add";

import ArrowBackIos from "@material-ui/icons/ArrowBackIos";
import CheckIcon from "@material-ui/icons/Check";
import MenuIcon from "@material-ui/icons/Menu";
import React, { useState } from "react";
import { Link as RouterLink, useHistory } from "react-router-dom";
import { Network } from "../../core/types";
import { useBackground } from "../context/background";
import { useCallAsync } from "../utils/notifications";
import { Links, PathsKey } from "./routes/paths";
import { SolanaIcon } from "./solana-icon";
import { Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme: Theme) => ({
  content: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
  },
  bar: {
    // backgroundColor: 'black',
    // color: theme.palette.primary.main,
  },
  title: {
    // flexGrow: 1,
  },
  button: {
    marginLeft: theme.spacing(1),
  },
  menuItemIcon: {
    minWidth: 32,
  },
}));

export const NavigationFrame: React.FC = () => {
  const classes: any = useStyles();
  const history = useHistory();
  const callAsync = useCallAsync();
  const { request, popupState, changeNetwork, changeAccount, isNotification } = useBackground();
  const account = popupState?.selectedAccount || "";

  const handleSelectAccount = (account: string) => {
    changeAccount(account);
    history.push(Links.accounts());
  };

  const handleCreateAccount = () => {
    callAsync(request("popup_addWalletAccount", {}), {
      progress: { message: "Creating a new account" },
      success: { message: "Account created!" },
    });
  };

  const handleLogout = () => {
    callAsync(request("popup_lockWallet", {}), {
      progress: { message: "locking wallet..." },
      success: { message: "Assets locked" },
      onSuccess: (result) => {
        history.push(Links.login());
      },
    });
  };

  return (
    <>
      <AppBar className={classes.bar} position="sticky">
        <Toolbar>
          <Typography variant="h5" color="inherit" className={classes.title} component="h1">
            {PathsKey[history?.location?.pathname] || "Incognito Assets"}
          </Typography>
          {!isNotification && popupState && popupState.walletState === "unlocked" && (
            <NetworkSelector
              availableNetworks={popupState.availableNetworks}
              selectedNetwork={popupState.selectedNetwork}
              changeNetwork={changeNetwork}
            />
          )}
          {!isNotification && (
            <WalletSelector
              accounts={popupState?.accounts || []}
              addAccount={handleCreateAccount}
              selectedAccount={account || ""}
              selectAccount={handleSelectAccount}
            />
          )}

          {!isNotification && popupState && popupState.walletState === "unlocked" && (
            <MenuSelector onLogout={handleLogout} />
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};

const MenuSelector: React.FC<{ onLogout: () => void }> = ({ onLogout }) => {
  const menuItems: {
    title: string;
    path: string;
  }[] = [
    { title: "Account details", path: Links.accounts() },
    { title: "Authorized websites", path: Links.authorizedWebsites() },
    { title: "Known Tokens", path: Links.tokens() },
  ];
  const [anchorEl, setAnchorEl] = useState<any>();

  return (
    <>
      <Hidden smUp>
        <Tooltip title="More options" arrow>
          <IconButton color="inherit" onClick={(e) => setAnchorEl(e.target)}>
            <MenuIcon />
          </IconButton>
        </Tooltip>
      </Hidden>

      <Menu
        anchorEl={anchorEl}
        open={!!anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        {menuItems.map((item, idx) => {
          return (
            <MenuItem key={`menu-${idx}`} component={RouterLink} to={item.path}>
              <Typography>{item.title}</Typography>
            </MenuItem>
          );
        })}
        <MenuItem key={`menu-lock-wallet`} onClick={onLogout}>
          <Typography>Lock Wallet</Typography>
        </MenuItem>
      </Menu>
    </>
  );
};

interface NetworkSelectorProps {
  availableNetworks: Network[];
  selectedNetwork: Network;
  changeNetwork: (network: Network) => void;
}

const NetworkSelector: React.FC<NetworkSelectorProps> = ({
  availableNetworks,
  selectedNetwork,
  changeNetwork,
}) => {
  const [anchorEl, setAnchorEl] = useState<any>();
  const classes: any = useStyles();
  return (
    <>
      <Hidden xsDown>
        <Button color="inherit" onClick={(e) => setAnchorEl(e.target)} className={classes.button}>
          {selectedNetwork.title}
        </Button>
      </Hidden>
      <Hidden smUp>
        <Tooltip title="Select Network" arrow>
          <IconButton color="inherit" onClick={(e) => setAnchorEl(e.target)}>
            <SolanaIcon />
          </IconButton>
        </Tooltip>
      </Hidden>
      <Menu
        anchorEl={anchorEl}
        open={!!anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        {availableNetworks.map((network) => (
          <MenuItem
            key={network.endpoint}
            onClick={() => {
              setAnchorEl(null);
              changeNetwork(network);
            }}
            selected={network.endpoint === selectedNetwork.endpoint}
          >
            <ListItemIcon className={classes.menuItemIcon}>
              {network.endpoint === selectedNetwork.endpoint ? (
                <CheckIcon fontSize="small" />
              ) : null}
            </ListItemIcon>
            {network.endpoint}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

interface WalletSelectorProps {
  accounts: string[];
  selectedAccount: string;
  addAccount: () => void;
  selectAccount: (account: string) => void;
}

const WalletSelector: React.FC<WalletSelectorProps> = ({
  accounts,
  selectedAccount,
  addAccount,
  selectAccount,
}) => {
  const [anchorEl, setAnchorEl] = useState<any>();
  const classes: any = useStyles();

  if (accounts.length === 0) {
    return null;
  }

  return (
    <>
      <Hidden xsDown>
        <Button color="inherit" onClick={(e) => setAnchorEl(e.target)} className={classes.button}>
          Account
        </Button>
      </Hidden>
      <Hidden smUp>
        <Tooltip title="Select Account" arrow>
          <IconButton color="inherit" onClick={(e) => setAnchorEl(e.target)}>
            <AccountIcon />
          </IconButton>
        </Tooltip>
      </Hidden>
      <Menu
        anchorEl={anchorEl}
        open={!!anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        {accounts.map((account) => (
          <MenuItem
            key={account}
            onClick={() => {
              setAnchorEl(null);
              selectAccount(account);
            }}
            selected={selectedAccount === account}
          >
            <ListItemIcon className={classes.menuItemIcon}>
              {selectedAccount === account ? <CheckIcon fontSize="small" /> : null}
            </ListItemIcon>
            {account}
          </MenuItem>
        ))}
        <Divider />
        <MenuItem
          onClick={() => {
            setAnchorEl(null);
            addAccount();
          }}
        >
          <ListItemIcon className={classes.menuItemIcon}>
            <AddIcon fontSize="small" />
          </ListItemIcon>
          Create Account
        </MenuItem>
      </Menu>
    </>
  );
};
