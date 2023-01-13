import * as React from "react";
import { SVGProps } from "react";

const UnCheckIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg width={16} height={16} fill="none" {...props}>
    <rect x={0.5} y={0.5} width={15} height={15} rx={3.5} stroke="#757575" />
  </svg>
);

export default UnCheckIcon;
