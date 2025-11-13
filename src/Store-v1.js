import { createStore } from "redux"; //deprecated. Atualmente se usa redux tool kit

const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
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
// -> Default return the original state in case reducer recieves an
// action that it doesn't know about it will return the original
// state back. State won't be updated but it won't return an error..
function reducer(state = initialState, action) {
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
    /** */
    default:
      return state;
  }
}

// creating store to dispatch actions
const store = createStore(reducer);

// store.dispatch({ type: "account/deposit", payload: 500 });

console.log("Hey Redux");
// getState has the ACTUTAL state (VALUES)  of the store
console.log(store.getState());

store.dispatch({ type: "account/withdraw", payload: 200 });
console.log(store.getState());

store.dispatch({
  type: "account/requestLoan",
  payload: { amount: 1000, purpose: "Buy a car" },
});
console.log(store.getState());

// There isn't a payload in the action below because that type resets
// the loan back to 0
store.dispatch({ type: "account/payLoan" });
console.log(store.getState());

//one ACTION CREATORS for each possible action.
// function that returns actions(type, payload)
function deposit(amount) {
  return { type: "account/withdraw", payload: amount }; // action
}

function withdraw() {}
function requestLoan() {}
function payLoan() {}

//instead of call store.dispatch({ type: "account/deposit", payload: 500 });
//We just call store.dispatch(nameOfFunction)
store.dispatch(deposit(500));
//console.log(store.getState());

/** Action Stores:
 * funções que retorna actions : (type: ..., payload:xxx)
 * Primeiro crie a função.
 * Em seguida store.dispatch(função que contém a action)
 */
