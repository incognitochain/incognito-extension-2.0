import { getMasterKeyActiveTypeSelector } from "@redux-sync-storage/masterkey/masterkey.selectors";
import React from "react";
import { useSelector } from "react-redux";
import styled, { ITheme } from "styled-components";

const Container = styled.div`
  color: ${({ theme }: { theme: ITheme }) => theme.primaryP8};
  padding-left: 6px;
  padding-right: 6px;
  margin-left: 6px;
  background-color: ${({ theme }: { theme: ITheme }) => theme.primaryP9};
  border-radius: 4px;

  /* padding: 9px 16px;
  border: 1px solid ${({ theme }: { theme: ITheme }) => theme.primaryP7};
  border-radius: 8px;
  color: ${({ theme }: { theme: ITheme }) => theme.primaryP7}; */
`;

export const MasterKeyLabel = () => {
  const masterKeyTypeActive = useSelector(getMasterKeyActiveTypeSelector);
  return <Container className="desc-text fs-small noselect">{masterKeyTypeActive}</Container>;
};
