import styled, { ITheme } from "styled-components";

export const MainLayout = styled.div`
  color: ${({ theme }: { theme: ITheme }) => theme.primaryP7};
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-left: 24px;
  padding-right: 24px;
  width: 100%;
  height: 100%;
  margin: 0;
`;
