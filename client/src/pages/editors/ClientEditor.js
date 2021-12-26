import React, { useState, useEffect } from "react";
import SuiBox from "components/sui-components/SuiBox";
import Modal from "@mui/material/Modal";
import PropTypes from "prop-types";
import BasicCard from "components/BasicCard";
import SuiTypography from "components/sui-components/SuiTypography";
import SuiInput from "components/sui-components/SuiInput";
import Grid from "@mui/material/Grid";
import SuiButton from "components/sui-components/SuiButton";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

import { useDispatch, useSelector } from "react-redux";
import { isEmpty } from "lodash";
import { setContactFromAPI } from "features/contacts";
import { setClientById } from "features/clients";

import { createNewClient, editClientById } from "../../api/ClientsAPI.js";
import { getContacts } from "../../api/ContactsAPI.js";
import { Box } from "@mui/system";
import {
  Autocomplete,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";

import {
  triggerSuccessNotification,
  triggerFailureNotification,
} from "notifications";

function ClientEditor(props) {
  const { clientToEdit, requestDirectoryRefresh, isCreateNew } = props;

  const dispatch = useDispatch();
  const contacts = useSelector((state) => state.contacts);

  const [open, setOpen] = useState(false);
  // const [users, setUsers] = useState([]);
  const [editedClient, setEditedClient] = useState({
    id: null,
    name: null,
    dateJoined: null,
    email: null,
    phoneNumber: null,
  });
  const [selectedPrimaryContact, setSelectedPrimaryContact] = useState(null);
  const [selectedSecondaryContact, setSelectedSecondaryContact] =
    useState(null);

  useEffect(() => {
    if (clientToEdit != undefined) {
      setEditedClient(
        Object.assign(
          {
            id: null,
            name: null,
            dateJoined: null,
            email: null,
            phoneNumber: null,
          },
          clientToEdit
        )
      );

      if (isEmpty(contacts)) {
        console.log("setting contacts");

        setContactFromAPI(dispatch, getContacts).then(() => {
          setSelectedPrimaryContact(contacts[clientToEdit.primaryContactId]);
          setSelectedSecondaryContact(
            contacts[clientToEdit.secondaryContactId]
          );
        });
      } else {
        setSelectedPrimaryContact(contacts[clientToEdit.primaryContactId]);
        setSelectedSecondaryContact(contacts[clientToEdit.secondaryContactId]);
      }

      setOpen(true);
    }
  }, [clientToEdit]);

  function handleChange(evt) {
    const value = evt.target.value;
    setEditedClient({
      ...editedClient,
      [evt.target.name]: value,
    });
  }

  function handleSelectedPrimaryContactChange(evt, newPrimaryContact) {
    setSelectedPrimaryContact(newPrimaryContact);
    setEditedClient({
      ...editedClient,
      primaryContactId: newPrimaryContact ? newPrimaryContact.id : null,
    });
  }

  function handleSelectedSecondaryContactChange(evt, newSecondaryContact) {
    setSelectedSecondaryContact(newSecondaryContact);
    setEditedClient({
      ...editedClient,
      secondaryContactId: newSecondaryContact ? newSecondaryContact.id : null,
    });
  }

  function handleSubmit(event) {
    if (isCreateNew) {
      createNewClient(editedClient)
        .then((res) => {
          if (!isEmpty(res.data)) {
            dispatch(
              setClientById({
                clientId: res.data.id,
                clientObject: res.data,
              })
            );

            // triggess success
            triggerSuccessNotification(
              "New Client Created Successful",
              "You have successfully created a new client"
            );

            requestDirectoryRefresh();
            handleClose();
          } else {
            triggerFailureNotification(
              "Unable to update client information",
              "Please fill out all the entries"
            );
          }
        })
        .catch(() => {
          triggerFailureNotification(
            "Unable to update client information",
            "Please fill out all the entries"
          );
        });
    } else {
      editClientById(editedClient.id, editedClient).then((res) => {
        if (res.success) {
          // success
          dispatch(
            setClientById({
              clientId: editedClient.id,
              clientObject: editedClient,
            })
          );

          // trigger success
          triggerSuccessNotification(
            "Updated Successful",
            "You have successfully updated client"
          );
        } else {
          // failure
          triggerFailureNotification(
            "Unable to update client information",
            "Failed to complete action"
          );
        }
        requestDirectoryRefresh();
        handleClose();
      });
    }
    event.preventDefault();
  }

  function handleClose() {
    setOpen(false);
  }

  return (
    <Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth="lg">
      {isCreateNew ? (
        <DialogTitle>Create Client</DialogTitle>
      ) : (
        <DialogTitle>Edit Client</DialogTitle>
      )}
      <DialogContent>
        <Grid container padding={2}>
          <Grid container item rowSpacing={1} columnSpacing={2}>
            <Grid item xs={4}>
              <SuiTypography
                component="label"
                variant="caption"
                fontWeight="bold"
              >
                Name
              </SuiTypography>
              <SuiInput
                type="text"
                name="name"
                value={editedClient.name}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={4}>
              <SuiTypography
                component="label"
                variant="caption"
                fontWeight="bold"
              >
                Date Joined
              </SuiTypography>
              <SuiInput
                type="date"
                name="dateJoined"
                value={editedClient.dateJoined}
                onChange={handleChange}
              />
            </Grid>
          </Grid>

          <Grid container item rowSpacing={1} columnSpacing={2}>
            <Grid item xs={8}>
              <SuiTypography
                component="label"
                variant="caption"
                fontWeight="bold"
              >
                Email
              </SuiTypography>
              <SuiInput
                type="text"
                name="email"
                value={editedClient.email}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={4}>
              <SuiTypography
                component="label"
                variant="caption"
                fontWeight="bold"
              >
                Phone Number
              </SuiTypography>
              <SuiInput
                type="text"
                name="phoneNumber"
                value={editedClient.phoneNumber}
                onChange={handleChange}
              />
            </Grid>
          </Grid>

          <Grid container item rowSpacing={1} columnSpacing={2}>
            <Grid item xs={6}>
              <SuiTypography
                component="label"
                variant="caption"
                fontWeight="bold"
              >
                Primary Contact
              </SuiTypography>
              <Autocomplete
                value={selectedPrimaryContact}
                onChange={handleSelectedPrimaryContactChange}
                options={contacts ? Object.values(contacts) : []}
                autoHighlight
                getOptionLabel={(option) =>
                  option.firstName +
                  " " +
                  option.lastName +
                  " (" +
                  option.phoneNumber +
                  ")"
                }
                renderOption={(props, option) => (
                  <Box
                    component="li"
                    sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                    {...props}
                  >
                    {option.firstName} {option.lastName} ({option.phoneNumber})
                  </Box>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    inputProps={{
                      ...params.inputProps,
                      autoComplete: "new-password", // disable autocomplete and autofill
                    }}
                  />
                )}
              />
            </Grid>
            <Grid item xs={6}>
              <SuiTypography
                component="label"
                variant="caption"
                fontWeight="bold"
              >
                Secondary Contact
              </SuiTypography>
              <Autocomplete
                value={selectedSecondaryContact}
                onChange={handleSelectedSecondaryContactChange}
                options={contacts ? Object.values(contacts) : []}
                autoHighlight
                getOptionLabel={(option) =>
                  option.firstName +
                  " " +
                  option.lastName +
                  " (" +
                  option.phoneNumber +
                  ")"
                }
                renderOption={(props, option) => (
                  <Box
                    component="li"
                    sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                    {...props}
                  >
                    {option.firstName} {option.lastName} ({option.phoneNumber})
                  </Box>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    inputProps={{
                      ...params.inputProps,
                      autoComplete: "new-password", // disable autocomplete and autofill
                    }}
                  />
                )}
              />
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <SuiButton onClick={handleClose} variant="gradient" color="primary">
          Cancel
        </SuiButton>
        <SuiButton onClick={handleSubmit} variant="gradient" color="primary">
          Submit
        </SuiButton>
      </DialogActions>
    </Dialog>
  );
}

ClientEditor.propTypes = {
  clientToEdit: PropTypes.object,
  isCreateNew: PropTypes.bool,
  requestDirectoryRefresh: PropTypes.func,
};

export default ClientEditor;
