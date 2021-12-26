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
import { setClientFromAPI } from "features/clients";
import { setClientLocationById } from "features/clientLocations";

import {
  createNewClientLocation,
  editClientLocationById,
} from "../../api/ClientLocationsAPI.js";
import { getClients } from "../../api/ClientsAPI.js";
import { Box } from "@mui/system";
import {
  Autocomplete,
  Checkbox,
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

function ClientLocationEditor(props) {
  const { clientLocationToEdit, requestDirectoryRefresh, isCreateNew } = props;

  const dispatch = useDispatch();
  const clients = useSelector((state) => state.clients);

  const [open, setOpen] = useState(false);
  const [editedClientLocation, setEditedClientLocation] = useState({
    id: null,
    address: null,
    email: null,
    phoneNumber: null,
    isPrimaryLocation: null,
    clientId: null,
  });
  const [selectedClient, setSelectedClient] = useState(null);

  useEffect(() => {
    if (clientLocationToEdit != undefined) {
      setEditedClientLocation(
        Object.assign(
          {
            id: null,
            address: null,
            email: null,
            phoneNumber: null,
            isPrimaryLocation: null,
            clientId: null,
          },
          clientLocationToEdit
        )
      );

      if (isEmpty(clients)) {
        console.log("setting clients");

        setClientFromAPI(dispatch, getClients).then(() => {
          setSelectedClient(clients[clientLocationToEdit.clientId]);
        });
      } else {
        setSelectedClient(clients[clientLocationToEdit.clientId]);
      }

      setOpen(true);
    }
  }, [clientLocationToEdit]);

  function handleChange(evt) {
    const value = evt.target.value;
    setEditedClientLocation({
      ...editedClientLocation,
      [evt.target.name]: value,
    });
  }

  function handleSelectedClientChange(evt, newClient) {
    setSelectedClient(newClient);
    setEditedClientLocation({
      ...editedClientLocation,
      clientId: newClient ? newClient.id : null,
    });
  }

  function handleSubmit(event) {
    if (isCreateNew) {
      createNewClientLocation(editedClientLocation)
        .then((res) => {
          if (!isEmpty(res.data)) {
            dispatch(
              setClientLocationById({
                clientLocationId: res.data.id,
                clientLocationObject: res.data,
              })
            );

            // triggess success
            triggerSuccessNotification(
              "New Client Location Created Successful",
              "You have successfully created a new client location"
            );

            requestDirectoryRefresh();
            handleClose();
          } else {
            triggerFailureNotification(
              "Unable to update client location information",
              "Please fill out all the entries"
            );
          }
        })
        .catch(() => {
          triggerFailureNotification(
            "Unable to update client location information",
            "Please fill out all the entries"
          );
        });
    } else {
      editClientLocationById(
        editedClientLocation.id,
        editedClientLocation
      ).then((res) => {
        if (res.success) {
          // success
          dispatch(
            setClientLocationById({
              clientLocationId: editedClientLocation.id,
              clientLocationObject: editedClientLocation,
            })
          );

          // trigger success
          triggerSuccessNotification(
            "Updated Successful",
            "You have successfully updated client location"
          );
        } else {
          // failure
          triggerFailureNotification(
            "Unable to update client location information",
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
        <DialogTitle>Create Client Location</DialogTitle>
      ) : (
        <DialogTitle>Edit Client Location</DialogTitle>
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
                Client
              </SuiTypography>
              <Autocomplete
                value={selectedClient}
                onChange={handleSelectedClientChange}
                options={clients ? Object.values(clients) : []}
                autoHighlight
                getOptionLabel={(option) => option.name}
                renderOption={(props, option) => (
                  <Box
                    component="li"
                    sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                    {...props}
                  >
                    {option.name}
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
            <Grid item xs={10}>
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
                value={editedClientLocation.address}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={2}>
              <SuiTypography
                component="label"
                variant="caption"
                fontWeight="bold"
              >
                Primary Location
              </SuiTypography>
              {/* <SuiInput
                type="date"
                name="dateJoined"
                value={editedClientLocation.isPrimaryLocation}
                onChange={handleChange}
              /> */}
              <Select
                name="isPrimaryLocation"
                value={editedClientLocation.isPrimaryLocation}
                onChange={handleChange}
              >
                <MenuItem value={null}>None</MenuItem>
                <MenuItem value="true">True</MenuItem>
                <MenuItem value="false">False</MenuItem>
              </Select>
            </Grid>
          </Grid>

          <Grid container item rowSpacing={1} columnSpacing={2}>
            <Grid item xs={7}>
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
                value={editedClientLocation.email}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={5}>
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
                value={editedClientLocation.phoneNumber}
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

ClientLocationEditor.propTypes = {
  clientLocationToEdit: PropTypes.object,
  isCreateNew: PropTypes.bool,
  requestDirectoryRefresh: PropTypes.func,
};

export default ClientLocationEditor;
