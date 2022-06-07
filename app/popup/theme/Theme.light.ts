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
    primaryP9: "#404040",
    primaryP10: "#484848",

    // specific color
    colorP1: "#FF9500",
    colorP2: "#34C759",
    colorP3: "#1A73E8",
    colorP4: "#F6465D",
    colorP5: "#64A121",
    colorP6: "#00407E",
    colorP7: "#C0C0C0",
    colorP8: "#FFC043",
    colorP9: "#757575",
    colorP10: "#1a73e8",
    colorP11: "#9c9c9c",
  };
};

export default lightTheme;
