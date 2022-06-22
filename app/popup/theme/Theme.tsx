import { darkTheme, lightTheme } from "@theme/index";
import { FONT_SIZES, FONTS } from "@theme/Theme.fonts";
import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import styled, {
  createGlobalStyle,
  css,
  ITheme,
  ThemeProvider as StyledComponentsThemeProvider,
} from "styled-components";

import { darkModeSelector } from "./Theme.selector";
import { Colors } from "./Theme.styled";

const MEDIA_WIDTHS = {
  upToExtraSmall: 500,
  upToSmall: 720,
  upToMedium: 1200,
  upToLarge: 1440,
  upToSupperLarge: 1920,
};

const mediaWidthTemplates: { [width in keyof typeof MEDIA_WIDTHS]: typeof css } = Object.keys(MEDIA_WIDTHS).reduce(
  (accumulator, size) => {
    (accumulator as any)[size] = (a: any, b: any, c: any) => css`
      @media (max-width: ${(MEDIA_WIDTHS as any)[size]}px) {
        ${css(a, b, c)}
      }
    `;
    return accumulator;
  },
  {},
) as any;

export const white = "#FFFFFF";
export const black = "#000000";

export function colors(darkMode: boolean): Colors {
  if (darkMode) return darkTheme();
  return lightTheme();
}

export function appTheme(darkMode: boolean): ITheme {
  return {
    ...colors(darkMode),

    grids: {
      sm: 8,
      md: 12,
      lg: 24,
    },

    // media queries
    mediaWidth: mediaWidthTemplates,

    // css snippets
    flexColumnNoWrap: css`
      display: flex;
      flex-flow: column nowrap;
    `,
    flexRowNoWrap: css`
      display: flex;
      flex-flow: row nowrap;
    `,
  };
}

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const darkMode = useSelector(darkModeSelector);
  const themeObject = useMemo(() => appTheme(darkMode), [darkMode]);
  return <StyledComponentsThemeProvider theme={themeObject}>{children}</StyledComponentsThemeProvider>;
};

export const ThemedGlobalStyle = createGlobalStyle`
      #root {
        background: ${({ theme }) => theme.body};
        color: ${({ theme }) => theme.primaryP7};
        scrollbar-color: transparent transparent; /*just hides the scrollbar for firefox */
        font-family: "Inter-Regular";
        font-style: normal;
        font-display: swap;
        box-sizing: border-box;
        font-weight: 400;
        overflow: hidden;
        position: relative;
        font-size: ${FONT_SIZES.regular}px;
        line-height: ${FONT_SIZES.regular + 3}px;
        margin: auto;
        display: flex;
        min-width: 375px;
        max-width: 375px;
        height: 600px;
        flex: 1;
        * {
             box-sizing: border-box;
             font-family: 'Inter-Regular';
        }
    }
    body {
      min-height: 100vh;
      box-sizing: border-box;
      background-color: #cccccc;
    }
    @font-face {
      font-family: Inter-Regular;
      src: url('../../../assets/fonts/Inter/Inter-Regular.ttf');
      font-style: normal;
      font-display: swap;
      font-weight: 400;
    }

    @font-face {
      font-family: Inter-Medium;
      src: url('../../../assets/fonts/Inter/Inter-Medium.ttf');
      font-style: normal;
      font-display: swap;
      font-weight: 500;
    }

    @font-face {
      font-family: Inter-Bold;
      src: url('../../../assets/fonts/Inter/Inter-Bold.ttf');
      font-style: normal;
      font-display: swap;
      font-weight: 700;
    }
      
    .fw-regular {
        font-weight: 400;
    }

    .fw-medium {
        font-weight: 500;
    }

    .fw-light {
        font-weight: 200;
    }

    .fw-suppermedium {
        font-weight: 600;
    }

    .fw-bold {
        font-weight: 700;
    }

    .fs-supersmall {
        font-size: ${FONTS.SIZE.superSmall}px;
        line-height: ${FONTS.SIZE.superSmall + 7}px;
    }

    .fs-small {
        font-size: ${FONTS.SIZE.small}px;
        line-height: ${FONTS.SIZE.small + 7}px;
    }

    .fs-regular {
        font-size: ${FONTS.SIZE.regular}px;
        line-height: ${FONTS.SIZE.regular + 7}px;
    }

    .fs-medium {
        font-size: ${FONTS.SIZE.medium}px;
        line-height: ${FONTS.SIZE.medium + 7}px;
    }

    .fs-supermedium {
        font-size: ${FONTS.SIZE.superMedium}px;
        line-height: ${FONTS.SIZE.superMedium + 7}px;
    }

    .fs-large {
        font-size: ${FONTS.SIZE.large}px;
        line-height: ${FONTS.SIZE.large + 7}px;
    }

    .fs-avglarge {
        font-size: ${FONTS.SIZE.avgLarge}px;
        line-height: ${FONTS.SIZE.avgLarge + 7}px;
    }

    .fs-verylarge {
        font-size: ${FONTS.SIZE.veryLarge}px;
        line-height: ${FONTS.SIZE.veryLarge + 7}px;
    }

    .fs-superlarge {
        font-size: ${FONTS.SIZE.superLarge}px;
        line-height: ${FONTS.SIZE.superLarge + 7}px;
    }

    ${({ theme }: { theme: ITheme }) => theme.mediaWidth.upToMedium`
        .fs-superlarge {
            font-size: ${FONTS.SIZE.veryLarge}px;
            line-height: ${FONTS.SIZE.veryLarge + 7}px;
        }
    `}
    
    .center {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .row {
        display: flex;
        flex-direction: row;
    }
    .disable-pointer {
        cursor: default;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }
    .text-align-left {
      text-align: left;
    }

    .text-align-right {
      text-align: right;
    }
    .text-align-left {
      text-align: left;
    }

    .text-align-center {
      text-align: center;
    }
    
    .default-padding-horizontal {
      padding-left: 24px;
      padding-right: 24px;
    }

    .default-margin-horizontal {
      margin-left: 24px;
      margin-right: 24px;
    }

    .scroll-view {
      position: relative;
      overflow-x: hidden;
      overflow-y: scroll;
      max-height: 536px;
      min-height: 536px;
      padding-bottom: 30px;
      display: block;
    }

    .noselect {
      -webkit-touch-callout: none;
      -webkit-user-select: none;
      -khtml-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
    }

    .full-width {
      width: 100%;
    }

    .full-height {
      height: 100%;
    }

    .full-screen {
      width: 100%;
      height: 100%;
      margin: 0;
    }

    .cursor {
      :hover {
        opacity: 0.8;
        cursor: pointer;
      }
    }

    .tooltip {
      position: relative;
      display: inline-block;
      border-bottom: 1px dotted black;
    }

    .tooltip .tooltiptext {
      visibility: hidden;
      width: 120px;
      background-color: black;
      color: #fff;
      text-align: center;
      border-radius: 6px;
      padding: 5px 0;

      /* Position the tooltip */
      position: absolute;
      z-index: 1;
      top: 100%;
      left: 50%;
      margin-left: -60px;
    }

    .tooltip:hover .tooltiptext {
      visibility: visible;
    }
    
    .hover {
      :hover {
        opacity: 0.8;
      }
    }

    .hover-with-cursor {
      :hover {
        outline: none !important;
        opacity: 0.8;
        cursor: pointer;
      }
    }

    .hook-row-space-between {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
    }
    
    .none-select {
      opacity: 0.4;
    }
    
    .selected {
      opacity: 1;
      box-shadow: 0px 0px 10px 0px  ${({ theme }: { theme: ITheme }) => theme.primaryP7};
    }

    .sub-text {
      color:${({ theme }: { theme: ITheme }) => theme.primaryP7};
    }
    
    .default-padding-top {
      padding-top: 24px !important;
    }
    
    .no-padding {
      padding: 0px 0px 0px 0px;
    }
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  .center {
    align-items: center;
    justify-content: center;
  }
`;
