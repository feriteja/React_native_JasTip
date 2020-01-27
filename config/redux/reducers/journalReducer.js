export default (state = '', action) => {
  switch (action.type) {
    case 'WRITE_JOURNAL':
      return {
        text: action.state,
        img: action.img,
        harga: action.harga,
        title: action.title,
      };

    case 'CLEAN_JOURNAL':
      return (state = '');

    default:
      return state;
  }
};
