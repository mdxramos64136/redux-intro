/** ==> CONVERTING TO REDUX TOOLKIT <==
 * Note how many import was deleted.
 * That's beacause configureStore does a lot of thing autom for us: 
  - automatically combine the reducers,
  - auto add thunks middleware, and 
  - auto set up developer tools.

 * WE DON'T DISPATCH ACTION DIRECTLY TO THE REDUCER. WE NEED TO
 * DO IT THROUGH STORE!!!!!
 */

//Instead ousing createStore, we now will use
import { configureStore } from "@reduxjs/toolkit";
import customerReducer from "./features/customers/customerSlice";
import accountReducer from "./features/accounts/accountSlice";

const store = configureStore({
  reducer: {
    account: accountReducer,
    customer: customerReducer,
  },
});

//will will get the store into de application (index.js)
export default store;
