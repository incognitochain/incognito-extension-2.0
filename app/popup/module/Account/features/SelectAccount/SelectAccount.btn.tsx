import React from "react";
// import { useSelector } from 'react-redux';
import styled, { ITheme } from "styled-components";
// import { defaultAccountNameSelector } from '@module/Account/Account.selector';
import { Link } from "react-router-dom";
import { route } from "./SelectAccount.route";

const CustomLink = styled(Link)`
  padding: 9px 16px;
  border: 1px solid ${({ theme }: { theme: ITheme }) => theme.primaryP7};
  border-radius: 8px;
`;

export const BtnSelectAccount = React.memo(() => {
  // const defaultName = useSelector(defaultAccountNameSelector);
  return (
    <CustomLink to={route} className="btn-select-account fw-medium ellipsis">
      Anon
    </CustomLink>
  );
});
