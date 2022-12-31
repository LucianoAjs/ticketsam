import ConfirmationNumberRoundedIcon from "@mui/icons-material/ConfirmationNumberRounded";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { default as DirectionsBoatIcon } from "@mui/icons-material/DirectionsBoat";
import Logout from "@mui/icons-material/Logout";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";
import useUserContext from "contexts/UserContext/userContext";
import useAuth from "hooks/useAuth";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import {
  ADMIN,
  BOAT_MANAGER,
  DASHBOARD,
  PROFILE_MANAGER,
  TICKET_MANAGER,
} from "shared/constants/routes";
import { stringAvatar } from "shared/utils/common/string-avatar";

export default function AccountMenu() {
  const { logout } = useAuth();
  const {
    user: { firstName, lastName },
  } = useUserContext();

  const hiddenAvatar = !firstName;

  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <React.Fragment>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            {hiddenAvatar ? (
              <Avatar />
            ) : (
              <Avatar {...stringAvatar(`${firstName} ${lastName}`)} />
            )}
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={() => navigate(`/${ADMIN}/${PROFILE_MANAGER}`)}>
          <Avatar {...stringAvatar(`${firstName} ${lastName}`)} /> Perfil
        </MenuItem>
        <Divider />
        <MenuItem onClick={() => navigate(`/${ADMIN}/${DASHBOARD}`)}>
          <ListItemIcon>
            <DashboardIcon fontSize="small" />
          </ListItemIcon>
          Dashboard
        </MenuItem>
        <MenuItem onClick={() => navigate(`/${ADMIN}/${BOAT_MANAGER}`)}>
          <ListItemIcon>
            <DirectionsBoatIcon fontSize="small" />
          </ListItemIcon>
          Gerenciamento de barcos
        </MenuItem>
        <MenuItem onClick={() => navigate(`/${ADMIN}/${TICKET_MANAGER}`)}>
          <ListItemIcon>
            <ConfirmationNumberRoundedIcon fontSize="small" />
          </ListItemIcon>
          Gerenciamento de bilhetes
        </MenuItem>
        <MenuItem onClick={logout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Sair
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
