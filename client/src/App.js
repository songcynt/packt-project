/**
=========================================================
* Soft UI Dashboard React - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-pro-material-ui
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

// @mui material components
import { ThemeProvider, StyledEngineProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
// import Icon from "@mui/material/Icon";

import theme from "assets/theme";

// import { useSoftUIController } from "context";

import React, { useState, useEffect, useMemo } from "react";
import { Route, useLocation, Redirect, Switch } from "react-router-dom";
import routes from "routes";

import LoginPage from "./pages/authentication/LoginPage";
import SignupPage from "./pages/authentication/SignupPage";

// import components
import SideNav from "components/Sidenav";
import SuiBox from "components/sui-components/SuiBox";

import find from "lodash/find";
import isEmpty from "lodash/isEmpty";

import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { useSelector, useDispatch } from "react-redux";
import { triggerSuccessNotification } from "notifications";
import CircularProgress from "@mui/material/CircularProgress";

// global states
import { setUserFromAPI } from "features/users";
import { setRentalFromAPI } from "features/rentals";

// api calls
import { authenticateAccessToken } from "api/LoginAPI";
import { getRentals } from "api/RentalsAPI.js";



function App() {
  const loggedIn = useSelector((state) => state.user.loggedIn);
  const isAdmin = useSelector((state) => state.user.isAdmin);
  const [authHandled, setAuthHandled] = useState(false);
  const [filteredRoutes, setFilteredRoutes] = useState([]);
  const dispatch = useDispatch();

  const handleAuth = async () => {
    const successResponse = () =>
      triggerSuccessNotification(
        "Log In Successful",
        "You have successfully logged in"
      );
    setUserFromAPI(
      dispatch,
      authenticateAccessToken,
      () => null,
      () => null
    );
  };

  useEffect(() => {
    if (!authHandled){
      return;
    }

    setRentalFromAPI(dispatch, getRentals);

  }, [authHandled])

  useEffect(async () => {
    if (authHandled) return;
    await handleAuth();
    await setTimeout(() => setAuthHandled(true), 1000);
  });

  useEffect(() => {
    if (!isEmpty(filteredRoutes) && !loggedIn) setFilteredRoutes([]);
  });

  // const [controller, dispatch] = useSoftUIController();
  // const { layout, openConfigurator } = controller;
  const pathname = useLocation();

  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  useEffect(() => {
    if (!loggedIn || !isEmpty(filteredRoutes)) return;

    setFilteredRoutes(routes.filter((route) => !route.onlyAdmin || isAdmin));
  });

  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (route.collapse) {
        return getRoutes(route.collapse);
      }

      if (route.route) {
        return (
          <Route
            exact
            path={route.route}
            component={route.component}
            key={route.key}
          />
        );
      }

      return null;
    });

  return (
    <div className="App">
      <ReactNotification />
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {!authHandled || (loggedIn && isEmpty(filteredRoutes)) ? (
            <SuiBox
              display="flex"
              justifyContent="center"
              alignItems="center"
              minHeight="100vh"
            >
              <CircularProgress />
            </SuiBox>
          ) : (
            <Switch>
              {loggedIn ? (
                /* other pages like forgot passwords, signup etc to be added later */
                <>
                  <SideNav routes={filteredRoutes} />
                  {getRoutes(filteredRoutes)}
                  <Redirect
                    to={{
                      pathname: find(
                        filteredRoutes,
                        (obj) => obj.key == "overview"
                      ).route,
                    }}
                  />
                </>
              ) : (
                /* If user is not logged in */
                <>
                  <Route exact path="/login" component={LoginPage} />
                  <Route exact path="/signup" component={SignupPage} />
                  <Redirect
                    to={{
                      pathname: "/login",
                    }}
                  />
                </>
              )}
            </Switch>
          )}
        </ThemeProvider>
      </StyledEngineProvider>
    </div>
  );
}

export default App;
