export const lightTheme = {
  body: "#E2E2E2",
  text: "#363537",
  toggleBorder: "#FFF",
  gradient: "linear-gradient(#39598A, #79D7ED)",
};

export const darkTheme = {
  body: "#363537",
  text: "#FAFAFA",
  toggleBorder: "#6B8096",
  gradient: "linear-gradient(#091236, #1E215D)",
};

export const theme = {
  primary50: "#39598A",
  primary100: "#255178",
  primary200: "#98CBF9",
  primary300: "#4DA8F7",
  primary400: "#496278",
  primary500: "#3D85C4",
  primary600: "#a0a0a0",
  primary700: "#fff",
  primary800: "rgb(77,77,77)",
  body: "#f8f8f8",
  text: "#FAFAFA",
  toggleBorder: "#6B8096",
  gradient: "linear-gradient(#091236, #1E215D)",
  backgroundGradient: "linear-gradient(to right, #243949 100%, #517fa4 0);",
  backgroundGradientTwo:
    "linear-gradient(to top, #1e3c72 0%, #1e3c72 0%, #2a5298 100%);",
  backgroundGradientThree: "linear-gradient(60deg, #29323c 0%, #485563 100%);",
  backgroundGradientFour: "linear-gradient(-20deg, #2b5876 100%, #4e4376 0%);",
};

export type LightTheme = typeof lightTheme;
export type DarkTheme = typeof darkTheme;
export type Theme = typeof theme;
