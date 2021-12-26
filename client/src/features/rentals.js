import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  /* 
  [rentalid]: { 
        rentalid: "",
        orderDate: "",
        startDate: "",
        expiryDate: "",
        extensionExpiryDate: "",
        returnedDate: "",
        deliveryMethod: "",
        returnMethod: "",
        status: "" 
    }
  */
};

const rentalSlice = createSlice({
  name: "rentals",
  initialState,
  reducers: {
    /**
     * @param {*} state
     * @param {payload: {id: number
     *           orderDate: string
     *           startDate: string
     *           expiryDate: string
     *           extensionExpiryDate: string
     *           returnedDate: string
     *           deliveryMethod: string
     *           returnMethod: string
     *           status: string
     *           createdAt: string
     *           updatedAt: string
     *           userId: string
     *           rentalLocationId: string
     *           returnLocationId: string}[]} action array or rentalObjects
     */
    setRental: (state, action) => {
      const obj = {};
      action.payload.forEach((rental) => (obj[rental.id] = rental));
      Object.assign(state, obj);
    },
    resetRentals: (state, action) => {
      return initialState;
    },
    /**
     * @param {*} state
     * @param {payload: {rentalId: number, rentalObject: rentalObject}} action
     */
    setRentalById: (state, action) => {
      const obj = {};
      obj[action.payload.rentalId] = action.payload.rentalObject;
      Object.assign(state, obj);
    },
    /**
     * @param {*} state
     * @param {payload: {rentalId: number}} action
     */
    deleteRental: (state, action) => {
      delete state[action.payload.rentalId];
    },
  },
});

export const { setRental, resetRentals, setRentalById, deleteRental } =
  rentalSlice.actions;

/**
 * @param {*} dispatch redux dispatch fn
 * @param {Promise<{data: obj}>} APIfn API call to retreive data
 */
export async function setRentalFromAPI(
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

      dispatch(setRental(data));
    })
    .catch((e) => {
      console.log(e);
      failureResponse();
    });
}

export default rentalSlice.reducer;
