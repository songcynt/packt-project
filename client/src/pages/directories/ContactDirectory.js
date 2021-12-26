import { React, useState, useEffect } from "react";
import Table from "components/Table";
import ContentLayout from "components/ContentLayout";
import BasicCard from "components/BasicCard";
import SuiButton from "components/sui-components/SuiButton";
import Icon from "@mui/material/Icon";
import { getContacts, deleteContactById } from "../../api/ContactsAPI.js";
import ContactEditor from "../editors/ContactEditor.js";
import DeletionDialog from "components/DeletionDialog/index.js";
import { DataGrid } from '@mui/x-data-grid';

import { useSelector, useDispatch } from "react-redux";
import { setContactFromAPI, deleteContact } from "features/contacts";
import { cloneDeep } from "lodash";
import {
  triggerSuccessNotification,
  triggerFailureNotification,
} from "notifications";

function ContactDirectory() {
  const contacts = useSelector((state) => state.contacts);
  const dispatch = useDispatch();

  const [contactToEdit, setContactToEdit] = useState(undefined);
  const [contactIdToDelete, setContactIdToDelete] = useState(undefined);
  const [requireRefresh, setRequireRefresh] = useState(false);
  const [isCreateNew, setIsCreateNew] = useState(false);
  const [deletionDialogOpen, setDeletionDialogOpen] = useState(false);

  const handleOpenModal = (event, contact) => {
    setContactToEdit(contact);
  };
  const handleDelete = (event) => {
    deleteContactById(contactIdToDelete).then((res) => {
      if (res.success) {
        dispatch(deleteContact({ contactId: contactIdToDelete }));

        triggerSuccessNotification(
          "Successfully deleted contact",
          "Contact deleted successfully"
        );
        setRequireRefresh(true);
        closeDialog();
      } else {
        triggerFailureNotification(
          "Unable to delete contact",
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
    setContactFromAPI(dispatch, getContacts).then(() => {
      setRequireRefresh(false);
    });
  }, [requireRefresh]);

  // Sets the columns of the table.
  const columns = [
    { field: "firstName", headerName: "First Name", minWidth: 150 },
    { field: "lastName", headerName: "Last Name", minWidth: 150 },
    { field: "phoneNumber", headerName: "Phone Number", minWidth: 140 },
    { field: "email", headerName: "Email", minWidth: 300 },
    {
      field: "edit",
      headerName: "",
      renderCell: (contact) => {
        return (
          <SuiButton
            onClick={(e) => {
              setIsCreateNew(false);
              handleOpenModal(e, contact.row);
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
      renderCell: (contact) => {
        return (
          <SuiButton
            onClick={() => {
              setContactIdToDelete(contact.row.id);
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
  let rows = contacts
    ? Object.values(contacts).map((contact) => {
        // cannot edit an object stored in redux store outside for a reducer fn
        contact = cloneDeep(contact);
        return contact;
      })
    : null;

  return (
    <ContentLayout>
      <DeletionDialog
        open={deletionDialogOpen}
        closeDialog={closeDialog}
        handleDelete={handleDelete}
        itemId={contactIdToDelete}
      ></DeletionDialog>
      <ContactEditor
        contactToEdit={contactToEdit}
        isCreateNew={isCreateNew}
        requestDirectoryRefresh={requestDirectoryRefresh}
      ></ContactEditor>
      <BasicCard
        title={"Contacts Directory"}
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

export default ContactDirectory;
