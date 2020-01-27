export default (state = [], action) => {
  switch (action.type) {
    case 'GET_DATAJOURNAL':
      return [...state, {...action.data, key: action.key}];

    case 'MODIFIED_DATAJOURNAL':
      let index = state.findIndex(e => e.key === action.key);
      state[index] = {key: state[index].key, ...action.data};
      return state;

    case 'DELETE_DATAJOURNAL':
      return state.filter(e => e.key !== action.key);

    case 'CLEAN_DATAJOURNAL':
      return [];

    default:
      return state;
  }
};
