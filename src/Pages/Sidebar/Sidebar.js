import React, { useState } from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import defaultImg from "../../assest/image/profile.png";
import { AccountCircle, Dashboard, PostAdd } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import Logout from "../../assest/image/power.svg";
import { Modal } from "reactstrap";
import ConformationModalUser from "../../common/ConformationModalUser";
import authActions from "../../redux/auth/actions";
import { compose } from "redux";
import { connect } from "react-redux";

const settings = [
  { path: "/profile", display: "Profile" },
  { path: "/change-password", display: "Change Password" },
  { path: "/", display: "Logout" },
];

const drawerWidth = 180;
const { logout } = authActions;

function Sidebar(props) {
  const navigate = useNavigate();
  const { window, user, token, logout } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isOpen, toggleOpen] = useState(false);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {["Home", "Add Post", "Profile"].map((text, index) => (
          <ListItem
            key={text}
            disablePadding
            onClick={() => {
              if (text === "Home") {
                navigate("/home");
              } else if (text === "Add Post") {
                navigate("/postAdd");
              } else if (text === "Profile") {
                navigate("/profile");
              }
            }}
          >
            <ListItemButton>
              <ListItemIcon>
                {text === "Home" ? (
                  <Dashboard />
                ) : text === "Add Post" ? (
                  <PostAdd />
                ) : text === "Profile" ? (
                  <AccountCircle />
                ) : (
                  <></>
                )}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  // Remove this const when copying and pasting into your project.
  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ mr: 2 }}>
            Socila Media App
          </Typography>

          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              justifyContent: "end",
              alignItems: "center",
            }}
          >
            <Tooltip title="Open settings">
              <IconButton
                onClick={handleOpenUserMenu}
                sx={{
                  p: 0,
                }}
              >
                <Typography
                  style={{ color: "white" }}
                  variant="h6"
                  noWrap
                  component="div"
                  sx={{ mr: 2 }}
                >
                  {user?.username ? user?.username : ""}
                </Typography>
                <Avatar
                  alt="Remy Sharp"
                  src={
                    user?.logo
                      ? `${process.env.REACT_APP_BACKEND_URI_UPLOAD}/${user?.logo}`
                      : defaultImg
                  }
                />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem
                  key={setting.display}
                  onClick={() => {
                    if (setting.display === "Profile") {
                      navigate("/profile");
                    } else if (setting.display === "Change Password") {
                      navigate("/change-password");
                    } else if (setting.display === "Logout") {
                      console.log("isOpen--side", isOpen);
                      toggleOpen(true);
                    }
                    handleCloseUserMenu();
                  }}
                >
                  <Typography textAlign="center">{setting.display}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Modal centered isOpen={isOpen} backdrop={true}>
        {isOpen && (
          <ConformationModalUser
            isOpen={isOpen}
            onClose={() => toggleOpen(false)}
            confirmText={"Logout"}
            message={"Are you sure you want to Logout"}
            handleConfirm={async () => {
              await logout(token);
              navigate("/");
            }}
            customIcon={Logout}
            titleTxt={"Are you sure you want to logout ?"}
          />
        )}
      </Modal>
    </Box>
  );
}

Sidebar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * Remove this when copying and pasting into your project.
   */
  window: PropTypes.func,
};

export default compose(connect(null, { logout }))(Sidebar);
