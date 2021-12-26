import React, { useState, useEffect } from "react";
import ContentLayout from "components/ContentLayout";

// soft ui and component imports
import SuiButton from "components/sui-components/SuiButton";
import SuiBox from "components/sui-components/SuiBox";
import BasicCard from "components/BasicCard";
import Table from "components/Table";
import Grid from "@mui/material/Grid";

// material ui imports
import { CardActionArea } from "@mui/material";

// components
import OverviewRentals from "components/OverviewRentals";

function OverviewPage() {

  const activityColumns = [
    { name: "Date", key: "date", align: "left" },
    { name: "Activity", key: "activity", align: "left" },
    { name: "Location", key: "location", align: "left" },
  ];

  const activityRows = [
    {
      date: "October 4, 2021 11:15AM",
      activity: "New Bag Ordered",
      location: "ABC Cafe",
    },
    {
      date: "October 2, 2021 4:30PM",
      activity: "Return bag received",
      location: "ABC Cafe",
    },
  ];


  function onclickActivityTable() {
    alert("full activity page feature coming soon");
  }

  return (
    <ContentLayout>
      <SuiBox mb={3}>
        <Grid container spacing={3}>
          <OverviewRentals/>
          
          
          {/* <Grid item xs={12}>
            <BasicCard title="Account Activity" padding={false}>
              <CardActionArea onClick={() => onclickActivityTable()}>
                <Table columns={activityColumns} rows={activityRows} />
                <SuiButton
                  buttonColor="secondary"
                  style={{ width: "100%", textAlign: "center" }}
                >
                  View More
                </SuiButton>
              </CardActionArea>
            </BasicCard>
          </Grid> */}
        </Grid>
      </SuiBox>
    </ContentLayout>
  );
}

export default OverviewPage;
