import {
  PROFILE_GET_DATAJOURNAL,
  PROFILE_MODIFIED_DATAJOURNAL,
  PROFILE_DELETE_DATAJOURNAL,
  PROFILE_CLEAN_DATAJOURNAL,
} from './index';

import Auth from '@react-native-firebase/auth';
import Firestore from '@react-native-firebase/firestore';

const HandlerdataList = (data, key) => {
  return async dispatch => {
    dispatch({
      type: PROFILE_GET_DATAJOURNAL,
      data,
      key,
    });
  };
};
const ModiefdataList = (data, key) => {
  return async dispatch => {
    dispatch({
      type: PROFILE_MODIFIED_DATAJOURNAL,
      data,
      key,
    });
  };
};
const deleteDataList = key => {
  return async dispatch => {
    dispatch({
      type: PROFILE_DELETE_DATAJOURNAL,
      key,
    });
  };
};

export const getDataJournal = limit => {
  return async dispatch => {
    Firestore()
      .collection('posts')
      .where('type', '==', 'Journal')
      .where('uid', '==', Auth().currentUser.uid)
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
      type: PROFILE_CLEAN_DATAJOURNAL,
    });
  };
};
