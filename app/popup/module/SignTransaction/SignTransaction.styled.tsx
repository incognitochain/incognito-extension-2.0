import styled, { ITheme } from "styled-components";

const MainContent = styled.div`
  background-color: ${({ theme }: { theme: ITheme }) => theme.primaryP9};
  .buttons-row {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .deline-button {
    width: 160px;
    height: 50px;
    background: #ffffff;
    border-radius: 8px;
    text-align: center;
    color: ${({ theme }: { theme: ITheme }) => theme.colorP10};
  }

  .space {
    width: 10px;
  }

  .approve-button {
    width: 160px;
    height: 50px;
    background-color: ${({ theme }: { theme: ITheme }) => theme.colorP10};
    color: ${({ theme }: { theme: ITheme }) => theme.primaryP7};
    border-radius: 8px;
    text-align: center;
  }
`;

export { MainContent };
