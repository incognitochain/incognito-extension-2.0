import React from "react";
import { ENVS } from "@popup/configs/Configs.env";
import styled from "styled-components";

interface IProps {
  toggle?: boolean;
}

const Styled = styled.button`
  width: 20px;
  height: 13px;
`;

const Eye = (props: IProps & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  const { toggle } = props;
  return (
    <Styled className="icon" {...props} type="button">
      <img src={`${ENVS.REACT_APP_DOMAIN_URL}/images/icons/${toggle ? "" : "closed-"}eye.png`} alt="toggle-input" />
    </Styled>
  );
};

export default Eye;
