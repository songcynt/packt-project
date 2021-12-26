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

/** 
  All of the routes for the Soft UI Dashboard React are added here,
  You can add a new route, customize the routes and delete the routes here.

  Once you add a new route on this file it will be visible automatically on
  the SideNav.

  For adding a new route you can follow the existing routes in the routes array.
  1. The `type` key with the `collapse` value is used for a route.
  2. The `type` key with the `title` value is used for a title inside the SideNav. 
  3. The `type` key with the `divider` value is used for a divider between SideNav items.
  4. The `name` key is used for the name of the route on the SideNav.
  5. The `key` key is used for the key of the route (It will help you with the key prop inside a loop).
  6. The `icon` key is used for the icon of the route on the SideNav, you have to add a node.
  7. The `collapse` key is used for making a collapsible item on the SideNav that has other routes
  inside (nested routes), you need to pass the nested routes inside an array as a value for the `collapse` key.
  8. The `route` key is used to store the route location which is used for the react router.
  9. The `href` key is used to store the external links location.
  10. The `title` key is only for the item with the type of `title` and its used for the title text on the SideNav.
  11. The `component` key is used to store the component of its route.
  12. The `noNavigation` key is to specify a route without having it be on the side navigation.
  13. THe `onlyAdmin` key is to specify a route only accessible to administrators
*/

import OverviewPage from "./pages/OverviewPage";
import ProfilePage from "./pages/ProfilePage";
import SettingsPage from "./pages/SettingsPage";
import CustomerDirectory from "./pages/directories/CustomerDirectory";
import CustomerPage from "pages/CustomerPage";
import RentalDirectory from "./pages/directories/RentalDirectory";

import SettingsIcon from "@mui/icons-material/Settings";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import PeopleIcon from "@mui/icons-material/People";
import ClientDirectory from "pages/directories/ClientDirectory";
import ClientLocationDirectory from "pages/directories/ClientLocationDirectory";
import ContactDirectory from "pages/directories/ContactDirectory";
import AutomatedMessageDirectory from "pages/directories/AutomatedMessageDirectory";
import UserDirectory from "pages/directories/UserDirectory";

const routes = [
  { type: "title", title: "Navigation Menu", key: "navigation-menu" },
  {
    type: "collapse",
    route: "/overview",
    name: "Overview",
    key: "overview",
    icon: <HomeIcon />,
    component: OverviewPage,
  },
  {
    type: "collapse",
    route: "/profile",
    name: "Profile",
    key: "profile",
    icon: <PersonIcon />,
    component: ProfilePage,
  },
  {
    type: "collapse",
    route: "/settings",
    name: "Settings",
    key: "settings",
    icon: <SettingsIcon />,
    onlyAdmin: true,
    component: SettingsPage,
  },
  // {
  //   type: "collapse",
  //   route: "/customers/:customerId",
  //   name: "Customer Profile",
  //   key: "customerPage",
  //   noNavigation: true,
  //   onlyAdmin: true,
  //   component: CustomerPage,
  // },
  // // {
  // //   type: "collapse",
  // //   route: "/customers",
  // //   name: "Customers",
  // //   key: "customers",
  // //   icon: <PeopleIcon />,
  // //   onlyAdmin: true,
  // //   component: CustomerDirectory,
  // // },
  {
    type: "collapse",
    route: "/rentals-directory",
    name: "Rentals",
    key: "rentals-directory",
    icon: <PeopleIcon />,
    onlyAdmin: true,
    component: RentalDirectory,
  },
  {
    type: "collapse",
    route: "/clients-directory",
    name: "Clients",
    key: "clients-directory",
    icon: <PeopleIcon />,
    onlyAdmin: true,
    component: ClientDirectory,
  },
  {
    type: "collapse",
    route: "/clientLocations",
    name: "Client Locations",
    key: "clientLocations",
    icon: <PeopleIcon />,
    onlyAdmin: true,
    component: ClientLocationDirectory,
  },
  {
    type: "collapse",
    route: "/contacts-directory",
    name: "Contacts",
    key: "contacts-directory",
    icon: <PeopleIcon />,
    onlyAdmin: true,
    component: ContactDirectory,
  },
  {
    type: "collapse",
    route: "/automatedMessages",
    name: "Automated Messages",
    key: "automatedMessages",
    icon: <PeopleIcon />,
    onlyAdmin: true,
    component: AutomatedMessageDirectory,
  },
  {
    type: "collapse",
    route: "/users-directory",
    name: "Users",
    key: "users-directory",
    icon: <PeopleIcon />,
    onlyAdmin: true,
    component: UserDirectory,
  },
  {
    type: "newTab",
    route: "https://www.packt.ca/contact",
    name: "Contact",
    key: "contactInfo",
  },
  {
    type: "newTab",
    route: "https://www.packt.ca/terms",
    name: "Terms of Service",
    key: "termsOfService",
  },
  {
    type: "newTab",
    route: "https://www.packt.ca/privacy-policy",
    name: "Privacy Policy",
    key: "privacyPolicy",
  },
  {
    type: "newTab",
    route: "https://www.packt.ca/general-8",
    name: "Health, Safety & Sustainability",
    key: "healthSafetyAndSustainability",
  },
];

export default routes;
