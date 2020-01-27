export default (state = [], action) => {
  switch (action.type) {
    case 'GET_DATAORDER':
      return [...state, {...action.data, key: action.key}];

    case 'MODIFIED_DATAORDER':
      let index = state.findIndex(e => e.key === action.key);
      state[index] = {key: state[index].key, ...action.data};
      return state;

    case 'DELETE_DATAORDER':
      return state.filter(e => e.key !== action.key);

    case 'CLEAN_DATAORDER':
      return [];

    default:
      return state;
  }
};
