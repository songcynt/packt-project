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
import { setUsersFromAPI } from "features/users";
import { setRentalById } from "features/rentals";

import { createNewRental, editRentalById } from "../../api/RentalsAPI.js";
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

function RentalEditor(props) {
  const { rentalToEdit, requestDirectoryRefresh, isCreateNew } = props;

  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.users);

  const [open, setOpen] = useState(false);
  // const [users, setUsers] = useState([]);
  const [editedRental, setEditedRental] = useState({
    id: null,
    orderDate: null,
    startDate: null,
    returnedDate: null,
    expiryDate: null,
    extensionExpiryDate: null,
    deliveryMethod: null,
    returnMethod: null,
    status: null,
    userId: null,
  });
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    if (rentalToEdit != undefined) {
      setEditedRental(
        Object.assign(
          {
            id: null,
            orderDate: null,
            startDate: null,
            returnedDate: null,
            expiryDate: null,
            extensionExpiryDate: null,
            deliveryMethod: null,
            returnMethod: null,
            status: null,
            userId: null,
          },
          rentalToEdit
        )
      );

      if (isEmpty(users)) {
        console.log("setting users");

        setUsersFromAPI(dispatch, getUsers).then(() => {
          setSelectedUser(users[rentalToEdit.userId]);
        });
      } else {
        setSelectedUser(users[rentalToEdit.userId]);
      }

      setOpen(true);
    }
  }, [rentalToEdit]);

  function handleChange(evt) {
    const value = evt.target.value;
    setEditedRental({
      ...editedRental,
      [evt.target.name]: value,
    });
  }

  function handleSelectedUserChange(evt, newUser) {
    setSelectedUser(newUser);
    setEditedRental({
      ...editedRental,
      userId: newUser ? newUser.id : null,
    });
  }

  function handleSubmit(event) {
    if (isCreateNew) {
      createNewRental(editedRental)
        .then((res) => {
          if (!isEmpty(res.data)) {
            dispatch(
              setRentalById({
                rentalId: res.data.id,
                rentalObject: res.data,
              })
            );

            // triggess success
            triggerSuccessNotification(
              "New Rental Created Successful",
              "You have successfully created a new rental"
            );

            requestDirectoryRefresh();
            handleClose();
          } else {
            triggerFailureNotification(
              "Unable to update rental information",
              "Please fill out all the entries"
            );
          }
        })
        .catch(() => {
          triggerFailureNotification(
            "Unable to update rental information",
            "Please fill out all the entries"
          );
        });
    } else {
      editRentalById(editedRental.id, editedRental).then((res) => {
        if (res.success) {
          // success
          dispatch(
            setRentalById({
              rentalId: editedRental.id,
              rentalObject: editedRental,
            })
          );

          // trigger success
          triggerSuccessNotification(
            "Updated Successful",
            "You have successfully updated rental"
          );
        } else {
          // failure
          triggerFailureNotification(
            "Unable to update rental information",
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
        <DialogTitle>Create Rental</DialogTitle>
      ) : (
        <DialogTitle>Edit Rental</DialogTitle>
      )}
      <DialogContent>
        <Grid container padding={2}>
          <Grid container item rowSpacing={1} columnSpacing={2}>
            <Grid item xs={6}>
              <SuiTypography
                component="label"
                variant="caption"
                fontWeight="bold"
              >
                Renter
              </SuiTypography>
              <Autocomplete
                value={selectedUser}
                onChange={handleSelectedUserChange}
                options={users ? Object.values(users) : []}
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

          <Grid container item rowSpacing={1} columnSpacing={2}>
            <Grid item xs={4}>
              <SuiTypography
                component="label"
                variant="caption"
                fontWeight="bold"
              >
                Order Date
              </SuiTypography>
              <SuiInput
                type="date"
                name="orderDate"
                value={editedRental.orderDate}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={4}>
              <SuiTypography
                component="label"
                variant="caption"
                fontWeight="bold"
              >
                Start Date
              </SuiTypography>
              <SuiInput
                type="date"
                name="startDate"
                value={editedRental.startDate}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={4}>
              <SuiTypography
                component="label"
                variant="caption"
                fontWeight="bold"
              >
                Return Date
              </SuiTypography>
              <SuiInput
                type="date"
                name="returnedDate"
                value={editedRental.returnedDate}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={4}>
              <SuiTypography
                component="label"
                variant="caption"
                fontWeight="bold"
              >
                Expiry Date
              </SuiTypography>
              <SuiInput
                type="date"
                name="expiryDate"
                value={editedRental.expiryDate}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={4}>
              <SuiTypography
                component="label"
                variant="caption"
                fontWeight="bold"
              >
                Extension Expiry Date
              </SuiTypography>
              <SuiInput
                type="date"
                name="extensionExpiryDate"
                value={editedRental.extensionExpiryDate}
                onChange={handleChange}
              />
            </Grid>
          </Grid>

          <Grid container item rowSpacing={1} columnSpacing={2}>
            <Grid item xs={4}>
              <SuiTypography
                component="label"
                variant="caption"
                fontWeight="bold"
              >
                Delivery Method
              </SuiTypography>
              <Select
                name="deliveryMethod"
                value={editedRental.deliveryMethod}
                onChange={handleChange}
              >
                <MenuItem value={null}>None</MenuItem>
                <MenuItem value="Delivery">Delivery</MenuItem>
                <MenuItem value="OnSite">On Site</MenuItem>
                <MenuItem value="Mail">Mail</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={4}>
              <SuiTypography
                component="label"
                variant="caption"
                fontWeight="bold"
              >
                Return Method
              </SuiTypography>
              <Select
                name="returnMethod"
                value={editedRental.returnMethod}
                onChange={handleChange}
              >
                <MenuItem value={null}>None</MenuItem>
                <MenuItem value="Delivery">Delivery</MenuItem>
                <MenuItem value="OnSite">On Site</MenuItem>
                <MenuItem value="Mail">Mail</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={4}>
              <SuiTypography
                component="label"
                variant="caption"
                fontWeight="bold"
              >
                Status
              </SuiTypography>
              <Select
                name="status"
                value={editedRental.status}
                onChange={handleChange}
              >
                <MenuItem value={null}>None</MenuItem>
                <MenuItem value="PendingRelease">Pending Release</MenuItem>
                <MenuItem value="Released">Released</MenuItem>
                <MenuItem value="PendingCompletion">
                  Pending Completion
                </MenuItem>
                <MenuItem value="Complete">Complete</MenuItem>
                <MenuItem value="Overdue">Overdue</MenuItem>
                <MenuItem value="Closed">Closed</MenuItem>
              </Select>
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

RentalEditor.propTypes = {
  rentalToEdit: PropTypes.object,
  isCreateNew: PropTypes.bool,
  requestDirectoryRefresh: PropTypes.func,
};

export default RentalEditor;
