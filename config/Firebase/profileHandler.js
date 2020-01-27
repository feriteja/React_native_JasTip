import Auth from '@react-native-firebase/auth';
import Firestore from '@react-native-firebase/firestore';
import Storage, {firebase} from '@react-native-firebase/storage';

class profileHandler {
  updateProfile = async (nameEdit, photoURL) => {
    return new Promise((res, rej) => {
      Auth()
        .currentUser.updateProfile({
          displayName: nameEdit,
          photoURL,
        })
        .then(() => res('ok'))
        .catch(e => rej(e));
    });
  };

  uploadPhoto = async uri => {
    let fetchUri = await fetch(uri);
    let blobUri = await fetchUri.blob();

    const path = `photos/${this.uid}/fotoProfile.jpg`;

    const getFullPath = new Promise((res, rej) => {
      Storage()
        .ref(path)
        .put(blobUri)
        .then(fullPath => res(fullPath.metadata.fullPath))
        .catch(e => rej(e));
    });

    return new Promise(async (res, rej) => {
      try {
        let pathFoto = await getFullPath;
        let getDownloadURL = await Storage()
          .ref(pathFoto)
          .getDownloadURL();
        res(getDownloadURL);
      } catch (error) {
        rej('no url', error);
      }
    });
  };

  updateProfileDB = async (uri, name, caption, address) => {
    let picURL = await this.uploadPhoto(uri);
    return new Promise((res, rej) =>
      Firestore()
        .collection('userInfo')
        .doc(this.uid)
        .set({
          name,
          photoProfileUser: picURL,
          uid: this.uid,
          caption,
          address,
        })
        .then(() => res('ok'))
        .catch(e => rej(e)),
    );
  };

  updateLogin = async () => {
    Firestore()
      .collection('userInfo')
      .doc(this.uid)
      .set({
        lastLogin: this.timestamp,
      });
  };

  get timestamp() {
    return Date.now();
  }

  get uid() {
    return (Auth().currentUser || {}).uid;
  }
}

profileHandler.execution = new profileHandler();
export default profileHandler;
