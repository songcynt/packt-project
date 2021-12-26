import React, { useState, useEffect } from "react";
import ContentLayout from "components/ContentLayout";

import Switch from "@mui/material/Switch";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

import BasicCard from "components/BasicCard";

function SettingsPage() {
  return (
    <ContentLayout>
      <BasicCard title="Notification">
        <FormGroup>
          <FormControlLabel
            control={<Switch defaultChecked />}
            label="Send a text when a bag is checked out"
          />
          <FormControlLabel
            control={<Switch defaultChecked />}
            label="Send a text when a bag is returned"
          />
        </FormGroup>
      </BasicCard>
    </ContentLayout>
  );
}

export default SettingsPage;
