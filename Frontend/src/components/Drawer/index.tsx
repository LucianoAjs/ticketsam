import CloseIcon from "@mui/icons-material/Close";
import { Divider } from "@mui/material";
import React from "react";
import { AlignColumn } from "styles/app-styles";
import { theme } from "styles/theme";
import { AlignCloseBotton, CustomDrawerStyles } from "./styles";
export const Drawer = ({
  open,
  setOpen,
  children,
  title = "Detalhes",
  anchor = "right",
}: {
  open: boolean;
  setOpen: Function;
  children: JSX.Element | JSX.Element[] | string | number;
  title?: string;
  anchor?: "right" | "left" | "top" | "bottom";
}) => {
  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
      } else {
        setOpen(open);
      }
    };

  return (
    <CustomDrawerStyles
      hideBackdrop={true}
      anchor={anchor}
      open={open}
      onClose={toggleDrawer(false)}
      onOpen={toggleDrawer(true)}
      PaperProps={{
        sx: {
          backgroundColor: `${theme.primary100}`,
        },
      }}
    >
      <AlignColumn>
        <AlignCloseBotton>
          <h5>{title}</h5>
          <CloseIcon onClick={() => setOpen(false)} />
        </AlignCloseBotton>
        <Divider />
        {children}
      </AlignColumn>
    </CustomDrawerStyles>
  );
};
