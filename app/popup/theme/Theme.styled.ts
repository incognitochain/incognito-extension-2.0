import { FlattenSimpleInterpolation, ThemedCssFunction } from "styled-components";

export type Color = string;
export interface Colors {
  // base
  white: Color;
  black: Color;

  body: Color;
  content: Color;

  primaryP1: Color;
  primaryP2: Color;
  primaryP3: Color;
  primaryP4: Color;
  primaryP5: Color;
  primaryP6: Color;
  primaryP7: Color;
  primaryP8: Color;
  primaryP9: Color;
  primaryP10: Color;

  // specific color
  colorP1: Color;
  colorP2: Color;
  colorP3: Color;
  colorP4: Color;
  colorP5: Color;
  colorP6: Color;
  colorP7: Color;
}

export interface Grids {
  sm: number;
  md: number;
  lg: number;
}

declare module "styled-components" {
  export interface ITheme extends Colors {
    grids: Grids;

    // media queries
    mediaWidth: {
      upToExtraSmall: ThemedCssFunction<ITheme>;
      upToSmall: ThemedCssFunction<ITheme>;
      upToMedium: ThemedCssFunction<ITheme>;
      upToLarge: ThemedCssFunction<ITheme>;
      upToSupperLarge: ThemedCssFunction<ITheme>;
    };

    // css snippets
    flexColumnNoWrap: FlattenSimpleInterpolation;
    flexRowNoWrap: FlattenSimpleInterpolation;
  }
}
