import { React, useState, useEffect } from "react";
import Table from "components/Table";
import ContentLayout from "components/ContentLayout";
import BasicCard from "components/BasicCard";
import SuiButton from "components/sui-components/SuiButton";
import Icon from "@mui/material/Icon";
import { getAutomatedMessages, deleteAutomatedMessageById } from "../../api/AutomatedMessagesAPI.js";
import AutomatedMessageEditor from "../editors/AutomatedMessageEditor.js";
import DeletionDialog from "components/DeletionDialog/index.js";
import { DataGrid } from '@mui/x-data-grid';

import { useSelector, useDispatch } from "react-redux";
import { setAutomatedMessageFromAPI, deleteAutomatedMessage } from "features/automatedMessages";
import { cloneDeep } from "lodash";
import {
  triggerSuccessNotification,
  triggerFailureNotification,
} from "notifications";

function AutomatedMessageDirectory() {
  const automatedMessages = useSelector((state) => state.automatedMessages);
  const dispatch = useDispatch();

  const [automatedMessageToEdit, setAutomatedMessageToEdit] = useState(undefined);
  const [automatedMessageIdToDelete, setAutomatedMessageIdToDelete] = useState(undefined);
  const [requireRefresh, setRequireRefresh] = useState(false);
  const [isCreateNew, setIsCreateNew] = useState(false);
  const [deletionDialogOpen, setDeletionDialogOpen] = useState(false);

  const handleOpenModal = (event, automatedMessage) => {
    setAutomatedMessageToEdit(automatedMessage);
  };
  const handleDelete = (event) => {
    deleteAutomatedMessageById(automatedMessageIdToDelete).then((res) => {
      if (res.success) {
        dispatch(deleteAutomatedMessage({ automatedMessageId: automatedMessageIdToDelete }));

        triggerSuccessNotification(
          "Successfully deleted automatedMessage",
          "AutomatedMessage deleted successfully"
        );
        setRequireRefresh(true);
        closeDialog();
      } else {
        triggerFailureNotification(
          "Unable to delete automatedMessage",
          "Please try again later"
        );
      }
    });
  };
  const closeDialog = () => {
    setDeletionDialogOpen(false);
  };
  const requestDirectoryRefresh = () => setRequireRefresh(true);

  useEffect(() => {
    setAutomatedMessageFromAPI(dispatch, getAutomatedMessages).then(() => {
      setRequireRefresh(false);
    });
  }, [requireRefresh]);

  // Sets the columns of the table.
  const columns = [
    { field: "message", headerName: "Message", minWidth: 400 },
    { field: "eventType", headerName: "Event Type", minWidth: 110 },
    { field: "dateThresholdType", headerName: "Date Threshold Type", minWidth: 180 },
    { field: "dateThreshold", headerName: "Date Threshold", minWidth: 140 },
    {
      field: "edit",
      headerName: "",
      renderCell: (automatedMessage) => {
        return (
          <SuiButton
            onClick={(e) => {
              setIsCreateNew(false);
              handleOpenModal(e, automatedMessage.row);
            }}
            variant="contained"
            color="primary"
          >
            Edit&nbsp;
            <Icon>edit</Icon>
          </SuiButton>
        );
      }
    },
    {
      field: "delete",
      headerName: "",
      renderCell: (automatedMessage) => {
        return (
          <SuiButton
            onClick={() => {
              setAutomatedMessageIdToDelete(automatedMessage.row.id);
              setDeletionDialogOpen(true);
            }}
            variant="contained"
            color="primary"
          >
            Delete&nbsp;
            <Icon>delete</Icon>
          </SuiButton>
        );
      }
    }
  ];

  // Add the edit and delete buttons for the table.
  let rows = automatedMessages
    ? Object.values(automatedMessages).map((automatedMessage) => {
        // cannot edit an object stored in redux store outside for a reducer fn
        automatedMessage = cloneDeep(automatedMessage);

        automatedMessage.edit = (
          <SuiButton
            onClick={(e) => {
              setIsCreateNew(false);
              handleOpenModal(e, automatedMessage);
            }}
            variant="contained"
            color="primary"
          >
            Edit&nbsp;
            <Icon>edit</Icon>
          </SuiButton>
        );
        automatedMessage.delete = (
          <SuiButton
            onClick={() => {
              setAutomatedMessageIdToDelete(automatedMessage.id);
              setDeletionDialogOpen(true);
            }}
            variant="contained"
            color="primary"
          >
            Delete&nbsp;
            <Icon>delete</Icon>
          </SuiButton>
        );
        return automatedMessage;
      })
    : null;

  return (
    <ContentLayout>
      <DeletionDialog
        open={deletionDialogOpen}
        closeDialog={closeDialog}
        handleDelete={handleDelete}
        itemId={automatedMessageIdToDelete}
      ></DeletionDialog>
      <AutomatedMessageEditor
        automatedMessageToEdit={automatedMessageToEdit}
        isCreateNew={isCreateNew}
        requestDirectoryRefresh={requestDirectoryRefresh}
      ></AutomatedMessageEditor>
      <BasicCard
        title={"Automated Messages Directory"}
        editOnClick={(e) => {
          setIsCreateNew(true);
          handleOpenModal(e, {});
        }}
        padding={false}
      >
        {/* <Table columns={columns} rows={rows} /> */}
        <div style={{ height: '90vh', width: '100%' }}>
          <DataGrid 
            columns={columns} 
            rows={rows} 
            disableSelectionOnClick={true}
            pagination/>
        </div>
      </BasicCard>
    </ContentLayout>
  );
}

export default AutomatedMessageDirectory;
