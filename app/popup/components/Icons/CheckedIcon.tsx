import * as React from "react";
import { SVGProps } from "react";

const CheckedIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg width={16} height={16} fill="none" {...props}>
    <rect x={0.5} y={0.5} width={15} height={15} rx={3.5} stroke="#757575" />
    <rect width={16} height={16} rx={4} fill="#1A73E8" />
    <path
      d="M12.646 5.25 11.48 4.083a.208.208 0 0 0-.291 0L6.27 9a.208.208 0 0 1-.292 0L4.813 7.833a.208.208 0 0 0-.292 0L3.354 9a.208.208 0 0 0 0 .292l2.625 2.625a.208.208 0 0 0 .292 0l6.375-6.375a.208.208 0 0 0 0-.292Z"
      fill="#fff"
    />
  </svg>
);

export default CheckedIcon;
