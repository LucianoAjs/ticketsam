import { Menu, MenuItem } from "@mui/material";
import { Drawer } from "components/Drawer";
import { useState } from "react";
import { ITicket } from "shared/interfaces/ticket.interface";
import { TicketDetails } from "../TicketDetails";

export const TicketMenuIActions = ({
  open,
  setOpen,
  anchorEl,

  ticket,
}: {
  open: boolean;
  setOpen: Function;
  anchorEl: null | HTMLElement;

  ticket?: ITicket;
}) => {
  const [openDrawer, setOpenDrawer] = useState(false);

  return (
    <>
      <Drawer
        title="Detalhes do bilhete"
        open={openDrawer}
        setOpen={setOpenDrawer}
        children={<TicketDetails ticket={ticket} />}
      />
      <Menu
        id="fade-menu"
        MenuListProps={{
          "aria-labelledby": "fade-button",
        }}
        anchorEl={anchorEl}
        open={open}
      >
        <MenuItem
          onClick={() => {
            setOpenDrawer(true);
            setOpen(false);
          }}
        >
          Detalhes
        </MenuItem>
      </Menu>
    </>
  );
};
