import * as React from "react";
import { SVGProps } from "react";

const CircleIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg width={73} height={73} fill="none" {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M36.432 66.357c16.658 0 30.162-13.504 30.162-30.163 0-16.658-13.504-30.162-30.162-30.162S6.27 19.537 6.27 36.194c0 16.659 13.504 30.163 30.162 30.163Zm0 6.032c19.99 0 36.195-16.205 36.195-36.194C72.627 16.204 56.422 0 36.432 0 16.442 0 .238 16.205.238 36.194c0 19.99 16.205 36.195 36.194 36.195Z"
      fill="#fff"
    />
  </svg>
);

export default CircleIcon;
