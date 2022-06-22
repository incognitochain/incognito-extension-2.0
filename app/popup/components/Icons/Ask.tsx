import * as React from "react";
import { SVGProps } from "react";
import styled from "styled-components";

const AskVector = (props: SVGProps<SVGSVGElement>) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
    <path
      d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm0 15.833a1.25 1.25 0 1 1 0-2.501 1.25 1.25 0 0 1 0 2.501Zm1.333-5.066a.833.833 0 0 0-.5.766.834.834 0 0 1-1.666 0 2.5 2.5 0 0 1 1.5-2.291 1.667 1.667 0 1 0-2.334-1.534.834.834 0 0 1-1.666 0 3.333 3.333 0 1 1 4.666 3.059Z"
      fill="#fff"
    />
  </svg>
);

interface IProps {}

const Styled = styled.button`
  padding: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Ask = (props: IProps & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  const { className = "" } = props;
  return (
    <Styled type="button" className={`icon ${className || ""}`} {...props}>
      <AskVector />
    </Styled>
  );
};

export default Ask;
