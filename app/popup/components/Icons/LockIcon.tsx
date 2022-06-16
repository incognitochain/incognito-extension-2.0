import * as React from "react";
import { SVGProps } from "react";
import styled from "styled-components";

const LockVector = (props: SVGProps<SVGSVGElement>) => (
  <svg width={40} height={40} fill="none" {...props}>
    <circle cx={20} cy={20} r={20} fill="#303030" />
    <path
      d="M26.167 17.917h-.625v-2.292a5.625 5.625 0 0 0-11.25 0v2.292h-.625A1.667 1.667 0 0 0 12 19.583v8.75A1.666 1.666 0 0 0 13.667 30h12.5a1.667 1.667 0 0 0 1.666-1.667v-8.75a1.667 1.667 0 0 0-1.666-1.666Zm-6.25 7.5a1.667 1.667 0 1 1 0-3.334 1.667 1.667 0 0 1 0 3.334Zm3.541-7.917a.417.417 0 0 1-.416.417h-6.25a.417.417 0 0 1-.417-.417v-1.875a3.542 3.542 0 1 1 7.083 0V17.5Z"
      fill="#fff"
    />
  </svg>
);

interface IProps {}

const Styled = styled.button`
  width: 40px;
  height: 40px;
`;

const Lock = (props: IProps & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  const { className = "" } = props;
  return (
    <Styled type="button" className={`icon ${className || ""}`} {...props}>
      <LockVector />
    </Styled>
  );
};

export default Lock;
