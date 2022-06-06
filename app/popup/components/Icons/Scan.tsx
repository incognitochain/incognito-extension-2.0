import React from "react";
import styled from "styled-components";

interface IProps {}

const Styled = styled.button`
  width: 24px;
  height: 24px;
`;

const ScanVector = React.memo((props: any) => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M7.875 19.5H4.687a.188.188 0 0 1-.187-.188v-3.187a.75.75 0 1 0-1.5 0V19.5A1.5 1.5 0 0 0 4.5 21h3.375a.75.75 0 1 0 0-1.5ZM3.75 8.625a.75.75 0 0 0 .75-.75V4.687a.187.187 0 0 1 .188-.187h3.187a.75.75 0 0 0 0-1.5H4.5A1.5 1.5 0 0 0 3 4.5v3.375a.75.75 0 0 0 .75.75Zm16.5 6.75a.75.75 0 0 0-.75.75v3.188a.188.188 0 0 1-.188.187h-3.187a.75.75 0 1 0 0 1.5H19.5a1.5 1.5 0 0 0 1.5-1.5v-3.375a.75.75 0 0 0-.75-.75ZM19.5 3h-3.375a.75.75 0 1 0 0 1.5h3.188a.188.188 0 0 1 .187.188v3.187a.75.75 0 1 0 1.5 0V4.5A1.5 1.5 0 0 0 19.5 3Z"
        fill="#fff"
        {...props}
      />
    </svg>
  );
});

const Scan = (props: IProps & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  const { className = "" } = props;
  return (
    <Styled type="button" className={`icon ${className || ""}`} {...props}>
      <ScanVector />
    </Styled>
  );
};

export default Scan;
