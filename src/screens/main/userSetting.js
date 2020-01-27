import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import Auth from '@react-native-firebase/auth';
import Firestore from '@react-native-firebase/firestore';

import profileHandler from '../../../config/Firebase/profileHandler';

export default class UserSetting extends Component {
  state = {
    nameEdit: Auth().currentUser.displayName,
    caption: this.props.navigation.getParam('caption', {caption: ''}),
    photoURL: this.props.navigation.getParam('photoURL', {photoURL: ''}),
    address: '',
  };

  selectFile = async () => {
    try {
      const imageProf = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });
      this.setState({photoURL: imageProf.uri});
    } catch (error) {}
  };

  profileHandler = async () => {
    const profileUpdate = await profileHandler.execution.updateProfile(
      this.state.nameEdit,
      this.state.photoURL,
    );
    const captionUpdate = await profileHandler.execution.updateProfileDB(
      this.state.photoURL,
      this.state.nameEdit,
      this.state.caption,
      this.state.address,
    );

    if (profileUpdate === 'ok' && captionUpdate === 'ok') {
      this.props.navigation.navigate('profile');
    } else if (profileUpdate === 'ok' && captionUpdate !== 'ok') {
      alert('failed to update caption');
    } else if (profileUpdate !== 'ok' && captionUpdate === 'ok') {
      alert('failed to update name/foto');
    } else if (profileUpdate !== 'ok' && captionUpdate !== 'ok') {
      alert('failed to update ');
    }
  };

  render() {
    return (
      <View style={{flex: 1}}>
        <View style={styles.bag1}>
          <TouchableOpacity
            style={{position: 'relative'}}
            onPress={this.selectFile}>
            <Image
              source={{uri: this.state.photoURL}}
              style={{
                height: 140,
                width: 140,
                borderRadius: 40,
              }}
            />
            <View style={styles.badgePlus}>
              <Text>+</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.forms}>
          <TextInput
            value={this.state.nameEdit}
            style={styles.textInput}
            onChangeText={e => this.setState({nameEdit: e})}
          />
          <TextInput
            multiline
            style={styles.textInput}
            value={this.state.caption}
            onChangeText={e => this.setState({caption: e})}
          />
          <TextInput
            multiline
            style={styles.textInput}
            // value={this.state.address}
            placeholder={'your address'}
            onChangeText={e => this.setState({address: e})}
          />
          <TouchableOpacity
            onPress={() => this.profileHandler()}
            style={styles.btnUpdate}>
            <Text>UPDATE</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  bag1: {
    marginVertical: 10,
    marginHorizontal: 20,
    marginTop: 100,
    alignItems: 'center',
    // backgroundColor: '#af9af9',
  },
  badgePlus: {
    height: 35,
    width: 35,
    borderRadius: 50,
    backgroundColor: '#92f',
    alignSelf: 'center',
    bottom: 0,
    right: 10,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
  },
  forms: {
    // backgroundColor: '#f9abaa',
    marginVertical: 10,
    marginHorizontal: 20,
  },
  textInput: {
    borderBottomColor: '#999',
    borderBottomWidth: 0.2,
    marginVertical: 5,
  },
  btnUpdate: {
    backgroundColor: '#25aff5aa',
    padding: 18,
    alignItems: 'center',
    borderRadius: 10,
    margin: 10,
  },
});
