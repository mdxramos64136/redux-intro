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
  isLoading: false,
};

//NÃO SE ESQUEÇA DE EXPORTAR!!!!
export default function accountReducer(state = initialStateAccount, action) {
  switch (action.type) {
    //  state domain/ event name
    case "account/deposit":
      return {
        ...state,
        balance: state.balance + action.payload,
        isLoading: false,
      };
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
    case "account/convertingCurrency":
      return { ...state, isLoading: true };
    default:
      return state;
  }
}

/** We won't import the ACTION CREATORS below in the store.
  * Instead, they will DISPATCH these actions in the React components
  * (1)If you return a function here, redux knows that it's an async action
    that willbe executed BEFORE dispatch anything to the store.
  * In order to dispatch later dispatch the function, you need to pass the dispatch
  function and the current state (getState) as a parameter.
*/
export function deposit(amount, currency) {
  if (currency === "USD") return { type: "account/deposit", payload: amount };

  //(1)
  return async function (dispatch, getState) {
    dispatch({ type: "account/convertingCurrency", payload: false });
    //API call
    const res = await fetch(
      `https://api.frankfurter.dev/v1/latest?amount=${amount}&from=${currency}&to=USD`
    );

    const data = await res.json();
    console.log(data);

    const converted = data.rates.USD;

    //return the action
    dispatch({ type: "account/deposit", payload: converted });
  };
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
