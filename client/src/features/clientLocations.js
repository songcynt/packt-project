import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const clientLocationSlice = createSlice({
  name: "clientLocations",
  initialState,
  reducers: {
    /**
     * @param {*} state
     * @param {payload: {id: number
     *           address: string
     *           isPrimaryLocation: bool
     *           email: string
     *           phoneNumber: string}[]} action array or clientLocationObjects
     */
    setClientLocation: (state, action) => {
      const obj = {};
      action.payload.forEach(
        (clientLocation) => (obj[clientLocation.id] = clientLocation)
      );
      Object.assign(state, obj);
    },
    resetClientLocations: (state, action) => {
      return initialState;
    },
    /**
     * @param {*} state
     * @param {payload: {clientLocationId: number, clientLocationObject: clientLocationObject}} action
     */
    setClientLocationById: (state, action) => {
      console.log(action);
      const obj = {};
      obj[action.payload.clientLocationId] =
        action.payload.clientLocationObject;
      Object.assign(state, obj);
    },
    /**
     * @param {*} state
     * @param {payload: {clientLocationId: number}} action
     */
    deleteClientLocation: (state, action) => {
      delete state[action.payload.clientLocationId];
    },
  },
});

export const {
  setClientLocation,
  setClientLocationById,
  deleteClientLocation,
  resetClientLocations,
} = clientLocationSlice.actions;

/**
 * @param {*} dispatch redux dispatch fn
 * @param {Promise<{data: obj}>} APIfn API call to retreive data
 */
export async function setClientLocationFromAPI(
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

      dispatch(setClientLocation(data));
    })
    .catch((e) => {
      console.log(e);
      failureResponse();
    });
}

export default clientLocationSlice.reducer;
