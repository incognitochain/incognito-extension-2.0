import styled, { ITheme } from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  min-height: 50px;
  align-items: center;

  background-color: ${({ theme }: { theme: ITheme }) => theme.content};

  :hover {
    background-color: ${({ theme }: { theme: ITheme }) => theme.primaryP9};
    cursor: pointer;
  }

  .horizonSpace {
    width: 18px;
  }

  .nameView {
    display: flex;
    flex: 1;
  }

  .arrowView {
    width: 12px;
    height: 12px;
  }
`;

export { Container };
