import {WRITE_JOURNAL, CLEAN_JOURNAL} from './index';

export const writeJournal = (text, img, harga, title) => {
  return dispatch => {
    dispatch({
      type: WRITE_JOURNAL,
      state: text,
      img: img,
      harga,
      title,
    });
  };
};
export const deleteJournal = () => {
  return dispatch => {
    dispatch({
      type: CLEAN_JOURNAL,
    });
  };
};
