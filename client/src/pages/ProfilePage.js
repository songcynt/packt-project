import React, { useState, useEffect } from "react";
import ContentLayout from "components/ContentLayout";
import SuiBox from "components/sui-components/SuiBox";
import SuiTypography from "components/sui-components/SuiTypography";
import Grid from "@mui/material/Grid";
import BasicCard from "components/BasicCard";

import { useSelector, useDispatch } from "react-redux";
import { setUserFromAPI } from "features/users";

import ProfileCard from "components/ProfileCard";

function ProfilePage() {
  return (
    <ContentLayout>
      <SuiBox mb={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <ProfileCard />
          </Grid>
        </Grid>
      </SuiBox>
    </ContentLayout>
  );
}

export default ProfilePage;
