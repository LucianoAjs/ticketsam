import "styled-components";
import { LightTheme, DarkTheme } from "shared/theme";

declare module "styled-components" {
  export interface DefaultTheme extends LightTheme {}
  export interface DefaultTheme extends DarkTheme {}
}

