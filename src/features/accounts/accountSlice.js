/* O quê colocar nos slices? initialState | reducer | action Creator
 * slice is a piece/ part of the total state.
 * ADAPTING TO REDUX TOOLKIT
 * With CREATESLICE imported from tool kit:
   - actionCreater are auto created from reducers
   - write reducers are easier because we no longer need switch statements
   and defaut case are automatic hadled
   - We can now mutate states inside the reducers
 */

import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
  isLoading: false,
};

//object functions that recieves the options:
//it also requires one reducer to each action ins there(account/deposist, account/deposist etc...)
//reducers: deposit(state, action): state is the current state and the
// is the action sent that contains the payload.
//Remember: now you can change states inside the reducer
//we need the preapare() method to prepare data as we can't
//receive 2 params in redux
const accountSlice = createSlice({
  name: "account", // name of the slice
  initialState, // same name so dont't repeat: initialState: initialState
  reducers: {
    deposit(state, action) {
      state.balance = state.balance + action.payload;
    },
    withdraw(state, action) {
      state.balance -= action.payload;
    },

    requestLoan: {
      prepare(amount, purpose) {
        //return a new obj that will then become the payloadobj in the reducer
        return {
          payload: { amount, purpose },
        };
      },
      reducer(state, action) {
        if (state.loan > 0) return;
        state.loan += action.payload.amount;
        state.balance += action.payload.amount;
        state.loanPurpose = action.payload.purpose;
      },
    },

    payLoan(state, action) {
      state.balance -= state.loan;
      state.loan = 0;
      state.loanPurpose = "";
    },
  },
});

console.log(accountSlice);

export default accountSlice.reducer;
//here we are destructuring the objet that contains many item like
//acion, reducer, EventCounts. Check it out through console.log(accountSlice);
export const { deposit, payLoan, withdraw, requestLoan } = accountSlice.actions;
console.log(requestLoan(300, "fdfdfd"));
