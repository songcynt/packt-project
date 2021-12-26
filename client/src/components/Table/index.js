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

import { useMemo } from "react";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import { Table as MuiTable } from "@mui/material";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";

// Soft UI Dashboard React components
import SuiBox from "components/sui-components/SuiBox";
import SuiAvatar from "components/sui-components/SuiAvatar";
import SuiTypography from "components/sui-components/SuiTypography";

// Soft UI Dashboard React base styles
import colors from "assets/theme/base/colors";
import typography from "assets/theme/base/typography";
import borders from "assets/theme/base/borders";

function Table({ columns, rows }) {
  const { light } = colors;
  const { size, fontWeightBold } = typography;
  const { borderWidth } = borders;

  const renderColumns = columns.map(({ name, align }, key) => {
    let pl;
    let pr;

    if (key === 0) {
      pl = 3;
      pr = 3;
      // } else if (key === columns.length - 1) {
      //   pl = 3;
      //   pr = 3;
    } else {
      pl = 1;
      pr = 1;
    }

    return (
      <SuiBox
        key={name}
        component="th"
        pt={1.5}
        pb={1.25}
        pl={align === "left" ? pl : 3}
        pr={align === "right" ? pr : 3}
        textAlign={align}
        fontSize={size.xxs}
        fontWeight={fontWeightBold}
        opacity={0.7}
        borderBottom={`${borderWidth[1]} solid ${light.main}`}
      >
        {name.toUpperCase()}
      </SuiBox>
    );
  });

  const renderRows = rows.map((row, rowIndex) => {
    const rowKey = `row-${rowIndex}`;

    const tableRow = columns.map(({ name, key, align }, columnId) => (
      <SuiBox
        key={key}
        component="td"
        p={1}
        pl={columnId == 0 ? 3 : undefined}
        textAlign={align}
      >
        <SuiTypography
          variant="button"
          fontWeight="regular"
          customClass="d-inline-block w-max"
        >
          {row[key]}
        </SuiTypography>
      </SuiBox>
    ));

    return (
      <TableRow hover onClick={row.$onClick} key={rowKey}>
        {tableRow}
      </TableRow>
    );
  });

  return useMemo(
    () => (
      <TableContainer>
        <MuiTable>
          <SuiBox component="thead">
            <TableRow>{renderColumns}</TableRow>
          </SuiBox>
          <TableBody>{renderRows}</TableBody>
        </MuiTable>
      </TableContainer>
    ),
    [columns, rows]
  );
}

// Setting default values for the props of Table
Table.defaultProps = {
  columns: [],
  rows: [{}],
};

// Typechecking props for the Table
Table.propTypes = {
  /** { name: string, key: string, align: "left" | "center" | "right" }[] */
  columns: PropTypes.arrayOf(PropTypes.object),
  /** The keys in this object must map to `key` in one of the
   * objects in the `columns` array.
   */
  rows: PropTypes.arrayOf(PropTypes.object),
};

export default Table;
