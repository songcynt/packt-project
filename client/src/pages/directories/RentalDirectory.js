import { React, useState, useEffect } from "react";
import ContentLayout from "components/ContentLayout";
import BasicCard from "components/BasicCard";
import SuiButton from "components/sui-components/SuiButton";
import Icon from "@mui/material/Icon";
import { getRentals, deleteRentalById } from "../../api/RentalsAPI.js";
import RentalEditor from "../editors/RentalEditor.js";
import DeletionDialog from "components/DeletionDialog/index.js";
import { DataGrid } from '@mui/x-data-grid';


import { useSelector, useDispatch } from "react-redux";
import { setRentalFromAPI, deleteRental } from "features/rentals";
import { cloneDeep } from "lodash";
import {
  triggerSuccessNotification,
  triggerFailureNotification,
} from "notifications";

function RentalDirectory() {
  const rentals = useSelector((state) => state.rentals);
  const dispatch = useDispatch();

  const [rentalToEdit, setRentalToEdit] = useState(undefined);
  const [rentalIdToDelete, setRentalIdToDelete] = useState(undefined);
  const [requireRefresh, setRequireRefresh] = useState(false);
  const [isCreateNew, setIsCreateNew] = useState(false);
  const [deletionDialogOpen, setDeletionDialogOpen] = useState(false);

  const handleOpenModal = (event, rental) => {
    setRentalToEdit(rental);
  };
  const handleDelete = (event) => {
    deleteRentalById(rentalIdToDelete).then((res) => {
      if (res.success) {
        dispatch(deleteRental({ rentalId: rentalIdToDelete }));

        triggerSuccessNotification(
          "Successfully deleted rental",
          "Rental deleted successfully"
        );
        setRequireRefresh(true);
        closeDialog();
      } else {
        triggerFailureNotification(
          "Unable to delete rental",
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
    setRentalFromAPI(dispatch, getRentals).then(() => {
      setRequireRefresh(false);
    });
  }, [requireRefresh]);

  // Sets the columns of the table.
  const columns = [
    { field: "userId", headerName: "User ID", minWidth: 40 },
    { field: "orderDate", headerName: "Order Date", minWidth: 230 },
    { field: "startDate", headerName: "Start Date", minWidth: 230 },
    { field: "expiryDate", headerName: "Expiry Date", minWidth: 230 },
    {
      field: "extensionExpiryDate",
      headerName: "Extension Expiry Date",
      minWidth: 230,
    },
    { field: "returnedDate", headerName: "Returned Date", minWidth: 230 },
    { field: "deliveryMethod", headerName: "Delivery Method", minWidth: 150 },
    { field: "returnMethod", headerName: "Return Method", minWidth: 150 },
    { field: "status", headerName: "Status", minWidth: 100 },
    {
      field: "edit",
      headerName: "",
      renderCell: (rental) => {
        return (
          <SuiButton
            onClick={(e) => {
              setIsCreateNew(false);
              handleOpenModal(e, rental.row);
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
      renderCell: (rental) => {
        return (
          <SuiButton
            onClick={() => {
              setRentalIdToDelete(rental.row.id);
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

  const rows = rentals
    ? Object.values(rentals).map((rental) => {
        // cannot edit an object stored in redux store outside for a reducer fn
        rental = cloneDeep(rental);      
        return rental;
      })
    : null;

  return (
    <ContentLayout>
      <DeletionDialog
        open={deletionDialogOpen}
        closeDialog={closeDialog}
        handleDelete={handleDelete}
        itemId={rentalIdToDelete}
      ></DeletionDialog>
      <RentalEditor
        rentalToEdit={rentalToEdit}
        isCreateNew={isCreateNew}
        requestDirectoryRefresh={requestDirectoryRefresh}
      ></RentalEditor>
      <BasicCard
        title={"Rentals Directory"}
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

export default RentalDirectory;
