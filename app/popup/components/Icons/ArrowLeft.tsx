import React from "react";
import styled from "styled-components";

interface IProps {}

const Styled = styled.button`
  width: 9px;
  height: 100%;
`;

const ArrowLeftVector = React.memo((props: any) => {
  return (
    <svg width={12} height={18} viewBox="0 0 12 18" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M0 9C0 8.4736 0.223983 8.0224 0.597287 7.7216L8.9593 0.35202C9.55659 -0.174379 10.3779 -0.0991791 10.9005 0.50242C11.3484 1.10402 11.3484 1.93122 10.7512 2.38242L3.4344 8.8496C3.35974 8.9248 3.35974 9 3.4344 9.0752L10.7512 15.5424C11.3484 16.0688 11.4231 16.896 10.9005 17.4976C10.3779 18.0992 9.55659 18.1744 8.9593 17.648C8.9593 17.648 8.9593 17.648 8.88464 17.5728L0.597287 10.2784C0.223983 9.9776 0 9.4512 0 9Z"
        fill="white"
      />
    </svg>
  );
});

const ArrowLeft = (props: IProps & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <Styled {...props}>
      <ArrowLeftVector />
    </Styled>
  );
};

export default ArrowLeft;
