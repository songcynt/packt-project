import { React, useState, useEffect } from "react";
import Table from "components/Table";
import ContentLayout from "components/ContentLayout";
import BasicCard from "components/BasicCard";
import SuiButton from "components/sui-components/SuiButton";
import Icon from "@mui/material/Icon";
import { getClients, deleteClientById } from "../../api/ClientsAPI.js";
import ClientEditor from "../editors/ClientEditor.js";
import DeletionDialog from "components/DeletionDialog/index.js";
import { DataGrid } from '@mui/x-data-grid';

import { useSelector, useDispatch } from "react-redux";
import { setClientFromAPI, deleteClient } from "features/clients";
import { cloneDeep } from "lodash";
import {
  triggerSuccessNotification,
  triggerFailureNotification,
} from "notifications";

function ClientDirectory() {
  const clients = useSelector((state) => state.clients);
  const dispatch = useDispatch();

  const [clientToEdit, setClientToEdit] = useState(undefined);
  const [clientIdToDelete, setClientIdToDelete] = useState(undefined);
  const [requireRefresh, setRequireRefresh] = useState(false);
  const [isCreateNew, setIsCreateNew] = useState(false);
  const [deletionDialogOpen, setDeletionDialogOpen] = useState(false);

  const handleOpenModal = (event, client) => {
    setClientToEdit(client);
  };
  const handleDelete = (event) => {
    deleteClientById(clientIdToDelete).then((res) => {
      if (res.success) {
        dispatch(deleteClient({ clientId: clientIdToDelete }));

        triggerSuccessNotification(
          "Successfully deleted client",
          "Client deleted successfully"
        );
        setRequireRefresh(true);
        closeDialog();
      } else {
        triggerFailureNotification(
          "Unable to delete client",
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
    setClientFromAPI(dispatch, getClients).then(() => {
      setRequireRefresh(false);
    });
  }, [requireRefresh]);

  // Sets the columns of the table.
  const columns = [
    { field: "name", headerName: "Name", minWidth: 200 },
    { field: "dateJoined", headerName: "Date Joined", minWidth: 230 },
    { field: "email", headerName: "Email", minWidth: 300 },
    { field: "phoneNumber", headerName: "Phone Number", minWidth: 140 },
    { field: "primaryContactId", headerName: "Primary Contact ID", minWidth: 180 },
    { field: "secondaryContactId", headerName: "Secondary Contact ID", minWidth: 200 },
    {
      field: "edit",
      headerName: "",
      renderCell: (client) => {
        return (
          <SuiButton
            onClick={(e) => {
              console.log(client.row)
              setIsCreateNew(false);
              handleOpenModal(e, client.row);
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
      renderCell: (client) => {
        return (
          <SuiButton
            onClick={() => {
              setClientIdToDelete(client.row.id);
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
  let rows = clients
    ? Object.values(clients).map((client) => {
        // cannot edit an object stored in redux store outside for a reducer fn
        client = cloneDeep(client);
        return client;
      })
    : null;

  return (
    <ContentLayout>
      <DeletionDialog
        open={deletionDialogOpen}
        closeDialog={closeDialog}
        handleDelete={handleDelete}
        itemId={clientIdToDelete}
      ></DeletionDialog>
      <ClientEditor
        clientToEdit={clientToEdit}
        isCreateNew={isCreateNew}
        requestDirectoryRefresh={requestDirectoryRefresh}
      ></ClientEditor>
      <BasicCard
        title={"Clients Directory"}
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

export default ClientDirectory;
