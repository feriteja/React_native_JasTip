import Firestore from '@react-native-firebase/firestore';
import Auth from '@react-native-firebase/auth';

class myOrderHandler {
  addToBucket = (key, harga) => {
    return new Promise((res, rej) => {
      Firestore()
        .collection('userInfo')
        .doc(this.userUid)
        .collection('myOrder')
        .doc(key)
        .set({
          key,
          harga: parseInt(harga),
        })
        .then(() => res('ok'))
        .catch(e => rej(e));
    });
  };

  setQuantityBucket = (key, quantity) => {
    return new Promise((res, rej) => {
      Firestore()
        .collection('userInfo')
        .doc(this.userUid)
        .collection('myOrder')
        .doc(key)
        .set({
          quantity,
        })
        .then(() => res('ok'))
        .catch(e => rej(e));
    });
  };

  get userUid() {
    return Auth().currentUser.uid;
  }
}

myOrderHandler.execution = new myOrderHandler();

export default myOrderHandler;
