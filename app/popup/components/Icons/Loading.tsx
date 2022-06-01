import React from "react";
import styled, { ITheme } from "styled-components";

export interface ILoadingIconProps {
  width?: string;
  height?: string;
  center?: boolean;
}

const Styled: any = styled.div`
  position: relative;
  width: ${(props: ILoadingIconProps) => props.width};
  height: ${(props: ILoadingIconProps) => props.height};
  &.loading-center {
    margin: auto;
  }
  .spinner-border {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }
  .spinner {
    width: ${(props: ILoadingIconProps) => props.width};
    height: ${(props: ILoadingIconProps) => props.height};
    display: inline-block;
  }
  div.spinner div {
    width: 9%;
    height: 28%;
    background: ${({ theme }: { theme: ITheme }) => theme.primaryP7};
    position: absolute;
    left: 49%;
    top: 43%;
    opacity: 0;
    border-radius: 50px;
    animation: fade 1s linear infinite;
  }
  @keyframes fade {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
  div.spinner div.bar1 {
    transform: rotate(0deg) translate(0, -130%);
    animation-delay: 0s;
  }
  div.spinner div.bar2 {
    transform: rotate(30deg) translate(0, -130%);
    animation-delay: -0.9167s;
  }
  div.spinner div.bar3 {
    transform: rotate(60deg) translate(0, -130%);
    animation-delay: -0.833s;
  }
  div.spinner div.bar4 {
    transform: rotate(90deg) translate(0, -130%);
    animation-delay: -0.7497s;
  }
  div.spinner div.bar5 {
    transform: rotate(120deg) translate(0, -130%);
    animation-delay: -0.667s;
  }
  div.spinner div.bar6 {
    transform: rotate(150deg) translate(0, -130%);
    animation-delay: -0.5837s;
  }
  div.spinner div.bar7 {
    transform: rotate(180deg) translate(0, -130%);
    animation-delay: -0.5s;
  }
  div.spinner div.bar8 {
    transform: rotate(210deg) translate(0, -130%);
    animation-delay: -0.4167s;
  }
  div.spinner div.bar9 {
    transform: rotate(240deg) translate(0, -130%);
    animation-delay: -0.333s;
  }
  div.spinner div.bar10 {
    transform: rotate(270deg) translate(0, -130%);
    animation-delay: -0.2497s;
  }
  div.spinner div.bar11 {
    transform: rotate(300deg) translate(0, -130%);
    animation-delay: -0.167s;
  }
  div.spinner div.bar12 {
    transform: rotate(330deg) translate(0, -130%);
    animation-delay: -0.0833s;
  }
`;

const LoadingVector = React.memo(() => {
  return (
    <div className="spinner">
      {[...Array(12)].map((e, i) => {
        return <div key={i.toString()} className={`bar${i + 1}`} />;
      })}
    </div>
  );
});

const Loading = (props: ILoadingIconProps) => {
  const { width = "20px", height = "20px", center } = props;
  return (
    <Styled width={width} height={height} className={`loading-icon ${center ? "loading-center" : ""}`}>
      <LoadingVector />
    </Styled>
  );
};

export default Loading;
