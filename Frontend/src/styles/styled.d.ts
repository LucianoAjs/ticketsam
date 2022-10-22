import "styled-components";
import { LightTheme, DarkTheme, Theme } from "styles/theme";

declare module "styled-components" {
  export interface DefaultTheme extends LightTheme {}
  export interface DefaultTheme extends DarkTheme {}
  export interface DefaultTheme extends Theme {}
}

