import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const contactSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {
    /**
     * @param {*} state
     * @param {payload: {id: number
     *           firstName: string
     *           lastName: string
     *           phoneNumber: string
     *           email: number}[]} action array or contactObjects
     */
    setContact: (state, action) => {
      const obj = {};
      action.payload.forEach((contact) => (obj[contact.id] = contact));
      Object.assign(state, obj);
    },
    resetContacts: (state, action) => {
      return initialState;
    },
    /**
     * @param {*} state
     * @param {payload: {contactId: number, contactObject: contactObject}} action
     */
    setContactById: (state, action) => {
      console.log(action);
      const obj = {};
      obj[action.payload.contactId] = action.payload.contactObject;
      Object.assign(state, obj);
    },
    /**
     * @param {*} state
     * @param {payload: {contactId: number}} action
     */
    deleteContact: (state, action) => {
      delete state[action.payload.contactId];
    },
  },
});

export const { setContact, resetContacts, setContactById, deleteContact } =
  contactSlice.actions;

/**
 * @param {*} dispatch redux dispatch fn
 * @param {Promise<{data: obj}>} APIfn API call to retreive data
 */
export async function setContactFromAPI(
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

      dispatch(setContact(data));
    })
    .catch((e) => {
      console.log(e);
      failureResponse();
    });
}

export default contactSlice.reducer;
