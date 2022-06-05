import styled, { ITheme } from "styled-components";

const Container = styled.div`
  width: 100%;
  padding: 4px;
  display: flex;
  border-radius: 8px;
  flex-direction: row;
  background-color: ${({ theme }: { theme: ITheme }) => theme.primaryP9};
`;

const LeftView = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
`;

const MiddleView = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
`;

const RightView = styled.div`
  width: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.p`
  color: ${({ theme }: { theme: ITheme }) => theme.primaryP7};
  text-align: start;
`;

const Description = styled.p`
  color: ${({ theme }: { theme: ITheme }) => theme.primaryP8};
  text-align: start;
`;

export { Container, LeftView, MiddleView, RightView, Title, Description };
