import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const clientSlice = createSlice({
  name: "clients",
  initialState,
  reducers: {
    /**
     * @param {*} state
     * @param {payload: {id: number
     *           name: string
     *           dateJoined: string
     *           email: string
     *           phoneNumber: string
     *           primaryContactId: number
     *           secondaryContactId: number}[]} action array or clientObjects
     */
    setClient: (state, action) => {
      const obj = {};
      action.payload.forEach((client) => (obj[client.id] = client));
      Object.assign(state, obj);
    },
    resetClients: (state, action) => {
      return initialState;
    },
    /**
     * @param {*} state
     * @param {payload: {clientId: number, clientObject: clientObject}} action
     */
    setClientById: (state, action) => {
      console.log(action);
      const obj = {};
      obj[action.payload.clientId] = action.payload.clientObject;
      Object.assign(state, obj);
    },
    /**
     * @param {*} state
     * @param {payload: {clientId: number}} action
     */
    deleteClient: (state, action) => {
      delete state[action.payload.clientId];
    },
  },
});

export const { setClient, resetClients, setClientById, deleteClient } =
  clientSlice.actions;

/**
 * @param {*} dispatch redux dispatch fn
 * @param {Promise<{data: obj}>} APIfn API call to retreive data
 */
export async function setClientFromAPI(
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

      const data = response.data;

      dispatch(setClient(data));
    })
    .catch((e) => {
      console.log(e);
      failureResponse();
    });
}

export default clientSlice.reducer;
