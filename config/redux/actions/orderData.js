import {
  GET_DATAORDER,
  MODIFIED_DATAORDER,
  DELETE_DATAORDER,
  CLEAN_DATAORDER,
} from './index';

import Firestore from '@react-native-firebase/firestore';

const HandlerdataList = (data, key) => {
  return async dispatch => {
    dispatch({
      type: GET_DATAORDER,
      data,
      key,
    });
  };
};
const ModiefdataList = (data, key) => {
  return async dispatch => {
    dispatch({
      type: MODIFIED_DATAORDER,
      data,
      key,
    });
  };
};
const deleteDataList = key => {
  return async dispatch => {
    dispatch({
      type: DELETE_DATAORDER,
      key,
    });
  };
};

export const getDataOrder = limit => {
  return async dispatch => {
    Firestore()
      .collection('posts')
      .where('type', '==', 'Order')
      .limit(limit)
      .onSnapshot(querysnap => {
        querysnap.docChanges().forEach(change => {
          if (change.type === 'added') {
            dispatch(HandlerdataList(change.doc.data(), change.doc.id));
          } else if (change.type === 'modified') {
            dispatch(ModiefdataList(change.doc.data(), change.doc.id));
          } else if (change.type === 'removed') {
            dispatch(deleteDataList(change.doc.id));
          }
        });
      });
  };
};

export const cleanDataJournal = () => {
  return dispatch => {
    dispatch({
      type: CLEAN_DATAORDER,
    });
  };
};
