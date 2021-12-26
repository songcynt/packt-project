import React, { useState, useEffect } from "react";

import moment from "moment";

// soft ui and component imports
import BasicCard from "components/BasicCard";
import Table from "components/Table";
import Grid from "@mui/material/Grid";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import SuiButton from "components/sui-components/SuiButton";
import SuiBox from "components/sui-components/SuiBox";


// material ui imports
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import Card from "@mui/material/Card";

// pictures
import currRentalPic from "assets/images/DSC04749.jpg";
import overduePic from "assets/images/DSC01391.jpg";

import { useSelector, useDispatch } from "react-redux";
import { setRentalFromAPI } from "features/rentals";
import { getRentals } from "api/RentalsAPI.js";


function OverviewRentals(){
  const rentalInfo = useSelector((state) => state.rentals);
  const dispatch = useDispatch();

  // todo: change cost later
  const OVERDUE_COST = 20;
  const [totalOverdueCost, setTotalOverdueCost] = useState(0);

  const [numOrders, setNumOrders] = useState(0);
  const [orderExpiryDate, setOrderExpiryDate] = useState();
  const [numExpiry, setNumExpiry] = useState();
  const [numTotalFulfilled, setNumTotalFulfilled] = useState(0);

  const [releaseList, setReleaseList] = useState();
  const [overdueList, setOverdueList] = useState();

  const [openRentalsModal, setOpenRentalsModal] = useState(false);
  const handleOpenRentals = () => setOpenRentalsModal(true);
  const handleCloseRentals = () => setOpenRentalsModal(false);

  const [openOverdueModal, setOpenOverdueModal] = useState(false);
  const handleOpenOverdue = () => setOpenOverdueModal(true);
  const handleCloseOverdue = () => setOpenOverdueModal(false);

  const currentTableColumns = [
    { name: "Order Date", key: "orderDate", align: "center" },
    { name: "Rental Start Date", key: "startDate", align: "center" },
    { name: "Delivery Method", key: "deliveryMethod", align: "center" },
    { name: "Due Date", key: "expiryDate", align: "center" },
    { name: "Extension Granted", key: "isExtensionGiven", align: "center" },
    { name: "Extended Due Date", key: "extensionExpiryDate", align: "center" },
  ]

  const overdueTableColumns = [
    { name: "Order Date", key: "orderDate", align: "center" },
    { name: "Rental Start Date", key: "startDate", align: "center" },
    { name: "Due Date", key: "expiryDate", align: "center" },
    { name: "Extension Granted", key: "isExtensionGiven", align: "center" },
    { name: "Extended Due Date", key: "extensionExpiryDate", align: "center" },
    { name: "Days Overdue", key: "daysOverdue", align: "center"},
  ]

  function calculateDaysOverdue(val){
    // calculate number of days overdue; 0 if overdue number is negative
    let currDate = moment(new Date());
    let dueDate = (val.extensionExpiryDate) ? new Date(val.extensionExpiryDate) : new Date(val.expiryDate);
    dueDate = moment(dueDate);
    let diff = currDate.diff(dueDate);
    var daysOverdue = moment.duration(diff).asDays();
    
    // round down to nearest whole number
    return (daysOverdue | 0);
  }

  function categorizeRentals(){
    let current = 0;
    let overdues = 0;
    let totalLost = 0;

    let tempReleaseList = [];
    let tempOverdueList = [];

    let recentExpiry = new Date();
    recentExpiry.setFullYear(recentExpiry.getFullYear() + 1);
 
    for(let [key, val] of Object.entries(rentalInfo)) {
      var isExtensionGiven = val.extensionExpiryDate ? "yes" : "";
      var daysOverdue = calculateDaysOverdue(val)


      var tempVal = {
        orderDate: moment(val.orderDate).format('MMMM Do YYYY'),
        startDate: moment(val.startDate).format('MMMM Do YYYY'),
        deliveryMethod: val.deliveryMethod,
        expiryDate: moment(val.expiryDate).format('MMMM Do YYYY'),
        isExtensionGiven: isExtensionGiven,
        extensionExpiryDate: moment(val.extensionExpiryDate).format('MMMM Do YYYY'),
        daysOverdue: daysOverdue,
      }

      if (tempVal.deliveryMethod == "OnSite"){
        tempVal.deliveryMethod = "Pickup OnSite";
      }

      if (isExtensionGiven == "") {
        tempVal.extensionExpiryDate = "";
      }

      if (val.status == "PendingRelease" || val.status == "Released"){
        if (val.extensionExpiryDate && (new Date(val.extensionExpiryDate).getTime() < new Date(recentExpiry).getTime())){
          recentExpiry = val.extensionExpiryDate;
        } else if (new Date(val.expiryDate).getTime() < new Date(recentExpiry).getTime()){
          recentExpiry = val.expiryDate;
        }
        
        tempReleaseList.push(tempVal)
        current++;

      } else if (val.status == "Overdue"){
        tempOverdueList.push(tempVal)
        overdues++;
      } else if (val.status == "Closed"){ totalLost++; }
    }

    setNumOrders(current);
    if (current > 0){ setOrderExpiryDate(recentExpiry); }
    else { setOrderExpiryDate(""); }
    setNumExpiry(overdues);
    setNumTotalFulfilled(Object.keys(rentalInfo).length - totalLost);

    setReleaseList(tempReleaseList);
    setOverdueList(tempOverdueList);

    setTotalOverdueCost(OVERDUE_COST * overdues);
  }

  function openLinkNewTab(linkURL){
    window.open(linkURL);
  }

  useEffect(() => {
    categorizeRentals();

  }, [rentalInfo])

  useEffect(() => {
    // initial call
    if (Object.keys(rentalInfo).length == 0){
      setRentalFromAPI(dispatch, getRentals);
    }
    
    categorizeRentals();
  }, [])

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  return(
    <React.Fragment>
      {/* CURRENT RENTALS CARD */}
      <Grid item>
        <Card sx={{ width: 300 }} style={{ display: "inline-block" }}>
          <CardActionArea onClick={handleOpenRentals}>
            <CardMedia
              component="img"
              height="140"
              image={currRentalPic}
              alt=""
              style={{margin:"auto"}}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Current Rentals: {numOrders} bag(s)
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {(numOrders > 0) ? "Next due date:" : ""}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {(numOrders > 0) ? moment(orderExpiryDate).format('MMMM Do YYYY, h:mm a') : ""}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>

      <Modal
        open={openRentalsModal}
        onClose={handleCloseRentals}
      >
        <Box sx={style}>
          <Grid container direction="row" spacing={2} justifyContent="center">
            <Grid item>
              <SuiButton type="submit" buttonColor="info" onClick={() => openLinkNewTab("https://www.packt.ca/returns")}>
                Return Bag
              </SuiButton>
            </Grid>
            {/* <Grid item>
              <SuiButton type="submit" buttonColor="info" onClick={() => openLinkNewTab("https://docs.google.com/forms/d/e/1FAIpQLSc-dNpCBTZbuD26zukxc9gerJb7jUPTbMaIxgzkx54wV4o-sw/viewform")}>
                Request Extension
              </SuiButton>
            </Grid> */}
          </Grid>
          <Table
            columns={currentTableColumns}
            rows={releaseList}
          />
        </Box>
      </Modal>

      {/* OVERDUE RENTALS CARD */}
      <Grid item>
        <Card sx={{ width: 300 }} style={{ display: "inline-block" }}>
          <CardActionArea onClick={handleOpenOverdue}>
            <CardMedia
              component="img"
              height="140"
              image={overduePic}
              alt=""
              style={{margin:"auto"}}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Current Overdue: {numExpiry} bag(s)
              </Typography>

              <Typography variant="body2" color="text.secondary">
                {(numExpiry > 0) ? "Please return as soon as possible or contact us." : ""}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>

      <Modal
        open={openOverdueModal}
        onClose={handleCloseOverdue}
      >
        <Box sx={style}>
          <Grid container direction="row" spacing={2} justifyContent="center">
            <Grid item>
              <SuiButton type="submit" buttonColor="info" onClick={() => openLinkNewTab("https://www.packt.ca/returns")}>
                Return Bag
              </SuiButton>
            </Grid>
            <Grid item>
              <SuiButton type="submit" buttonColor="info" onClick={() => openLinkNewTab("https://docs.google.com/forms/d/e/1FAIpQLSc-dNpCBTZbuD26zukxc9gerJb7jUPTbMaIxgzkx54wV4o-sw/viewform")}>
                Request Extension
              </SuiButton>
            </Grid>
          </Grid>
          <Table
            columns={overdueTableColumns}
            rows={overdueList}
          />
        </Box>
      </Modal>

      {/* YOUR IMPACT CARD */}
      <Grid item xs={12}>
        <BasicCard title="Your Impact" padding={false}>
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              Congratulations! You have prevented {numTotalFulfilled} single-use, disposable coffee bags from becoming waste.
            </Typography>
          </CardContent>
        </BasicCard>
      </Grid>
    </React.Fragment>
  );

}

export default OverviewRentals;