import * as React from "react";
import { SVGProps } from "react";
import styled from "styled-components";

const DropdownIconSVG = (props: SVGProps<SVGSVGElement>) => (
  <svg width={8} height={8} fill="none" {...props}>
    <path
      d="M7.824 1a.667.667 0 0 0-.58-.333H.757a.667.667 0 0 0-.57 1L3.43 7.023a.667.667 0 0 0 1.14 0l3.244-5.356A.667.667 0 0 0 7.824 1Z"
      fill="#fff"
    />
  </svg>
);

interface IProps {}

const Styled = styled.div``;

const DropdownIcon = (props: IProps & React.HTMLAttributes<HTMLElement>) => {
  const { className = "" } = props;
  return (
    <Styled className={`${className || ""}`} {...props}>
      <DropdownIconSVG />
    </Styled>
  );
};

export default DropdownIcon;
