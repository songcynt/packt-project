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
import { setAutomatedMessageFromAPI } from "features/automatedMessages";
import { setAutomatedMessageById } from "features/automatedMessages";

import {
  createNewAutomatedMessage,
  editAutomatedMessageById,
} from "../../api/AutomatedMessagesAPI.js";
import { getAutomatedMessages } from "../../api/AutomatedMessagesAPI.js";
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

function AutomatedMessageEditor(props) {
  const { automatedMessageToEdit, requestDirectoryRefresh, isCreateNew } =
    props;

  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  // const [users, setUsers] = useState([]);
  const [editedAutomatedMessage, setEditedAutomatedMessage] = useState({
    id: null,
    message: null,
    eventType: null,
    dateThresholdType: null,
    dateThreshold: null,
  });

  useEffect(() => {
    if (automatedMessageToEdit != undefined) {
      setEditedAutomatedMessage(
        Object.assign(
          {
            id: null,
            message: null,
            eventType: null,
            dateThresholdType: null,
            dateThreshold: null,
          },
          automatedMessageToEdit
        )
      );

      setOpen(true);
    }
  }, [automatedMessageToEdit]);

  function handleChange(evt) {
    const value = evt.target.value;
    setEditedAutomatedMessage({
      ...editedAutomatedMessage,
      [evt.target.name]: value,
    });
  }

  function handleSubmit(event) {
    if (isCreateNew) {
      createNewAutomatedMessage(editedAutomatedMessage)
        .then((res) => {
          if (!isEmpty(res.data)) {
            dispatch(
              setAutomatedMessageById({
                automatedMessageId: res.data.id,
                automatedMessageObject: res.data,
              })
            );

            // triggess success
            triggerSuccessNotification(
              "New AutomatedMessage Created Successful",
              "You have successfully created a new automatedMessage"
            );

            requestDirectoryRefresh();
            handleClose();
          } else {
            triggerFailureNotification(
              "Unable to update automatedMessage information",
              "Please fill out all the entries"
            );
          }
        })
        .catch(() => {
          triggerFailureNotification(
            "Unable to update automatedMessage information",
            "Please fill out all the entries"
          );
        });
    } else {
      editAutomatedMessageById(
        editedAutomatedMessage.id,
        editedAutomatedMessage
      ).then((res) => {
        if (res.success) {
          // success
          dispatch(
            setAutomatedMessageById({
              automatedMessageId: editedAutomatedMessage.id,
              automatedMessageObject: editedAutomatedMessage,
            })
          );

          // trigger success
          triggerSuccessNotification(
            "Updated Successful",
            "You have successfully updated automatedMessage"
          );
        } else {
          // failure
          triggerFailureNotification(
            "Unable to update automatedMessage information",
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
        <DialogTitle>Create Automated Message</DialogTitle>
      ) : (
        <DialogTitle>Edit Automated Message</DialogTitle>
      )}
      <DialogContent>
        <Grid container padding={2}>
          <Grid container item rowSpacing={1} columnSpacing={2}>
            <Grid item xs={12}>
              <SuiTypography
                component="label"
                variant="caption"
                fontWeight="bold"
              >
                Message
              </SuiTypography>
              <SuiInput
                type="text"
                name="message"
                value={editedAutomatedMessage.message}
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
                Event Type
              </SuiTypography>
              <Select
                name="eventType"
                value={editedAutomatedMessage.eventType}
                onChange={handleChange}
              >
                <MenuItem value={null}>None</MenuItem>
                <MenuItem value="Order">Order</MenuItem>
                <MenuItem value="Start">Start</MenuItem>
                <MenuItem value="Expiry">Expiry</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={4}>
              <SuiTypography
                component="label"
                variant="caption"
                fontWeight="bold"
              >
                Date Threshold Type
              </SuiTypography>
              <Select
                name="dateThresholdType"
                value={editedAutomatedMessage.dateThresholdType}
                onChange={handleChange}
              >
                <MenuItem value={null}>None</MenuItem>
                <MenuItem value="Before">Before</MenuItem>
                <MenuItem value="After">After</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={4}>
              <SuiTypography
                component="label"
                variant="caption"
                fontWeight="bold"
              >
                Date Threshold
              </SuiTypography>
              <SuiInput
                type="number"
                name="dateThreshold"
                value={editedAutomatedMessage.dateThreshold}
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

AutomatedMessageEditor.propTypes = {
  automatedMessageToEdit: PropTypes.object,
  isCreateNew: PropTypes.bool,
  requestDirectoryRefresh: PropTypes.func,
};

export default AutomatedMessageEditor;
