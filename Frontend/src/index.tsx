import { UserProvider } from "contexts/UserContext/userContext";
import React from "react";
import ReactDOM from "react-dom/client";
import MainRoutes from "routes";
import { ThemeProvider } from "styled-components";
import GlobalStyles from "styles/global-styles";
import { theme } from "styles/theme";

const root = ReactDOM.createRoot(document.getElementById("root")!);

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <UserProvider>
        <MainRoutes />
      </UserProvider>
    </ThemeProvider>
  </React.StrictMode>
);
