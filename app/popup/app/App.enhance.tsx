import React, { FunctionComponent } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const enhance = (WrappedComponent: FunctionComponent) => (props: any) => {
  return (
    <Wrapper>
      <WrappedComponent {...props} />
    </Wrapper>
  );
};

export default enhance;
