import React, { useState, useEffect } from "react";
import SuiBox from "components/sui-components/SuiBox";
import SuiTypography from "components/sui-components/SuiTypography";
import SuiInput from "components/sui-components/SuiInput";
import SuiButton from "components/sui-components/SuiButton";
import Grid from "@mui/material/Grid";
import {
  triggerSuccessNotification,
  triggerFailureNotification,
} from "notifications";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

import BasicCard from "components/BasicCard";

import { Formik } from "formik";
import * as Yup from "yup";

import cloneDeep from "lodash/cloneDeep";

import { useSelector, useDispatch } from "react-redux";
import { editUser } from "features/users";

function ProfileCard() {
  const [editMode, setEditMode] = useState(false);

  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user);

  const labels = [
    "Name",
    "Email Address",
    "Address",
    "Phone Number",
    "Account Type",
  ];

  const accountType = userInfo.isAdmin
    ? "Admin"
    : userInfo.isMember
    ? "Member"
    : "N/A";

  const _or_empty_string = (value) => (value ? value : "");

  const values = [
    `${_or_empty_string(userInfo.firstName)} ${_or_empty_string(
      userInfo.lastName
    )}`,
    userInfo.email,
    userInfo.address,
    userInfo.phoneNumber,
    accountType,
  ];

  const validationSchema = Yup.object().shape({
    email: Yup.string(),
    firstName: Yup.string(),
    lastName: Yup.string(),
    address: Yup.string(),
  });

  const initialValues = {
    address: _or_empty_string(userInfo.address),
    email: _or_empty_string(userInfo.email),
    firstName: _or_empty_string(userInfo.firstName),
    lastName: _or_empty_string(userInfo.lastName),
  };

  function toggleEditMode() {
    setEditMode(!editMode);
  }

  async function handleFormSubmit(values) {
    console.log(values);

    const failureResponse = () =>
      triggerFailureNotification(
        "Unable to update profile information",
        "Failed to update profile information, please try again later"
      );
    const successResponse = () => {
      triggerSuccessNotification(
        "Successfully updated profile information",
        "You have successfully updated your profile information"
      );

      toggleEditMode();
    };

    const userInfoClone = cloneDeep(userInfo);

    const payload = Object.assign(userInfoClone, {
      uid: userInfo.uid,
      address: values.address,
      email: values.email,
      firstName: values.firstName,
      lastName: values.lastName,
    });

    await editUser(payload, dispatch, successResponse, failureResponse);
  }

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

  const renderForm = (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleFormSubmit}
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
          {/* FIRST NAME */}
          <SuiBox mb={2}>
            <SuiBox mb={1} ml={0.5}>
              <SuiTypography
                component="label"
                variant="caption"
                fontWeight="bold"
              >
                First Name
              </SuiTypography>
            </SuiBox>
            <SuiInput
              type="text"
              placeholder="Jane"
              name="firstName"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.firstName}
            />
            <SuiTypography variant="caption" textColor="error">
              {errors.firstName && touched.firstName && errors.firstName}
            </SuiTypography>
          </SuiBox>

          {/* LAST NAME */}
          <SuiBox mb={2}>
            <SuiBox mb={1} ml={0.5}>
              <SuiTypography
                component="label"
                variant="caption"
                fontWeight="bold"
              >
                Last Name
              </SuiTypography>
            </SuiBox>
            <SuiInput
              type="text"
              placeholder="Doe"
              name="lastName"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.lastName}
            />
            <SuiTypography variant="caption" textColor="error">
              {errors.lastName && touched.lastName && errors.lastName}
            </SuiTypography>
          </SuiBox>

          {/* EMAIL ADDRESS */}
          <SuiBox mb={2}>
            <SuiBox mb={1} ml={0.5}>
              <SuiTypography
                component="label"
                variant="caption"
                fontWeight="bold"
              >
                Email Address
              </SuiTypography>
            </SuiBox>
            <SuiInput
              type="email"
              placeholder="jane.doe@email.com"
              name="email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
            />
            <SuiTypography variant="caption" textColor="error">
              {errors.email && touched.email && errors.email}
            </SuiTypography>
          </SuiBox>

          {/* ADDRESS */}
          <SuiBox mb={2}>
            <SuiBox mb={1} ml={0.5}>
              <SuiTypography
                component="label"
                variant="caption"
                fontWeight="bold"
              >
                Address
              </SuiTypography>
            </SuiBox>

            <SuiInput
              type="text"
              placeholder="10 Foobar Lane, Toronto, ON, Canada, A1B 2C3"
              name="address"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.address}
            />
            <SuiTypography variant="caption" textColor="error">
              {errors.address && touched.address && errors.address}
            </SuiTypography>
          </SuiBox>

          {/* PHONE NUMBER */}
          {/* <SuiBox mb={2}>
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
              disabled
              type="tel"
              placeholder="Phone Number"
              name="phoneNumber"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.phoneNumber}
            />
            <SuiTypography variant="caption" textColor="error">
              {errors.phoneNumber && touched.phoneNumber && errors.phoneNumber}
            </SuiTypography>
          </SuiBox> */}

          {/* PASSWORD */}
          {/* <SuiBox mb={2}> */}
          {/*  <SuiTypography
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
          </SuiBox> */}
          <Grid container direction="row" spacing={2} justifyContent="flex-end">
            <Grid item>
              <SuiBox mt={4} mb={1}>
                <SuiButton
                  type="reset"
                  buttonColor="error"
                  fullWidth
                  onClick={toggleEditMode}
                >
                  Cancel
                </SuiButton>
              </SuiBox>
            </Grid>
            <Grid item>
              <SuiBox mt={4} mb={1}>
                <SuiButton type="submit" buttonColor="info" fullWidth>
                  Save Changes
                </SuiButton>
              </SuiBox>
            </Grid>
          </Grid>
        </SuiBox>
      )}
    </Formik>
  );

  return (
    <BasicCard
      title={"Profile"}
      editOnClick={toggleEditMode}
    >
      {editMode ? renderForm : renderItems}
    </BasicCard>
  );
}

export default ProfileCard;
