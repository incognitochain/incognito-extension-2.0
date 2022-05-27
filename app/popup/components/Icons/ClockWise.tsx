import React from "react";
import styled from "styled-components";
import { ENVS } from "@popup/configs/Configs.env";

interface IProps {}

const Styled = styled.button`
  width: 40px;
  height: 40px;
`;

const ClockWise = (props: IProps & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <Styled className="icon" {...props}>
      <img src={`${ENVS.REACT_APP_DOMAIN_URL}/images/icons/clockwise.png`} alt="" />
    </Styled>
  );
};

export default ClockWise;
