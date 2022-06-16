import styled, { ITheme } from "styled-components";

const KeyChainDetailItemStyled = styled.div`
  width: 100%;
  padding: 10px 26px 8px;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }: { theme: ITheme }) => theme.primaryP9};
  .top-view {
    height: 40px;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .top-left-view {
    display: flex;
    flex: 1;
  }
  .bottom-view {
    margin-top: 2px;
  }
  .title {
    color: ${({ theme }: { theme: ITheme }) => theme.primaryP7};
  }
  .desc {
    color: ${({ theme }: { theme: ITheme }) => theme.primaryP8};
    text-align: left;
    white-space: pre-wrap;
    word-wrap: break-word;
  }
  .qrcode-icon {
    margin-right: 5px;
  }
  .copy-icon {
    margin-left: 5px;
  }
`;

export { KeyChainDetailItemStyled };
