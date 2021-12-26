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
import { setUserFromAPI } from "features/users";
import { setUserInUsersById } from "features/users";

import { createNewUser, editUserById } from "../../api/UsersAPI.js";
import { getUsers } from "../../api/UsersAPI.js";
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

function UserEditor(props) {
  const { userToEdit, requestDirectoryRefresh, isCreateNew } = props;

  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  // const [users, setUsers] = useState([]);
  const [editedUser, setEditedUser] = useState({
    id: null,
    phoneNumber: null,
    firstName: null,
    lastName: null,
    email: null,
    address: null,
    dateJoined: null,
    isMember: null,
    isAdmin: null,
  });

  useEffect(() => {
    if (userToEdit != undefined) {
      setEditedUser(
        Object.assign(
          {
            id: null,
            phoneNumber: null,
            firstName: null,
            lastName: null,
            email: null,
            address: null,
            dateJoined: null,
            isMember: null,
            isAdmin: null,
          },
          userToEdit
        )
      );

      setOpen(true);
    }
  }, [userToEdit]);

  function handleChange(evt) {
    const value = evt.target.value;
    setEditedUser({
      ...editedUser,
      [evt.target.name]: value,
    });
  }

  function handleSubmit(event) {
    if (isCreateNew) {
      createNewUser(editedUser)
        .then((res) => {
          if (!isEmpty(res.data)) {
            dispatch(
              setUserInUsersById({
                userId: res.data.id,
                userObject: res.data,
              })
            );

            // triggess success
            triggerSuccessNotification(
              "New User Created Successful",
              "You have successfully created a new user"
            );

            requestDirectoryRefresh();
            handleClose();
          } else {
            triggerFailureNotification(
              "Unable to update user information",
              "Please fill out all the entries"
            );
          }
        })
        .catch(() => {
          triggerFailureNotification(
            "Unable to update user information",
            "Please fill out all the entries"
          );
        });
    } else {
      editUserById(editedUser.id, editedUser).then((res) => {
        if (res.success) {
          // success
          dispatch(
            setUserInUsersById({
              userId: editedUser.id,
              userObject: editedUser,
            })
          );

          // trigger success
          triggerSuccessNotification(
            "Updated Successful",
            "You have successfully updated user"
          );
        } else {
          // failure
          triggerFailureNotification(
            "Unable to update user information",
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
        <DialogTitle>Create User</DialogTitle>
      ) : (
        <DialogTitle>Edit User</DialogTitle>
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
                value={editedUser.firstName}
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
                value={editedUser.lastName}
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
                value={editedUser.phoneNumber}
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
                Email
              </SuiTypography>
              <SuiInput
                type="text"
                name="email"
                value={editedUser.email}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={3}>
              <SuiTypography
                component="label"
                variant="caption"
                fontWeight="bold"
              >
                Member
              </SuiTypography>
              <Select
                name="isMember"
                value={editedUser.isMember}
                onChange={handleChange}
              >
                <MenuItem value={null}>None</MenuItem>
                <MenuItem value="true">True</MenuItem>
                <MenuItem value="false">False</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={3}>
              <SuiTypography
                component="label"
                variant="caption"
                fontWeight="bold"
              >
                Admin
              </SuiTypography>
              <Select
                name="isAdmin"
                value={editedUser.isAdmin}
                onChange={handleChange}
              >
                <MenuItem value={null}>None</MenuItem>
                <MenuItem value="true">True</MenuItem>
                <MenuItem value="false">False</MenuItem>
              </Select>
            </Grid>
          </Grid>

          <Grid container item rowSpacing={1} columnSpacing={2}>
            <Grid item xs={8}>
              <SuiTypography
                component="label"
                variant="caption"
                fontWeight="bold"
              >
                Address
              </SuiTypography>
              <SuiInput
                type="text"
                name="address"
                value={editedUser.address}
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
                value={editedUser.dateJoined}
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

UserEditor.propTypes = {
  userToEdit: PropTypes.object,
  isCreateNew: PropTypes.bool,
  requestDirectoryRefresh: PropTypes.func,
};

export default UserEditor;
