import { React, useState, useEffect } from "react";
import Table from "components/Table";
import ContentLayout from "components/ContentLayout";
import BasicCard from "components/BasicCard";
import SuiButton from "components/sui-components/SuiButton";
import Icon from "@mui/material/Icon";
import { DataGrid } from '@mui/x-data-grid';

import {
  getClientLocations,
  deleteClientLocationById,
} from "../../api/ClientLocationsAPI.js";
import ClientLocationEditor from "../editors/ClientLocationEditor.js";
import DeletionDialog from "components/DeletionDialog/index.js";

import { useSelector, useDispatch } from "react-redux";
import {
  setClientLocationFromAPI,
  deleteClientLocation,
} from "features/clientLocations";
import { cloneDeep } from "lodash";
import {
  triggerSuccessNotification,
  triggerFailureNotification,
} from "notifications";

function ClientLocationDirectory() {
  const clientLocations = useSelector((state) => state.clientLocations);
  const dispatch = useDispatch();

  const [clientLocationToEdit, setClientLocationToEdit] = useState(undefined);
  const [clientLocationIdToDelete, setClientLocationIdToDelete] =
    useState(undefined);
  const [requireRefresh, setRequireRefresh] = useState(false);
  const [isCreateNew, setIsCreateNew] = useState(false);
  const [deletionDialogOpen, setDeletionDialogOpen] = useState(false);

  const handleOpenModal = (event, clientLocation) => {
    setClientLocationToEdit(clientLocation);
  };
  const handleDelete = (event) => {
    deleteClientLocationById(clientLocationIdToDelete).then((res) => {
      if (res.success) {
        dispatch(
          deleteClientLocation({ clientLocationId: clientLocationIdToDelete })
        );

        triggerSuccessNotification(
          "Successfully deleted client location",
          "Client location deleted successfully"
        );
        setRequireRefresh(true);
        closeDialog();
      } else {
        triggerFailureNotification(
          "Unable to delete client location",
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
    setClientLocationFromAPI(dispatch, getClientLocations).then(() => {
      setRequireRefresh(false);
    });
  }, [requireRefresh]);

  // Sets the columns of the table.
  const columns = [
    { field: "clientId", headerName: "Client ID", minWidth: 40 },
    { field: "address", headerName: "Address", minWidth: 350 },
    { field: "email", headerName: "Email", minWidth: 300 },
    { field: "phoneNumber", headerName: "Phone Number", minWidth: 140 },
    { field: "isPrimaryLocation", headerName: "Primary Location", minWidth: 160 },
    {
      field: "edit",
      headerName: "",
      renderCell: (clientLocation) => {
        return (
          <SuiButton
            onClick={(e) => {
              setIsCreateNew(false);
              handleOpenModal(e, clientLocation.row);
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
      renderCell: (clientLocation) => {
        return (
          <SuiButton
            onClick={() => {
              setClientLocationIdToDelete(clientLocation.row.id);
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
  let rows = clientLocations
    ? Object.values(clientLocations).map((clientLocation) => {
        // cannot edit an object stored in redux store outside for a reducer fn
        clientLocation = cloneDeep(clientLocation);
        return clientLocation;
      })
    : null;

  return (
    <ContentLayout>
      <DeletionDialog
        open={deletionDialogOpen}
        closeDialog={closeDialog}
        handleDelete={handleDelete}
        itemId={clientLocationIdToDelete}
      ></DeletionDialog>
      <ClientLocationEditor
        clientLocationToEdit={clientLocationToEdit}
        isCreateNew={isCreateNew}
        requestDirectoryRefresh={requestDirectoryRefresh}
      ></ClientLocationEditor>
      <BasicCard
        title={"Client Locations Directory"}
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

export default ClientLocationDirectory;
