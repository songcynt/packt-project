import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const automatedMessageSlice = createSlice({
  name: "automatedMessages",
  initialState,
  reducers: {
    /**
     * @param {*} state
     * @param {payload: {id: number
     *           message: string
     *           eventType: string
     *           dateThresholdType: string
     *           dateThreshold: number}[]} action array or automatedMessageObjects
     */
    setAutomatedMessage: (state, action) => {
      const obj = {};
      action.payload.forEach(
        (automatedMessage) => (obj[automatedMessage.id] = automatedMessage)
      );
      Object.assign(state, obj);
    },
    resetAutomatedMessages: (state, action) => {
      return initialState;
    },
    /**
     * @param {*} state
     * @param {payload: {automatedMessageId: number, automatedMessageObject: automatedMessageObject}} action
     */
    setAutomatedMessageById: (state, action) => {
      console.log(action);
      const obj = {};
      obj[action.payload.automatedMessageId] =
        action.payload.automatedMessageObject;
      Object.assign(state, obj);
    },
    /**
     * @param {*} state
     * @param {payload: {automatedMessageId: number}} action
     */
    deleteAutomatedMessage: (state, action) => {
      delete state[action.payload.automatedMessageId];
    },
  },
});

export const {
  setAutomatedMessage,
  setAutomatedMessageById,
  deleteAutomatedMessage,
  resetAutomatedMessages,
} = automatedMessageSlice.actions;

/**
 * @param {*} dispatch redux dispatch fn
 * @param {Promise<{data: obj}>} APIfn API call to retreive data
 */
export async function setAutomatedMessageFromAPI(
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

      dispatch(setAutomatedMessage(data));
    })
    .catch((e) => {
      console.log(e);
      failureResponse();
    });
}

export default automatedMessageSlice.reducer;
