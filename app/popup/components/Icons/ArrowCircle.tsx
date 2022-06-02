import React from "react";
import styled, { ITheme } from "styled-components";

interface IProps {}

const Styled = styled.button`
  padding: 8px;
  background: ${({ theme }: { theme: ITheme }) => theme.content};
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ArrowCircleVector = React.memo((props: any) => {
  return (
    <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M12.277 3.014a9.051 9.051 0 0 0-8.163 5.979.21.21 0 0 1-.227.134l-1.415-.21a.435.435 0 0 0-.41.176.427.427 0 0 0 0 .444l2.202 3.935a.426.426 0 0 0 .335.21.444.444 0 0 0 .352-.118l3.156-3.14a.419.419 0 0 0-.234-.711l-1.44-.218a.218.218 0 0 1-.15-.109.201.201 0 0 1 0-.184 6.916 6.916 0 1 1 6.588 9.704A1.047 1.047 0 0 0 12.947 21a9.003 9.003 0 0 0-.662-17.993l-.008.008Z"
        fill="#fff"
      />
    </svg>
  );
});

const ArrowCircle = (props: IProps & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  const { className = "" } = props;
  return (
    <Styled type="button" className={`icon ${className || ""}`} {...props}>
      <ArrowCircleVector />
    </Styled>
  );
};

export default ArrowCircle;
