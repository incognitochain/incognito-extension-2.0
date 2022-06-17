import styled, { ITheme } from "styled-components";
import React from "react";

export const Styled = styled.div`
  margin-top: 20px;
  width: 100%;
  height: 100%;
  display: flex;
  display: inline-block;

  .main-content {
    padding-left: 16px;
    padding-right: 50px;
    width: 100%;
    min-height: 48px;
    display: flex;
    align-items: center;
    flex-direction: row;
    border-radius: 8px;
    border-width: 1px;
    color: ${({ theme }: { theme: ITheme }) => theme.primaryP7};
    background: ${({ theme }: { theme: ITheme }) => theme.primaryP9};
    :focus {
      border: 2px solid ${({ theme }: { theme: ITheme }) => theme.colorP10};
    }
    :hover {
      outline: none !important;
      border: 2px solid ${({ theme }: { theme: ITheme }) => theme.colorP10};
    }
  }

  .dropdown-content {
    margin-top: 1px;
    position: absolute;
    display: none;
    background-color: ${({ theme }: { theme: ITheme }) => theme.primaryP7};
    width: 87%;
    overflow: auto;
    z-index: 1;
    border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px;
  }

  .dropdown-content button {
    width: 100%;
    padding-top: 15px;
    padding-bottom: 15px;
    padding-left: 15px;
    text-align: left;
    color: ${({ theme }: { theme: ITheme }) => theme.primaryP6};
    background-color: ${({ theme }: { theme: ITheme }) => theme.primaryP7};
    :hover {
      color: ${({ theme }: { theme: ITheme }) => theme.primaryP6};
      background-color: ${({ theme }: { theme: ITheme }) => theme.primaryP4};
    }
  }

  :hover .dropdown-content {
    display: block;
  }
  :hover .main-content {
    outline: none !important;
    border: 2px solid ${({ theme }: { theme: ITheme }) => theme.colorP10};
  }

  .icon-drop-down {
    position: absolute;
    align-self: center;
    right: 40px;
    padding: 3px;
    border: solid ${({ theme }: { theme: ITheme }) => theme.primaryP8};
    border-width: 0 3px 3px 0;
    display: inline-block;
    transform: rotate(45deg);
    -webkit-transform: rotate(45deg);
  }
`;
