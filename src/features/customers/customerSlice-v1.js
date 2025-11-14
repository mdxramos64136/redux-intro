/** O quê colocar nos slices? initialState | reducer | action Creator*/

const initialStateCustomer = {
  fullName: "",
  nationalID: "",
  createdAt: "",
};

//////////////// custoemrReducer ////////////////
export default function customerReducer(state = initialStateCustomer, action) {
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

//////////// Customer ////////////
export function createCustomer(fullName, customerId) {
  return {
    type: "customer/createCustomer",
    payload: {
      fullName,
      customerId,
      createdAt: new Date().getDate(),
    },
  };
}

export function updateName(fullName) {
  return { type: "customer/updateName", payload: fullName };
}

// store.dispatch(createCustomer("Marcel Ramos", "1234"));
// console.log(store.getState());

// store.dispatch(updateName("Pedro Ramos"));
// console.log(store.getState());
