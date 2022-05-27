import { black, white } from "@theme/Theme";
import { Colors } from "@theme/Theme.styled";

const lightTheme = (): Colors => {
  return {
    // base
    white,
    black,

    body: white,
    content: "#303030",

    primaryP1: "#F3F3F3",
    primaryP2: "#ECECEC",
    primaryP3: "#D8D8D8",
    primaryP4: "#C4C4C6",
    primaryP5: "#333335",
    primaryP6: "#000000",
    primaryP7: "#FFFFFF",
    primaryP8: "#9C9C9C",

    // specific color
    colorP1: "#FF9500",
    colorP2: "#34C759",
    colorP3: "#5995F0",
    colorP4: "#FF3B30",
    colorP5: "#64A121",
    colorP6: "#00407E",
  };
};

export default lightTheme;
