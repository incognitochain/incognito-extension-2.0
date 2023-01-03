import styled, { ITheme } from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 16px;
  min-height: 80px;
  padding: 14px 4px;
  border-radius: 8px;
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
    justify-content: initial;
    align-items: baseline;
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

export { Container };
