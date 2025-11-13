/* O quê colocar nos slices? initialState | reducer | action Creator
 * slice is a piece/ part of the total state.
The entire state lives in the store 
 * Here we put as much as possible logic.

the entire state lives in the StorageEvent. 
Here we just a part of the eentire state.

 

*/

const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};

//NÃO SE ESQUEÇA DE EXPORTAR!!!!
export default function accountReducer(state = initialStateAccount, action) {
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

// We won't import the ACTIO CREATORS below in the store.
// Instead, they will DISPATCH these actions in the React components
export function deposit(amount) {
  return { type: "account/deposit", payload: amount };
}

export function withdraw(amount) {
  return { type: "account/withdraw", payload: amount };
}

export function requestLoan(amount, purpose) {
  return {
    type: "account/requestLoan",
    payload: { amount, purpose },
  };
}

export function payLoan() {
  return { type: "account/payLoan" };
}

//console.log(store.getState());
