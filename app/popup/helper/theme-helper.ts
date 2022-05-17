// import { unstable_createMuiStrictModeTheme } from "@mui/material";
// import { Palette, PaletteOptions } from "@mui/material/styles/createPalette";

import { createTheme, Palette, PaletteOptions, unstable_createMuiStrictModeTheme } from "@mui/material";
import { TypographyOptions } from "@mui/material/styles/createTypography";

// import { TypographyOptions } from "@mui/material/styles/createTypography";
const paletteBuilder = (prefersDarkMode: boolean): PaletteOptions | undefined => {
  // console.log(prefersDarkMode);
  return (
    {
      mode: prefersDarkMode ? "dark" : "light",
      primary: primaryColorHandler(prefersDarkMode),
      secondary: secondaryColorHandler(),
      success: successColorHandler(),
      info: infoColorHandler(),
      error: errorColorHandler(),
    } || undefined
  );
};

const typographyBuilder = (palette: Palette): TypographyOptions => {
  // console.log("palette ", palette);
  return {
    fontFamily: "Inter",
    fontSize: 13,
  };
};

const primaryColorHandler = (prefersDarkMode: boolean) => {
  return {
    main: prefersDarkMode ? "#000000" : "#ffffff",
    contrastText: prefersDarkMode ? "#ffffff" : "#000000",
  };
};

const secondaryColorHandler = () => {
  return {
    main: "#1A73E8",
    contrastText: "#ffffff",
    light: "#1A73E8",
    dark: "#1A73E8",
  };
};

const successColorHandler = () => {
  return {
    main: "#ffffff",
    contrastText: "#1A73E8",
  };
};

const infoColorHandler = () => {
  return {
    main: "#ffffff",
    contrastText: "#ffffff",
    light: "#ffffff",
    dark: "#ffffff",
  };
};

const errorColorHandler = () => {
  return {
    main: "#1A73E8",
    contrastText: "#ffffff",
  };
};

/**
 * Switch mode color through apps
 * @param {boolean} prefersDarkMode - true if mode is dark value, otherwise
 */

const themeHelper = (prefersDarkMode: boolean) =>
  createTheme({
    palette: paletteBuilder(prefersDarkMode),
    typography: typographyBuilder,
    spacing: 6,
  });

export default themeHelper;
