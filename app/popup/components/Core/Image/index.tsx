import React, { ImgHTMLAttributes } from "react";
import imgLogo from "./inc_logo.png";
import styled from "styled-components";

interface IProps extends ImgHTMLAttributes<any> {
  iconUrl: string;
}

const Styled = styled.img`
  border-radius: 50%;
`;

let error = false;
const Image = React.memo((props: IProps) => {
  let { iconUrl } = props;
  const imgEl = React.useRef<HTMLImageElement>(null);

  const onError = (e: any) => {
    e.target.onerror = null;
    e.target.src = imgLogo;
  };

  if (!iconUrl || error) iconUrl = imgLogo;

  return <Styled className="logo noselect" src={iconUrl} alt="logo-icon" onError={onError} ref={imgEl} />;
});

export { Image };
