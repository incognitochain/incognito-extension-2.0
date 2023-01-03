import * as React from "react";
import { SVGProps, memo } from "react";

const BackupIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg width={24} height={24} fill="none" {...props}>
    <path
      d="M17.232 9.004c-2.592-1.498-6.165-1.318-9.872.562a.195.195 0 0 1-.218 0L4.895 7.318a1.139 1.139 0 0 0-1.206-.24A1.131 1.131 0 0 0 3 8.09v8.839a.749.749 0 0 0 .75.749h8.83a1.124 1.124 0 0 0 .794-1.918l-1.872-1.88a.172.172 0 0 1-.053-.157.195.195 0 0 1 .098-.142c2.135-1.086 4.39-1.266 5.992-.42 1.289.682 1.963 1.985 1.963 3.746a.749.749 0 1 0 1.498 0c-.023-3.678-1.34-6.495-3.768-7.903Z"
      fill="#1A73E8"
    />
  </svg>
);

export default BackupIcon;
