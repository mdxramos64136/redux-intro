/** O quê colocar nos slices? initialState | reducer | action Creator*/
import { createSlice } from "@reduxjs/toolkit";

const initialStateCustomer = {
  fullName: "",
  nationalID: "",
  createdAt: "",
};

console.log(initialStateCustomer);

//Observaçao: o nome das propriedades devem ser extamente estes:name, initialState etc...)
const customerSlice = createSlice({
  name: "customer",
  initialState: initialStateCustomer,
  reducers: {
    createCustomer: {
      prepare(fullName, customerId) {
        return {
          //side effects and calculations must be here
          payload: { fullName, customerId, createdAt: new Date().getDate },
        };
      },
      reducer(state, action) {
        state.fullName = action.payload.fullName;
        state.nationalID = action.payload.customerId;
        state.createdAt = action.payload.createdAt;
      },
    },

    updateCustomer(state, action) {
      state.fullName = action.fullName;
    },
  },
});

export default customerSlice.reducer;
export const { updateCustomer, createCustomer } = customerSlice.actions;

console.log(customerSlice);
