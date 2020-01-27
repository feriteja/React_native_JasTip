export default function(state = 0, action) {
  switch (action.type) {
    case 'GET_ITEMCOUNT':
      return action.count;

    default:
      return state;
  }
}
