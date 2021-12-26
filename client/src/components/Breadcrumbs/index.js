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

// react-router-dom components
import { Link } from "react-router-dom";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @mui material components
import { Breadcrumbs as MuiBreadcrumbs } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";

// Soft UI Dashboard React components
import SuiBox from "components/sui-components/SuiBox";
import SuiTypography from "components/sui-components/SuiTypography";

// Custom styles for Breadcrumbs
import styles from "components/Breadcrumbs/styles";

function Breadcrumbs({ title, route, light }) {
  const classes = styles({ light });
  const routes = route.slice(0, -1);

  return (
    <SuiBox mr={{ xs: 0, xl: 8 }}>
      <MuiBreadcrumbs className={classes.breadcrumbs}>
        <Link to="/">
          <SuiTypography
            component="span"
            variant="body2"
            textColor={light ? "white" : "dark"}
            opacity={light ? 0.8 : 0.5}
            customClass="line-height-0"
          >
            <HomeIcon />
          </SuiTypography>
        </Link>
        {routes.map((el) => (
          <Link to={`/${el}`} key={el} className="decoration-none">
            <SuiTypography
              component="span"
              variant="button"
              fontWeight="regular"
              textTransform="capitalize"
              textColor={light ? "white" : "dark"}
              opacity={light ? 0.8 : 0.5}
              customClass="line-height-0"
            >
              {el}
            </SuiTypography>
          </Link>
        ))}
        <SuiTypography
          variant="button"
          fontWeight="regular"
          textTransform="capitalize"
          textColor={light ? "white" : "dark"}
          customClass="line-height-0"
        >
          {title.replace("-", " ")}
        </SuiTypography>
      </MuiBreadcrumbs>
      <SuiTypography
        fontWeight="bold"
        textTransform="capitalize"
        variant="h6"
        textColor={light ? "white" : "dark"}
        noWrap
      >
        {title.replace("-", " ")}
      </SuiTypography>
    </SuiBox>
  );
}

// Setting default values for the props of Breadcrumbs
Breadcrumbs.defaultProps = {
  light: false,
};

// Typechecking props for the Breadcrumbs
Breadcrumbs.propTypes = {
  title: PropTypes.string.isRequired,
  route: PropTypes.oneOfType([PropTypes.string, PropTypes.array]).isRequired,
  light: PropTypes.bool,
};

export default Breadcrumbs;