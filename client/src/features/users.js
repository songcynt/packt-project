import { createSlice } from "@reduxjs/toolkit";
import { editUserById } from "api/UsersAPI";

const initialState = {
  firstName: "", // belongs to currently logged in user
  lastName: "",
  email: "",
  uid: "",
  address: "",
  dateJoined: "",
  isMember: false,
  isAdmin: false,
  loggedIn: false,
  users: {
    // contains array of `user` objects
    /*  firstName: "",
        lastName: "",
        email: "",
        uid: "",
        address: "",
        dateJoined: "",
        isMember: false,
        isAdmin: false,
        loggedIn: false, 
    */
  },
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    /**
     * @param {*} state
     * @param {payload: {firstName: string,
     *          lastName: string,
     *          email: string,
     *          address: string,
     *          dateJoined: string,
     *          isMember: boolean,
     *          isAdmin: boolean,
     *          loggedIn: boolean,
     *          uid: string}} action
     */
    setUser: (state, action) => {
      Object.assign(state, action.payload);
    },
    resetUser: (state, action) => {
      return initialState;
    },
    /**
     * @param {*} state
     * @param {payload: {firstName: string,
     *          lastName: string,
     *          email: string,
     *          address: string,
     *          dateJoined: string,
     *          isMember: boolean,
     *          isAdmin: boolean,
     *          loggedIn: boolean,
     *          id: string}[]} action
     */
    setUsers: (state, action) => {
      const obj = {};
      action.payload.forEach((user) => (obj[user.id] = user));
      Object.assign(state.users, obj);
    },
    /**
     * @param {*} state
     * @param {payload: {userId: number, userObject: userObject}} action
     */
    setUserInUsersById: (state, action) => {
      const obj = {};
      obj[action.payload.userId] = action.payload.userObject;
      Object.assign(state, obj);
    },
    /**
     * @param {*} state
     * @param {payload: {userId: number}} action
     */
    deleteUserFromUsers: (state, action) => {
      delete state.users[action.payload.userId];
    },
  },
});

export const {
  setUser,
  resetUser,
  setUsers,
  setUserInUsersById,
  deleteUserFromUsers,
} = userSlice.actions;

/**
 * @param {*} dispatch redux dispatch fn
 * @param {Promise<{data: obj}>} authfn API call to login/authenticate
 */
export async function setUserFromAPI(
  dispatch,
  authfn,
  successResponse,
  failureResponse
) {
  return authfn()
    .then((response) => {
      if (!("data" in response)) {
        failureResponse();
        return;
      }
      successResponse();

      console.log(response);
      const data = response.data;

      const payload = {
        firstName: data.firstName,
        lastName: data.lastName,
        phoneNumber: data.phoneNumber,
        email: data.email,
        uid: data.id,
        address: data.address,
        dateJoined: data.dateJoined,
        isMember: data.isMember,
        isAdmin: data.isAdmin,
        loggedIn: true,
      };

      dispatch(setUser(payload));
    })
    .catch((e) => {
      console.log(e);
      failureResponse();
    });
}

/**
 * @param {*} dispatch redux dispatch fn
 */
export async function editUser(
  payload,
  dispatch,
  successResponse,
  failureResponse
) {
  const userid = payload.uid;

  console.log("edit user");

  return editUserById(userid, payload)
    .then((response) => {
      if (!response.success) {
        failureResponse();
        return;
      }
      successResponse();

      console.log(response);

      dispatch(setUser(payload));
    })
    .catch((e) => {
      console.log(e);
      failureResponse();
    });
}

/**
 * @param {*} dispatch redux dispatch fn
 * @param {Promise<{data: obj}>} APIfn API call to retreive data
 */
export async function setUsersFromAPI(
  dispatch,
  APIfn,
  successResponse = () => null,
  failureResponse = () => null
) {
  return APIfn()
    .then((response) => {
      if (!("data" in response)) {
        failureResponse();
        return;
      }
      successResponse();

      console.log(response);
      const data = response.data;

      dispatch(setUsers(data));
    })
    .catch((e) => {
      console.log(e);
      failureResponse();
    });
}

export default userSlice.reducer;
