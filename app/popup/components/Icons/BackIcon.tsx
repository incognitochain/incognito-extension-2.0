import * as React from "react";
import { SVGProps } from "react";

const BackIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg width={24} height={24} fill="none" {...props}>
    <path
      d="M6 12c0-.526.224-.978.597-1.278l8.362-7.37c.598-.526 1.419-.451 1.942.15.447.602.447 1.43-.15 1.88L9.434 11.85c-.074.075-.074.15 0 .225l7.317 6.467c.597.527.672 1.354.15 1.956-.523.601-1.344.676-1.942.15l-.074-.075-8.288-7.295C6.224 12.978 6 12.451 6 12Z"
      fill="#fff"
    />
  </svg>
);

export default BackIcon;
