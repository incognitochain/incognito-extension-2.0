import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Paths } from "@popup/components/routes/paths";
import { useBackground } from "@popup/context/background";
import { useCallAsync } from "@popup/utils/notifications";
import { defaultAccountSelector, listAccountSelector } from "@redux/account/account.selectors";
import { throttle, trim } from "lodash";
import React, { useMemo } from "react";
import { useSelector } from "react-redux";
// import { defaultAccountNameSelector } from '@module/Account/Account.selector';
import { Link, useHistory } from "react-router-dom";
// import { useSelector } from 'react-redux';
import styled, { ITheme } from "styled-components";
import { route } from "./SelectAccount.route";

const CustomLink = styled(Link)`
  padding: 9px 16px;
  border: 1px solid ${({ theme }: { theme: ITheme }) => theme.primaryP7};
  border-radius: 8px;
`;

const AccountNameButtonStyled = styled.button`
  padding: 9px 16px;
  border: 1px solid ${({ theme }: { theme: ITheme }) => theme.primaryP7};
  border-radius: 8px;
  color: ${({ theme }: { theme: ITheme }) => theme.primaryP7};
`;

export const BtnSelectAccount = React.memo(() => {
  // const defaultName = useSelector(defaultAccountNameSelector);
  const { request } = useBackground();
  const callAsync = useCallAsync();
  const history = useHistory();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const defaultAccount: any = useSelector(defaultAccountSelector);
  const listAccount = useSelector(listAccountSelector);
  const listAccountName: any[] = useMemo(
    () => [...listAccount.map((item) => item.AccountName || item.name), "+ Add Account"] || [],
    [listAccount],
  );

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

  const handleClickListItem = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
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

  const handleClose = throttle(() => {
    setAnchorEl(null);
  }, 2000);

  const accountNameSelected = defaultAccount?.AccountName || defaultAccount?.name || "";
  const accountNameSelectedTrim =
    accountNameSelected.length > 8 ? accountNameSelected.substring(0, 8) + "..." : accountNameSelected;

  return (
    <>
      <AccountNameButtonStyled onClick={handleClickListItem} className="btn-select-account fw-medium ellipsis">
        {accountNameSelectedTrim}
      </AccountNameButtonStyled>
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
});
