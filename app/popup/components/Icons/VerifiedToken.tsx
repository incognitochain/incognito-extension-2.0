import React from "react";
import styled from "styled-components";

const Styled = styled.div`
  width: 14px;
  height: 14px;
`;

const VerifiedIcon = () => {
  return <Styled className="icon" />;
};

export default React.memo(VerifiedIcon);
