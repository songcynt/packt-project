import { React, useState, useEffect } from "react";
import Table from "components/Table";
import ContentLayout from "components/ContentLayout";
import BasicCard from "components/BasicCard";
import SuiButton from "components/sui-components/SuiButton";
import Icon from "@mui/material/Icon";
import { getUsers, deleteUserById } from "../../api/UsersAPI.js";
import UserEditor from "../editors/UserEditor.js";
import DeletionDialog from "components/DeletionDialog/index.js";
import { DataGrid } from '@mui/x-data-grid';

import { useSelector, useDispatch } from "react-redux";
import { setUsersFromAPI, deleteUserFromUsers } from "features/users";
import { cloneDeep } from "lodash";
import {
  triggerSuccessNotification,
  triggerFailureNotification,
} from "notifications";

function UserDirectory() {
  const users = useSelector((state) => state.user.users);
  const dispatch = useDispatch();

  const [userToEdit, setUserToEdit] = useState(undefined);
  const [userIdToDelete, setUserIdToDelete] = useState(undefined);
  const [requireRefresh, setRequireRefresh] = useState(false);
  const [isCreateNew, setIsCreateNew] = useState(false);
  const [deletionDialogOpen, setDeletionDialogOpen] = useState(false);

  const handleOpenModal = (event, user) => {
    setUserToEdit(user);
  };
  const handleDelete = (event) => {
    deleteUserById(userIdToDelete).then((res) => {
      if (res.success) {
        dispatch(deleteUserFromUsers({ userId: userIdToDelete }));

        triggerSuccessNotification(
          "Successfully deleted user",
          "User deleted successfully"
        );
        setRequireRefresh(true);
        closeDialog();
      } else {
        triggerFailureNotification(
          "Unable to delete user",
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
    setUsersFromAPI(dispatch, getUsers).then(() => {
      setRequireRefresh(false);
    });
  }, [requireRefresh]);

  // Sets the columns of the table.
  const columns = [
    { field: "phoneNumber", headerName: "Phone Number", minWidth: 140 },
    { field: "firstName", headerName: "First Name", minWidth: 150 },
    { field: "lastName", headerName: "Last Name", minWidth: 150 },
    { field: "email", headerName: "Email", minWidth: 300 },
    { field: "address", headerName: "Address", minWidth: 350 },
    {
      field: "dateJoined",
      headerName: "Date Joined",
      minWidth: 230
    },
    { field: "isMember", headerName: "Member", minWidth: 40 },
    { field: "isAdmin", headerName: "Admin", minWidth: 40 },
    {
      field: "edit",
      headerName: "",
      renderCell: (user) => {
        return (
          <SuiButton
            onClick={(e) => {
              setIsCreateNew(false);
              handleOpenModal(e, user.row);
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
      renderCell: (user) => {
        return (
          <SuiButton
            onClick={() => {
              setUserIdToDelete(user.row.id);
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
  let rows = users
    ? Object.values(users).map((user) => {
        // cannot edit an object stored in redux store outside for a reducer fn
        user = cloneDeep(user);

        user.edit = (
          <SuiButton
            onClick={(e) => {
              setIsCreateNew(false);
              handleOpenModal(e, user);
            }}
            variant="contained"
            color="primary"
          >
            Edit&nbsp;
            <Icon>edit</Icon>
          </SuiButton>
        );
        user.delete = (
          <SuiButton
            onClick={() => {
              setUserIdToDelete(user.id);
              setDeletionDialogOpen(true);
            }}
            variant="contained"
            color="primary"
          >
            Delete&nbsp;
            <Icon>delete</Icon>
          </SuiButton>
        );
        return user;
      })
    : null;

  return (
    <ContentLayout>
      <DeletionDialog
        open={deletionDialogOpen}
        closeDialog={closeDialog}
        handleDelete={handleDelete}
        itemId={userIdToDelete}
      ></DeletionDialog>
      <UserEditor
        userToEdit={userToEdit}
        isCreateNew={isCreateNew}
        requestDirectoryRefresh={requestDirectoryRefresh}
      ></UserEditor>
      <BasicCard
        title={"Users Directory"}
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

export default UserDirectory;
