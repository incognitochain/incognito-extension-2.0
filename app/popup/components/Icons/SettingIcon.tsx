import * as React from "react";
import { SVGProps } from "react";
import styled from "styled-components";

const SettingVector = (props: SVGProps<SVGSVGElement>) => (
  <svg width={40} height={40} fill="none" {...props}>
    <circle cx={20} cy={20} r={20} fill="#303030" />
    <path
      d="M27.875 18.125H26.48a7.13 7.13 0 0 0-.57-1.38l.982-.99a1.094 1.094 0 0 0 .33-.795 1.102 1.102 0 0 0-.33-.795l-1.057-1.057a1.117 1.117 0 0 0-1.59 0l-.99.99a6.753 6.753 0 0 0-1.38-.578v-1.395A1.125 1.125 0 0 0 20.75 11h-1.5a1.125 1.125 0 0 0-1.125 1.125v1.395c-.48.14-.943.335-1.38.578l-.99-.99a1.117 1.117 0 0 0-1.59 0l-1.057 1.057a1.103 1.103 0 0 0-.33.795 1.08 1.08 0 0 0 .33.795l.982.99a7.13 7.13 0 0 0-.57 1.38h-1.395A1.125 1.125 0 0 0 11 19.25v1.5a1.125 1.125 0 0 0 1.125 1.125h1.395c.14.48.331.942.57 1.38l-.982.99a1.125 1.125 0 0 0 0 1.59l1.057 1.057a1.148 1.148 0 0 0 1.59 0l.99-.982c.438.239.9.43 1.38.57v1.395A1.125 1.125 0 0 0 19.25 29h1.5a1.125 1.125 0 0 0 1.125-1.125V26.48c.48-.14.942-.331 1.38-.57l.99.982a1.117 1.117 0 0 0 1.59 0l1.057-1.057a1.125 1.125 0 0 0 0-1.59l-.982-.99c.239-.438.43-.9.57-1.38h1.395A1.125 1.125 0 0 0 29 20.75v-1.5a1.125 1.125 0 0 0-1.125-1.125ZM20 23.75a3.75 3.75 0 1 1 0-7.5 3.75 3.75 0 0 1 0 7.5Z"
      fill="#fff"
    />
  </svg>
);

interface IProps {}

const Styled = styled.button`
  width: 40px;
  height: 40px;
`;

const Setting = (props: IProps & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  const { className = "" } = props;
  return (
    <Styled type="button" className={`icon ${className || ""}`} {...props}>
      <SettingVector />
    </Styled>
  );
};

export default Setting;
