import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Box, Chip } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import { Paths } from "@popup/components/routes/paths";
import { useBackground } from "@popup/context/background";
import { useCallAsync } from "@popup/utils/notifications";
import { defaultAccountSelector, listAccountSelector } from "@redux/account/account.selectors";
import { throttle, trim } from "lodash";
import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const HomeNavigation: React.FC = () => {
  const { request } = useBackground();
  const callAsync = useCallAsync();
  const history = useHistory();

  const defaultAccount: any = useSelector(defaultAccountSelector);
  const listAccount = useSelector(listAccountSelector);
  const listAccountName = useMemo(
    () => [...listAccount.map((item) => item.AccountName || item.name), "+ Add Account"] || [],
    [listAccount],
  );

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClickListItem = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const switchAccount = (accountName: string) => {
    callAsync(request("popup_switchAccount", { accountName: trim(accountName) }), {
      progress: { message: "Switching Account..." },
      success: { message: "Switch Done" },
      onSuccess: (result) => {
        // history.goBack();
        console.log("Swtich Account Done: TO DO ");
      },
    });
  };

  const handleMenuItemClick = (event: React.MouseEvent<HTMLElement>, index: number) => {
    setAnchorEl(null);
    if (index != 0 && index === listAccountName.length - 1) {
      history.push(Paths.createAccountPage);
      return;
    }

    const accountName = listAccountName[index];
    if (accountName && (accountName != defaultAccount.AccountName || accountName != defaultAccount?.name)) {
      switchAccount(accountName);
    }
  };

  const onReloadPressed = throttle(() => {
    console.log("onReloadPressed TO DO ");
  }, 2000);

  const onSearchPressed = throttle(() => {
    console.log("onSearchPressed TO DO ");
  }, 2000);

  const onLockPressed = throttle(() => {
    console.log("onLockPressed TO DO ");
    callAsync(request("popup_lockWallet", {}), {
      progress: { message: "locking wallet..." },
      success: { message: "Wallet locked" },
      onSuccess: (result) => {
        console.log(" TO DO ");
        history.push(Paths.unlockPage);
      },
    });
  }, 2000);

  const handleClose = throttle(() => {
    setAnchorEl(null);
  }, 2000);

  const accountNameSelected = defaultAccount?.AccountName || defaultAccount?.name || "";
  const accountNameSelectedTrim =
    accountNameSelected.length > 8 ? accountNameSelected.substring(0, 8) + "..." : accountNameSelected;

  return (
    <>
      <AppBar color="primary" position="static">
        <Toolbar>
          <IconButton onClick={onReloadPressed}>
            <img src="./icons/ic_reload.png" width="35" height="35" />
          </IconButton>
          <IconButton onClick={onSearchPressed}>
            <img src="./icons/ic_search.png" width="35" height="35" />
          </IconButton>

          <Box
            sx={{
              display: "flex",
              flex: 1,
              flexDirection: "row",
              justifyContent: "flex-end",
            }}
          >
            <IconButton onClick={onLockPressed}>
              <LockOutlinedIcon />
            </IconButton>
            <IconButton onClick={handleClickListItem}>
              <Chip label={accountNameSelectedTrim} variant="outlined" />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <Menu
        id="lock-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "lock-button",
          role: "listbox",
        }}
      >
        {listAccountName.map((accountName, index) => (
          <MenuItem
            key={accountName}
            selected={accountName == defaultAccount?.AccountName || accountName == defaultAccount?.name}
            onClick={(event) => handleMenuItemClick(event, index)}
          >
            {accountName}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default HomeNavigation;
