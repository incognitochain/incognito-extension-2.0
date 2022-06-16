import BodyLayout from "@components/layout/BodyLayout";
import styled, { ITheme } from "styled-components";

const ItemStyled = styled.div`
  width: 100%;
  margin-top: 10px;
  margin-bottom: 10px;
  padding: 14px 4px;
  display: flex;
  border-radius: 8px;
  flex-direction: row;
  background-color: ${({ theme }: { theme: ITheme }) => theme.primaryP9};
  .left-view {
    width: 40px;
    height: 40px;
    display: flex;
  }
  .middle-view {
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: center;
  }
  .title {
    color: ${({ theme }: { theme: ITheme }) => theme.primaryP7};
    text-align: start;
  }
  .desc {
    color: ${({ theme }: { theme: ITheme }) => theme.primaryP8};
    text-align: start;
  }
  .right-view {
    width: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export { ItemStyled };
