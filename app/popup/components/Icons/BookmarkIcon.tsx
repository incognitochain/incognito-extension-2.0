import * as React from "react";
import { SVGProps } from "react";

const BookmarkIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg width={24} height={24} fill="none" {...props}>
    <path
      d="M4 3a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v17.196a1 1 0 0 1-1.53.848l-5.94-3.713a1 1 0 0 0-1.06 0l-5.94 3.713A1 1 0 0 1 4 20.196V3Z"
      fill="#000"
    />
  </svg>
);

export default BookmarkIcon;
