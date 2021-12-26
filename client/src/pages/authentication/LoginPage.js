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

import { useState } from "react";

// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Switch from "@mui/material/Switch";

// Soft UI Dashboard React components
import SuiBox from "components/sui-components/SuiBox";
import SuiTypography from "components/sui-components/SuiTypography";
import SuiInput from "components/sui-components/SuiInput";
import SuiButton from "components/sui-components/SuiButton";
import {
  triggerSuccessNotification,
  triggerFailureNotification,
} from "notifications";

import PacktLogo from "assets/images/packt-logo.webp";
import { login } from "api/LoginAPI";

// Authentication layout components
import CoverLayout from "components/CoverLayout";
import { Formik } from "formik";
import * as Yup from "yup";
import { setUserFromAPI } from "features/users";
import { useDispatch } from "react-redux";

function LoginPage() {
  const dispatch = useDispatch();

  const initialValues = {
    phoneNumber: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    phoneNumber: Yup.string().required("Required"),
    password: Yup.string().required("Required"),
  });

  return (
    <CoverLayout
      top={10}
      color="info"
      description="Enter your email and password to log in"
      image={PacktLogo}
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values) => {
          console.log(values);
          const phoneNumber = values.phoneNumber;
          const password = values.password;
          const failureResponse = () =>
            triggerFailureNotification(
              "Incorrect Log In Credentials",
              "Failed to login due to incorrect phone number or password"
            );
          const successResponse = () =>
            triggerSuccessNotification(
              "Log In Successful",
              "You have successfully logged in"
            );

          await setUserFromAPI(
            dispatch,
            () => login(phoneNumber, password),
            successResponse,
            failureResponse
          );
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          /* and other goodies */
        }) => (
          <SuiBox component="form" role="form" onSubmit={handleSubmit}>
            <SuiBox mb={2}>
              <SuiBox mb={1} ml={0.5}>
                <SuiTypography
                  component="label"
                  variant="caption"
                  fontWeight="bold"
                >
                  Phone Number
                </SuiTypography>
              </SuiBox>
              <SuiInput
                type="tel"
                placeholder="Phone Number"
                name="phoneNumber"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.phoneNumber}
              />
              <SuiTypography variant="caption" textColor="error">
                {errors.phoneNumber &&
                  touched.phoneNumber &&
                  errors.phoneNumber}
              </SuiTypography>
            </SuiBox>

            <SuiBox mb={2}>
              <SuiBox mb={1} ml={0.5}>
                <SuiTypography
                  component="label"
                  variant="caption"
                  fontWeight="bold"
                >
                  Password
                </SuiTypography>
              </SuiBox>
              <SuiInput
                type="password"
                placeholder="Password"
                name="password"
                onChange={handleChange}
                obBlue={handleBlur}
                value={values.password}
              />
              <SuiTypography variant="caption" textColor="error">
                {errors.password && touched.password && errors.password}
              </SuiTypography>
            </SuiBox>
            <SuiBox mt={4} mb={1}>
              <SuiButton type="submit" buttonColor="info" fullWidth>
                log in
              </SuiButton>
            </SuiBox>
            <SuiBox mt={3} textAlign="center">
              <SuiTypography
                variant="button"
                textColor="text"
                fontWeight="regular"
              >
                Don&apos;t have an account?{" "}
                <SuiTypography
                  component={Link}
                  to="signup"
                  variant="button"
                  textColor="info"
                  fontWeight="medium"
                >
                  Sign up
                </SuiTypography>
              </SuiTypography>
            </SuiBox>
          </SuiBox>
        )}
      </Formik>
    </CoverLayout>
  );
}

export default LoginPage;
