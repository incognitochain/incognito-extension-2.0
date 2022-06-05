import styled, { ITheme } from "styled-components";

const Container = styled.button`
  width: 100%;
  margin-top: 6px;
  margin-bottom: 6px;
  padding: 4px;
  border-radius: 8px;
  display: flex;
  flex-direction: row;
  background-color: ${({ theme }: { theme: ITheme }) => theme.primaryP9};
  :disabled {
    opacity: 0.4;
  }
`;

const LeftView = styled.div`
  width: 40px;
  height: 40px;
  padding-top: 6.5px;
  justify-content: center;
  align-items: flex-start;
  display: flex;
`;

const CircleView = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background-color: ${({ theme }: { theme: ITheme }) => theme.primaryP7};
`;

const RightView = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`;

const Title = styled.p`
  color: ${({ theme }: { theme: ITheme }) => theme.primaryP7};
  text-align: start;
`;

const Description = styled.p`
  color: ${({ theme }: { theme: ITheme }) => theme.primaryP8};
  text-align: start;
`;

export { Container, LeftView, RightView, Title, Description, CircleView };
