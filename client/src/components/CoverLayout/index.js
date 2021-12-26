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

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Grid from "@mui/material/Grid";

// Soft UI Dashboard React components
import SuiBox from "components/sui-components/SuiBox";
import SuiTypography from "components/sui-components/SuiTypography";

// Soft UI Dashboard React example components
import PageLayout from "components/PageLayout";

// Custom styles for the Baise
import styles from "components/CoverLayout/styles";

import PacktLogo from "assets/images/packt-logo.webp";

function CoverLayout({
  color,
  header,
  title,
  description,
  image,
  top,
  children,
}) {
  const classes = styles({ image });

  return (
    <PageLayout background="white">
      <Grid container justifyContent="center" className={classes.coverLayout}>
        <Grid item xs={11} sm={8} md={5} xl={3}>
          {image && (
            <SuiBox
              mt={5}
              pl={8}
              pr={8}
              component="img"
              src={image}
              alt="Packt Logo"
            />
          )}

          <SuiBox mt={3}>
            <SuiBox pt={3} px={3}>
              {!header ? (
                <>
                  <SuiBox mb={1}>
                    <SuiTypography
                      variant="h3"
                      fontWeight="bold"
                      textColor={color}
                    >
                      {title}
                    </SuiTypography>
                  </SuiBox>
                  <SuiTypography
                    variant="body2"
                    fontWeight="regular"
                    textColor="text"
                  >
                    {description}
                  </SuiTypography>
                </>
              ) : (
                header
              )}
            </SuiBox>
            <SuiBox p={3}>{children}</SuiBox>
          </SuiBox>
        </Grid>
      </Grid>
    </PageLayout>
  );
}

// Setting default values for the props of CoverLayout
CoverLayout.defaultProps = {
  header: "",
  title: "",
  description: "",
  color: "primary",
  top: 20,
};

// Typechecking props for the CoverLayout
CoverLayout.propTypes = {
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "dark",
    "light",
  ]),
  header: PropTypes.node,
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string.isRequired,
  top: PropTypes.number,
  children: PropTypes.node.isRequired,
};

export default CoverLayout;
