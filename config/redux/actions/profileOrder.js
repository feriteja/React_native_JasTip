import {
  PROFILE_GET_DATAORDER,
  PROFILE_MODIFIED_DATAORDER,
  PROFILE_CLEAN_DATAORDER,
  PROFILE_DELETE_DATAORDER,
} from './index';

import Firestore from '@react-native-firebase/firestore';

const HandlerdataList = (data, key) => {
  return async dispatch => {
    dispatch({
      type: PROFILE_GET_DATAORDER,
      data,
      key,
    });
  };
};
const ModiefdataList = (data, key) => {
  return async dispatch => {
    dispatch({
      type: PROFILE_MODIFIED_DATAORDER,
      data,
      key,
    });
  };
};
const deleteDataList = key => {
  return async dispatch => {
    dispatch({
      type: PROFILE_DELETE_DATAORDER,
      key,
    });
  };
};

export const getDataJournal = limit => {
  return async dispatch => {
    Firestore()
      .collection('posts')
      .where('type', '==', 'Order')
      .limit(limit)
      .onSnapshot(querysnap => {
        querysnap.docChanges().forEach(change => {
          if (change.type === 'added') {
            dispatch(HandlerdataList(change.doc.data(), change.doc.id));
            console.log(change.doc.data());
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
      type: PROFILE_CLEAN_DATAORDER,
    });
  };
};
