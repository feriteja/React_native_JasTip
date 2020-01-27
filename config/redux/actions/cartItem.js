import {
  GET_CARTITEM,
  GET_INFOITEM,
  GET_ITEMCOUNT,
  DELETE_CARTITEM,
  CLEAN_CART,
  QUANTITY_CART,
} from './index';

import Firestore from '@react-native-firebase/firestore';

const handlerDataCart = (data, key) => {
  return dispatch => {
    dispatch({
      type: GET_CARTITEM,
      data,
      key,
    });
  };
};

export const getDataCart = uid => {
  return dispatch => {
    Firestore()
      .collection('userInfo')
      .doc(uid)
      .collection('myOrder')
      .onSnapshot(querysnap => {
        dispatch({type: GET_ITEMCOUNT, count: querysnap.docs.length});

        querysnap.docChanges().forEach(change => {
          if (change.type === 'added') {
            dispatch(handlerDataCart(change.doc.data(), change.doc.id));
          } else if (change.type === 'removed') {
            dispatch({type: DELETE_CARTITEM, key: change.doc.id});
          }
        });
      });
  };
};

export const getInfoItem = (key, data) => ({
  type: GET_INFOITEM,
  key,
  data,
});

export const updateQuantityCart = (key, quantity) => {
  return dispatch => {
    dispatch({
      type: QUANTITY_CART,
      key,
      quantity,
    });
  };
};

export const cleanCart = () => ({
  type: CLEAN_CART,
});

export const deleteDataCart = (key, uid) => {
  return dispatch => {
    Firestore()
      .collection('userInfo')
      .doc(uid)
      .collection('myOrder')
      .doc(key)
      .delete();
  };
};
