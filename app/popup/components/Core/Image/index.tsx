import React, { ImgHTMLAttributes } from "react";
import imgLogo from "./inc_logo.png";
import styled from "styled-components";

interface IProps extends ImgHTMLAttributes<any> {
  iconUrl: string;
}

const Styled = styled.img`
  border-radius: 50%;
`;

const Image = React.memo((props: IProps) => {
  const { iconUrl } = props;

  const onError = (e: any) => {
    e.target.onerror = null;
    e.target.src = imgLogo;
  };

  return <Styled className="logo noselect" src={iconUrl} alt="logo-icon" onError={onError} />;
});

export { Image };
