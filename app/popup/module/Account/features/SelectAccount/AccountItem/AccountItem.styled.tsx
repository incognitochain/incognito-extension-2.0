import styled, { ITheme } from "styled-components";

const Container = styled.button`
  width: 100%;
  margin-top: 10px;
  margin-bottom: 10px;
  padding-left: 4px;
  padding-right: 4px;
  padding-top: 14px;
  padding-bottom: 14px;
  border-radius: 8px;
  display: flex;
  flex-direction: row;
  background-color: ${({ theme }: { theme: ITheme }) => theme.primaryP9};
`;

const LeftView = styled.div`
  width: 40px;
  height: 40px;
  margin-top: 4px;
  display: flex;
  justify-content: center;
`;

const MiddleView = styled.div`
  display: flex;
  width: 80%;
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
  max-lines: 1;
  overflow: hidden;
  text-overflow: clip ellipsis;
  text-align: start;
`;

export { Container, LeftView, MiddleView, RightView, Title, Description };
