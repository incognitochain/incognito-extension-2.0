import * as React from "react";
import { SVGProps } from "react";
import styled from "styled-components";

const KeypadSVG = (props: SVGProps<SVGSVGElement>) => (
  <svg width={24} height={24} fill="none" {...props}>
    <path
      d="M11.709 7.875a2.437 2.437 0 1 0 0-4.875 2.437 2.437 0 0 0 0 4.875ZM11.709 14.437a2.437 2.437 0 1 0 0-4.875 2.437 2.437 0 0 0 0 4.875ZM11.709 21a2.437 2.437 0 1 0 0-4.875 2.437 2.437 0 0 0 0 4.875Z"
      fill="#F2F4F5"
    />
  </svg>
);

interface IProps {}

const Styled = styled.button`
  width: 40px;
  height: 40px;
`;

const KeypadIcon = (props: IProps & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  const { className = "" } = props;
  return (
    <Styled type="button" className={`icon ${className || ""}`} {...props}>
      <KeypadSVG />
    </Styled>
  );
};

export default KeypadIcon;
