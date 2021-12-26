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
import { setContactById } from "features/contacts";

import { createNewContact, editContactById } from "../../api/ContactsAPI.js";
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

function ContactEditor(props) {
  const { contactToEdit, requestDirectoryRefresh, isCreateNew } = props;

  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  // const [users, setUsers] = useState([]);
  const [editedContact, setEditedContact] = useState({
    id: null,
    firstName: null,
    lastName: null,
    email: null,
    phoneNumber: null,
  });

  useEffect(() => {
    if (contactToEdit != undefined) {
      setEditedContact(
        Object.assign(
          {
            id: null,
            firstName: null,
            lastName: null,
            email: null,
            phoneNumber: null,
          },
          contactToEdit
        )
      );

      setOpen(true);
    }
  }, [contactToEdit]);

  function handleChange(evt) {
    const value = evt.target.value;
    setEditedContact({
      ...editedContact,
      [evt.target.name]: value,
    });
  }

  function handleSubmit(event) {
    if (isCreateNew) {
      createNewContact(editedContact)
        .then((res) => {
          if (!isEmpty(res.data)) {
            dispatch(
              setContactById({
                contactId: res.data.id,
                contactObject: res.data,
              })
            );

            // triggess success
            triggerSuccessNotification(
              "New Contact Created Successful",
              "You have successfully created a new contact"
            );

            requestDirectoryRefresh();
            handleClose();
          } else {
            triggerFailureNotification(
              "Unable to update contact information",
              "Please fill out all the entries"
            );
          }
        })
        .catch(() => {
          triggerFailureNotification(
            "Unable to update contact information",
            "Please fill out all the entries"
          );
        });
    } else {
      editContactById(editedContact.id, editedContact).then((res) => {
        if (res.success) {
          // success
          dispatch(
            setContactById({
              contactId: editedContact.id,
              contactObject: editedContact,
            })
          );

          // trigger success
          triggerSuccessNotification(
            "Updated Successful",
            "You have successfully updated contact"
          );
        } else {
          // failure
          triggerFailureNotification(
            "Unable to update contact information",
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
        <DialogTitle>Create Contact</DialogTitle>
      ) : (
        <DialogTitle>Edit Contact</DialogTitle>
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
                First Name
              </SuiTypography>
              <SuiInput
                type="text"
                name="firstName"
                value={editedContact.firstName}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={4}>
              <SuiTypography
                component="label"
                variant="caption"
                fontWeight="bold"
              >
                Last Name
              </SuiTypography>
              <SuiInput
                type="text"
                name="lastName"
                value={editedContact.lastName}
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
                value={editedContact.email}
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
                value={editedContact.phoneNumber}
                onChange={handleChange}
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

ContactEditor.propTypes = {
  contactToEdit: PropTypes.object,
  isCreateNew: PropTypes.bool,
  requestDirectoryRefresh: PropTypes.func,
};

export default ContactEditor;
