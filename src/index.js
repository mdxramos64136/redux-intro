import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import store from "./Store";
import { Provider } from "react-redux";
import { createCustomer } from "./features/customers/customerSlice";

// store.dispatch(createCustomer("Marcel Ramos", 122345));
// console.log(store.getState());

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
