import React from "react";
import styled from "styled-components";
import { LoadingIcon } from "@components/Icons";

const Styled = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  justify-content: center;
  display: flex;
  align-items: center;
  flex-direction: column;
  .message {
    margin-top: 16px;
  }
`;

const LoadingContainer = ({ message }: { message?: string }) => {
  return (
    <Styled className="flex">
      <LoadingIcon width="35px" height="35px" />
      {message && <p className="fs-medium fw-medium message">{message}</p>}
    </Styled>
  );
};

export default LoadingContainer;
