/**
=========================================================
* Soft UI Dashboard React - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-material-ui
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import React, { useState, useEffect } from "react";
import ContentLayout from "components/ContentLayout";
import BasicCard from "components/BasicCard";
import Grid from "@mui/material/Grid";
import SuiBox from "components/sui-components/SuiBox";
import MiniStatisticsCard from "components/MiniStatisticsCard";
import SuiTypography from "components/sui-components/SuiTypography";

function CustomerPage() {
  const labels = ["Name", "Email Address", "Date Joined", "Phone Number"];
  const values = [
    "Cynthia Song",
    "cynthiasong@gmail.com",
    "10/05/2021",
    647123987,
  ];

  const renderItems = labels.map((label, key) => (
    <SuiBox key={label} display="flex" py={1} pr={2}>
      <SuiTypography
        variant="button"
        fontWeight="bold"
        textTransform="capitalize"
      >
        {label}: &nbsp;
      </SuiTypography>
      <SuiTypography variant="button" fontWeight="regular" textColor="text">
        &nbsp;{values[key]}
      </SuiTypography>
    </SuiBox>
  ));

  return (
    <ContentLayout>
      <SuiBox mb={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <BasicCard
              title={"Customer Profile"}
              editOnClick={() => {
                alert("In development");
              }}
            >
              {renderItems}
            </BasicCard>
          </Grid>
          <Grid item xs={12} md={6}>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <MiniStatisticsCard
                  title={{ text: "Bags Rented" }}
                  count="36"
                  icon={{ color: "info", component: "shopping_bag" }}
                />
              </Grid>
              <Grid item xs={6}>
                <MiniStatisticsCard
                  title={{ text: "Bags Returned" }}
                  count="36"
                  icon={{ color: "info", component: "shopping_bag" }}
                />
              </Grid>
              <Grid item xs={6}>
                <MiniStatisticsCard
                  title={{ text: "Bags Overdue" }}
                  count="0"
                  icon={{ color: "info", component: "shopping_bag" }}
                />
              </Grid>
              <Grid item xs={6}>
                <MiniStatisticsCard
                  title={{ text: "Shops Rented From" }}
                  count="1"
                  icon={{ color: "info", component: "store" }}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </SuiBox>
    </ContentLayout>
  );
}

export default CustomerPage;
