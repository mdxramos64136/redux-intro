/** WE DON'T DISPATCH ACTION DIRECTLY TO THE REDUCER. WE NEED TO
 * DO IT THROUGH STORE!!!!!
 */

import { combineReducers, createStore } from "redux"; //deprecated. Atualmente se usa redux tool kit

const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};

const initialStateCustomer = {
  fullName: "",
  nationalID: "",
  createdAt: "",
};

// -> The goal of the reducer is to calculate the new state,
// based on the current stante and the received action.
// -> Reducer ARE NOT allow to modify the existing states
// and are not allow to do async logic or other side effect.
// -> Place as much logic as possible inside of them.
// -> One diffence from this recucer and the useReducer hook is
// that we pass directly the initialState as a default state/param
// -> Isso porque O Redux, ao criar a store, sempre chama o reducer
// uma vez sem passar um state (para inicializar).
function accountReducer(state = initialStateAccount, action) {
  switch (action.type) {
    //  state domain/ event name
    case "account/deposit":
      return { ...state, balance: state.balance + action.payload };
    case "account/withdraw":
      return { ...state, balance: state.balance - action.payload };
    case "account/requestLoan":
      // empréstimo só poderá ser realizado se não tiver outro emprestimo
      if (state.loan > 0) return state;
      return {
        ...state,
        loan: action.payload.amount,
        loanPurpose: action.payload.purpose,
        balance: state.balance + action.payload.amount,
      };
    case "account/payLoan":
      return {
        ...state,
        loan: 0,
        loanPurpose: "",
        balance: state.balance - state.loan,
      };

    default:
      return state;
  }
}

//////////////// custoemrReducer ////////////////
function customerReducer(state = initialStateCustomer, action) {
  switch (action.type) {
    case "customer/createCustomer": {
      return {
        ...state,
        fullName: action.payload.fullName,
        nationalID: action.payload.customerId,
        createdAt: action.payload.createdAt,
      };
    }
    case "customer/updateName": {
      return {
        ...state,
        fullName: action.payload,
      };
    }
    default:
      return state;
  }
}

// combine all the reducers:
// use the combineRducers method. In there, create a obj wiht
// meaninfull name
// REDUX is smart enough to know who has the action dispatched
// actiomn account/updateName belongs to accountReducer, while
// customer/createCustomer belongs to customerReducer
const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});

// creating store to dispatch actions
const store = createStore(rootReducer);

//one ACTION CREATOR for each possible action.
// these function returns actions(type, payload)
function deposit(amount) {
  return { type: "account/deposit", payload: amount };
}

function withdraw(amount) {
  return { type: "account/withdraw", payload: amount };
}

function requestLoan(amount, purpose) {
  return {
    type: "account/requestLoan",
    payload: { amount, purpose },
  };
}

function payLoan() {
  return { type: "account/payLoan" };
}

//console.log(store.getState());
//////////// Customer ////////////
function createCustomer(fullName, customerId) {
  return {
    type: "customer/createCustomer",
    payload: {
      fullName,
      customerId,
      createdAt: new Date().getDate(), //Date().toISOString ?
    },
  };
}

function updateName(fullName) {
  return { type: "customer/updateName", payload: fullName };
}

store.dispatch(createCustomer("Marcel Ramos", "1234"));
console.log(store.getState());

store.dispatch(updateName("Pedro Ramos"));
console.log(store.getState());
