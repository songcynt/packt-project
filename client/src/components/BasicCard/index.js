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

import React from "react";

// @mui material components
import Card from "@mui/material/Card";
import Tooltip from "@mui/material/Tooltip";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// Soft UI Dashboard React components
import SuiBox from "components/sui-components/SuiBox";
import SuiTypography from "components/sui-components/SuiTypography";
import EditIcon from "@mui/icons-material/Edit";

function BasicCard({ title, children, padding, editOnClick }) {
  return (
    <Card>
      <SuiBox
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        p={3}
      >
        <SuiTypography variant="h6">{title}</SuiTypography>
        {editOnClick !== undefined ? (
          <SuiTypography onClick={editOnClick} variant="body2">
            <Tooltip title={"Edit Button"} placement="top">
              <EditIcon />
            </Tooltip>
          </SuiTypography>
        ) : (
          ""
        )}
      </SuiBox>
      {padding ? (
        <SuiBox pb={3} px={3} lineHeight={1}>
          {children}
        </SuiBox>
      ) : (
        children
      )}
    </Card>
  );
}

// Setting default values for the props of Breadcrumbs
BasicCard.defaultProps = {
  title: "",
  padding: true,
};

// Typechecking props for the Breadcrumbs
BasicCard.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  padding: PropTypes.bool,
  editOnClick: PropTypes.func,
};

export default BasicCard;
