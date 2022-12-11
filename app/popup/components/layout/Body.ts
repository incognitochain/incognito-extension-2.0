import styled, { ITheme } from "styled-components";

const Body = styled.div`
  flex: 1;
  display: block;
  border-radius: 26px 26px 0 0;
  overflow: hidden;
  background: ${({ theme }: { theme: ITheme }) => theme.content};
  padding-top: 0px;
`;

export default Body;
