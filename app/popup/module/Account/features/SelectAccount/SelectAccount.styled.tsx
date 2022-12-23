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

const Container = styled.div``;

const MiddleView = styled.button``;

const RightView = styled.div`
  position: absolute;
  align-self: center;
  right: 40px;
`;

const Title = styled.p``;

const Description = styled.p``;

const TextInputWraper = styled.div`
  width: 100%;
  margin-top: 8px;
`;

const KeyChainLabel = styled.p`
  width: 100%;
  margin-top: 24px;
  text-align: left;
`;

const PrimaryButtonContaniner = styled(PrimaryButtonStyled)`
  position: absolute;
  left: 24px;
  right: 24px;
  height: 50px;
  width: auto;
  bottom: 10px;
`;

export { AccountItemStyled, PrimaryButtonContaniner, Container };
