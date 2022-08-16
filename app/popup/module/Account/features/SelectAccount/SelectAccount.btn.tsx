import { route as routeSelectAccount } from "@module/Account/features/SelectAccount";
import { getAccountDefaultName } from "@redux-sync-storage/account/account.selectors";
import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import styled, { ITheme } from "styled-components";

const AccountNameButtonStyled = styled.button`
  padding: 9px 16px;
  border: 1px solid ${({ theme }: { theme: ITheme }) => theme.primaryP7};
  border-radius: 8px;
  color: ${({ theme }: { theme: ITheme }) => theme.primaryP7};
`;

export const BtnSelectAccount = () => {
  const history = useHistory();
  const defaultAccountName = useSelector(getAccountDefaultName);
  // const defaultAccount: any = useSelector(defaultAccountSelector);
  // const accountNameSelected = defaultAccount?.AccountName || defaultAccount?.name || "";
  // const accountNameSelectedTrim =
  //   accountNameSelected.length > 8 ? accountNameSelected.substring(0, 8) + "..." : accountNameSelected;

  return (
    <AccountNameButtonStyled
      onClick={() => history.push(routeSelectAccount)}
      className="btn-select-account fw-medium ellipsis hover"
    >
      {defaultAccountName}
    </AccountNameButtonStyled>
  );
};
