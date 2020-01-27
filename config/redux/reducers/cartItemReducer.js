export default (state = [], action) => {
  switch (action.type) {
    case 'GET_CARTITEM':
      return [...state, {...action.data, key: action.key, quantity: 1}];

    case 'QUANTITY_CART':
      let indexplus = state.findIndex(e => e.key === action.key);
      state[indexplus] = {...state[indexplus], quantity: action.quantity};
      return state;
    // case 'QUANTITY_CARTMIN':
    //   let indexmin = state.findIndex(e => e.key === action.key);
    //   state[indexmin] = {quantity: state[indexmin].quantity - 1, ...state};
    //   return state;

    case 'DELETE_CARTITEM':
      return state.filter(e => e.key !== action.key);

    case 'GET_INFOITEM':
      let indexdata = state.findIndex(e => e.key === action.key);
      state[indexdata] = {...state[indexdata], harga: action.data};
      return state;

    case 'CLEAN_CART':
      return [];

    default:
      return state;
  }
};
