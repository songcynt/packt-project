/**
=========================================================
* Soft UI Dashboard React - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-material-ui
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useState, useEffect } from "react";

// react-router components
import { useLocation, Link } from "react-router-dom";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @mui material components
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Icon from "@mui/material/Icon";

import SearchIcon from "@mui/icons-material/Search";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SettingsIcon from "@mui/icons-material/Settings";
import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";

// Soft UI Dashboard React components
import SuiBox from "components/sui-components/SuiBox";
import SuiTypography from "components/sui-components/SuiTypography";
import SuiInput from "components/sui-components/SuiInput";

// Soft UI Dashboard React example components
import Breadcrumbs from "components/Breadcrumbs";
// import NotificationItem from "examples/NotificationItem";

// Custom styles for Navbar
import styles from "components/Navbar/styles";

// Soft UI Dashboard React context
import { useSoftUIController } from "context";

import { useDispatch } from "react-redux";
import { resetUser } from "features/users";
import { resetRentals } from "features/rentals";
import { resetContacts } from "features/contacts";
import { resetClients } from "features/clients";
import { resetClientLocations } from "features/clientLocations";
import { resetAutomatedMessages } from "features/automatedMessages";
import {
  triggerSuccessNotification,
  triggerFailureNotification,
} from "notifications";
import { logout } from "api/LoginAPI";

function Navbar({ absolute, light, isMini }) {
  const [navbarType, setNavbarType] = useState();
  const [controller, dispatch] = useSoftUIController();
  const { miniSidenav, transparentNavbar, fixedNavbar, openConfigurator } =
    controller;
  const dispatchRedux = useDispatch();
  const [openMenu, setOpenMenu] = useState(false);
  const classes = styles({ transparentNavbar, absolute, light, isMini });
  const route = useLocation().pathname.split("/").slice(1);

  useEffect(() => {
    // Setting the navbar type
    if (fixedNavbar) {
      setNavbarType("sticky");
    } else {
      setNavbarType("static");
    }

    // A function that sets the transparent state of the navbar.
    function handleTransparentNavbar() {
      dispatch({
        type: "TRANSPARENT_NAVBAR",
        value: (fixedNavbar && window.scrollY === 0) || !fixedNavbar,
      });
    }

    /** 
     The event listener that's calling the handleTransparentNavbar function when 
     scrolling the window.
    */
    window.addEventListener("scroll", handleTransparentNavbar);

    // Call the handleTransparentNavbar function to set the state with the initial value.
    handleTransparentNavbar();

    // Remove event listener on cleanup
    return () => window.removeEventListener("scroll", handleTransparentNavbar);
  }, [dispatch, fixedNavbar]);

  const handleMiniSidenav = () =>
    dispatch({ type: "MINI_SIDENAV", value: !miniSidenav });
  const handleConfiguratorOpen = () =>
    dispatch({ type: "OPEN_CONFIGURATOR", value: !openConfigurator });
  const handleOpenMenu = (event) => setOpenMenu(event.currentTarget);
  const handleCloseMenu = () => setOpenMenu(false);

  const handleLogout = async () => {
    await logout()
      .then(() => {
        triggerSuccessNotification(
          "Logout Successful",
          "You have successfully logged out"
        );

        dispatchRedux(resetUser());
        dispatchRedux(resetAutomatedMessages());
        dispatchRedux(resetClientLocations());
        dispatchRedux(resetClients());
        dispatchRedux(resetContacts());
        dispatchRedux(resetRentals());
      })
      .catch(() => {
        triggerFailureNotification(
          "Logout Not Successful",
          "There was a problem when logging you out"
        );
      });
  };

  const renderSettingsMenu = () => (
    <Menu
      anchorEl={openMenu}
      getContentAnchorEl={null}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      open={Boolean(openMenu)}
      onClose={handleCloseMenu}
      style={{ marginTop: "1rem" }}
    >
      <MenuItem onClick={handleLogout}>Log out</MenuItem>
    </Menu>
  );

  return (
    <AppBar
      position={absolute ? "absolute" : navbarType}
      color="inherit"
      className={classes.navbar}
    >
      <Toolbar className={classes.navbar_container}>
        <SuiBox
          customClass={classes.navbar_row}
          color="inherit"
          mb={{ xs: 1, md: 0 }}
        >
          <Breadcrumbs
            title={route[route.length - 1]}
            route={route}
            light={light}
          />
        </SuiBox>
        {isMini ? null : (
          <SuiBox customClass={classes.navbar_row}>
            {/* <SuiBox pr={1}>
              <SuiInput
                placeholder="Type here..."
                withIcon={{ icon: <SearchIcon />, direction: "left" }}
                customClass={classes.navbar_input}
              />
            </SuiBox> */}
            <SuiBox
              color={light ? "white" : "inherit"}
              customClass={classes.navbar_section_desktop}
            >
              <IconButton
                size="small"
                color="inherit"
                className={classes.navbar_mobile_menu}
                onClick={handleMiniSidenav}
              >
                {miniSidenav ? <MenuOpenIcon /> : <MenuIcon />}
              </IconButton>
              <IconButton
                color="inherit"
                className={classes.navbar_icon_button}
                onClick={handleOpenMenu}
              >
                <SettingsIcon />
              </IconButton>
              {renderSettingsMenu()}
              {/* <IconButton
                color="inherit"
                className={classes.navbar_icon_button}
                aria-controls="notification-menu"
                aria-haspopup="true"
                variant="contained"
                onClick={handleOpenMenu}
              >
                <NotificationsIcon />
              </IconButton> */}
            </SuiBox>
          </SuiBox>
        )}
      </Toolbar>
    </AppBar>
  );
}

// Setting default values for the props of Navbar
Navbar.defaultProps = {
  absolute: false,
  light: false,
  isMini: false,
};

// Typechecking props for the Navbar
Navbar.propTypes = {
  absolute: PropTypes.bool,
  light: PropTypes.bool,
  isMini: PropTypes.bool,
};

export default Navbar;
