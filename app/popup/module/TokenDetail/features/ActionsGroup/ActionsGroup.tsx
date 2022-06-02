import React from "react";
import styled, { ITheme } from "styled-components";
import { Button } from "@components/Core";

const Styled = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 30px;
  justify-content: center;
  .btn-container {
    height: 32px;
    width: 80px;
    margin-right: 4px;
    margin-left: 4px;
    background-color: ${({ theme }: { theme: ITheme }) => theme.primaryP9};
    :hover {
      background-color: ${({ theme }: { theme: ITheme }) => theme.colorP3};
    }
  }
`;

const ActionsGroup = React.memo(() => {
  return (
    <Styled>
      <Button title="Send" className="fs-regular" />
      <Button title="Receive" className="fs-regular" />
    </Styled>
  );
});

export default ActionsGroup;
