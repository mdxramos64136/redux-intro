import { useSelector } from "react-redux";

function Customer() {
  /* useSelector creates a subscription to the store
   * parameter: callback function.
   * These name must match with the name of the reducer provided
    in rootReducer in the store:
    const rootReducer = combineReducers({
    account: accountReducer,
    customer: customerReducer, <---
  }); 
   * Whenever store changes, then thies component that is 
   subscribed that store will render
   */
  const customer = useSelector((store) => store.customer); // get all states
  const customerName = useSelector((store) => store.customer.fullName);

  //customer.dispatch({ type: "customer/updateName", payload: "Marcel" });
  //console.log(customerName);

  return <h2>👋 Welcome, {customerName}</h2>;
}

export default Customer;
