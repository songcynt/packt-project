import { combineReducers } from "@reduxjs/toolkit";
import user from "./users";
import rentals from "./rentals";
import clients from "./clients";
import clientLocations from "./clientLocations";
import contacts from "./contacts";
import automatedMessages from "./automatedMessages";

const rootReducer = combineReducers({ user, rentals, clients, clientLocations, contacts, automatedMessages });

export default rootReducer;
