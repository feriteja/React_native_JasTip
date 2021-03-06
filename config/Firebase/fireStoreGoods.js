import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage, {firebase} from '@react-native-firebase/storage';

class Fire {
  addPost = async (title, type, caption, localUri = [], harga) => {
    const remoteUri = await this.uploadPhotoAsync(localUri);

    return new Promise((res, rej) => {
      firestore()
        .collection('posts')
        .add({
          title,
          displayname: this.displaynameUser,
          caption,
          type,
          uid: this.uid,
          timestamp: this.timestamp,
          image: remoteUri,
          harga,
          photoProf: this.photoProfileUser,
        })
        .then(ref => {
          res('success put order');
        })
        .catch(error => {
          rej(error);
        });
    });
  };

  uploadPhotoAsync = async (uris = []) => {
    // const
    let cobaPromall = Promise.all(
      uris.map(s => {
        return fetch(s).then(x => {
          return x.blob();
        });
      }),
    ).then(z => {
      return z;
    });

    const getfullPaths = new Promise(async (res, rej) => {
      let getFile = await cobaPromall;

      let Fullpath = Promise.all(
        getFile.map((fileSend, index) => {
          const path = `photos/${this.uid}/${Date.now() + index}.jpg`;
          return firebase
            .storage()
            .ref(path)
            .put(fileSend)
            .then(nama => {
              return nama.metadata.fullPath;
            })
            .catch(err => rej(err));
        }),
      ).then(data => {
        return data;
      });

      res(Fullpath);
      rej('gagal');
    });

    return new Promise(async (res, rej) => {
      try {
        const fullPath = await getfullPaths;

        let getDownloadURL = Promise.all(
          fullPath.map(path => {
            return storage()
              .ref(path)
              .getDownloadURL();
          }),
        ).then(data => {
          return data;
        });

        res(getDownloadURL);
      } catch (error) {
        rej(error);
      }
    });
  };

  get uid() {
    return (auth().currentUser || {}).uid;
  }
  get displaynameUser() {
    return auth().currentUser.displayName;
  }
  get photoProfileUser() {
    return auth().currentUser.photoURL;
  }

  get timestamp() {
    return Date.now();
  }
}

Fire.execution = new Fire();
export default Fire;
