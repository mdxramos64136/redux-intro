/** WE DON'T DISPATCH ACTION DIRECTLY TO THE REDUCER. WE NEED TO
 * DO IT THROUGH STORE!!!!!
 */

import { applyMiddleware, combineReducers, createStore } from "redux"; //deprecated. Atualmente se usa redux tool kit
import customerReducer from "./features/customers/customerSlice";
import accountReducer from "./features/accounts/accountSlice";
import { thunk } from "redux-thunk";

// combine all the reducers:
// use the combineRducers method. In there, create a obj wiht
// meaninfull name
const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});

// creating store to dispatch actions
const store = createStore(rootReducer, applyMiddleware(thunk));

//will will get the store into de application (index.js)
export default store;
