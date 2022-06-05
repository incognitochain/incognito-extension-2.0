import * as React from "react";
import { SVGProps } from "react";

const NetworkIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg width={24} height={24} fill="none" {...props}>
    <path
      d="M16.925 10.908a1.013 1.013 0 0 0-.345-.439.884.884 0 0 0-.506-.166h-1.483a.275.275 0 0 1-.203-.093.331.331 0 0 1-.084-.223v-5.36a.674.674 0 0 0-.104-.362.584.584 0 0 0-.275-.23.548.548 0 0 0-.349-.013.593.593 0 0 0-.295.202l-6.058 8.16c-.115.15-.19.332-.214.526-.025.195.002.392.076.57.075.18.194.332.345.44.15.107.326.165.506.166h1.483c.076 0 .149.033.203.093.054.059.084.139.084.223v5.36c0 .129.036.255.104.361a.585.585 0 0 0 .275.231.54.54 0 0 0 .196 0 .567.567 0 0 0 .246-.061.617.617 0 0 0 .202-.166l6.058-8.16c.109-.146.18-.321.204-.508a1.127 1.127 0 0 0-.066-.55Z"
      fill="#fff"
    />
  </svg>
);

export default NetworkIcon;
