import * as React from "react";
import { SVGProps } from "react";

const RightArrowIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg width={24} height={24} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      d="M15 12.195a.93.93 0 0 1-.31.688l-4.432 3.9a.735.735 0 1 1-.97-1.102l3.876-3.41a.099.099 0 0 0 .034-.076.098.098 0 0 0-.034-.076L9.288 8.71a.735.735 0 1 1 .97-1.101l4.432 3.9a.93.93 0 0 1 .31.687Z"
      fill="#757575"
    />
  </svg>
);

export default RightArrowIcon;
