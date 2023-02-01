import styled, { ITheme } from "styled-components";
import { PrimaryButtonStyled } from "@popup/components/Core/Buttons";

const AccountItemStyled = styled.div`
  width: 100%;
  margin-bottom: 16px;
  padding: 14px 4px;
  border-radius: 8px;
  display: flex;
  flex-direction: row;
  background-color: ${({ theme }: { theme: ITheme }) => theme.primaryP9};
  .left-view {
    width: 40px;
    height: 40px;
    margin-top: 4px;
    display: flex;
    justify-content: center;
  }
  .middle-view {
    display: flex;
    width: 100%;
    flex-direction: column;
    justify-content: center;
  }
  .right-view {
    position: absolute;
    align-self: center;
    right: 40px;
  }
  .title {
    color: ${({ theme }: { theme: ITheme }) => theme.primaryP7};
    text-align: start;
  }
  .desc {
    color: ${({ theme }: { theme: ITheme }) => theme.primaryP8};
    max-lines: 1;
    overflow: hidden;
    text-overflow: clip ellipsis;
    text-align: start;
  }
`;

const Container = styled.div`
  .body {
    height: 536px;
  }

  .list-accounts {
    position: relative;
    flex: 1;
    overflow-x: hidden;
    overflow-y: scroll !important;
    padding-bottom: 30px;
    height: 380px;
  }
`;

export { Container, AccountItemStyled, PrimaryButtonStyled };
