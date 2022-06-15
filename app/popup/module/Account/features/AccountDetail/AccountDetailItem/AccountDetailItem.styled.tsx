import styled, { ITheme } from "styled-components";

const Container = styled.div`
  width: 100%;
  padding-left: 26px;
  padding-right: 26px;
  padding-top: 8px;
  padding-bottom: 8px;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }: { theme: ITheme }) => theme.primaryP9};
`;

const TopView = styled.div`
  height: 40px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const TopLeftView = styled.div`
  display: flex;
  flex: 1;
`;

const TopRightView = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;

const BottomView = styled.div`
  margin-top: 2px;
  width: 85%;
`;

const Title = styled.p`
  color: ${({ theme }: { theme: ITheme }) => theme.primaryP7};
`;

const Description = styled.p`
  color: ${({ theme }: { theme: ITheme }) => theme.primaryP8};
  text-align: left;
  white-space: pre-wrap;
  word-wrap: break-word;
`;

const QrCodeIconContainer = styled.div`
  padding: 4px;
`;

const CopyIconContainer = styled.div`
  padding: 4px;
`;

export {
  Container,
  Title,
  Description,
  TopView,
  TopRightView,
  TopLeftView,
  BottomView,
  QrCodeIconContainer,
  CopyIconContainer,
};
