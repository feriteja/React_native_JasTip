import React, {useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Button,
  TextInput,
  Image,
  KeyboardAvoidingView,
} from 'react-native';
import {
  Form,
  Textarea,
  Content,
  Container,
  Item,
  Footer,
  FooterTab,
  Header,
  Right,
  Left,
  Picker,
} from 'native-base';

import {connect} from 'react-redux';
import DocumentPicker from 'react-native-document-picker';
import Ionicon from 'react-native-vector-icons/Ionicons';

import {writeJournal} from '../../config/redux/actions/journal';

const postOrder = ({writeJurnal, textKirim}) => {
  const [fileSelected, setFile] = useState();
  const [showPhoto, setPhoto] = useState();
  const [texta, setText] = useState();
  const [harga, setHarga] = useState();
  const [title, setTitle] = useState();

  writeJurnal(texta, fileSelected, harga, title);

  selecFile = async () => {
    try {
      const results = await DocumentPicker.pickMultiple({
        type: [DocumentPicker.types.images],
        //There can me more options as well find above
      });
      let getUri = await results.map(map => {
        return map.uri;
      });
      setPhoto(results);

      setFile(getUri);
      console.log(getUri);

      // writeJurnal(text, fileSelected);

      //Setting the state to show multiple file attributes
    } catch (err) {
      //Handling any exception (If any)
      if (DocumentPicker.isCancel(err)) {
        //If user canceled the document selection
        alert('Canceled from multiple doc picker');
      } else {
        //For Unknown Error
        alert('Unknown Error: ');
        throw err;
      }
    }
  };

  return (
    <Container
      style={{
        flex: 1,
        bottom: 0,
      }}>
      <Content padder>
        <TextInput
          style={{borderBottomWidth: 0.5, borderBottomColor: '#9af'}}
          autoFocus
          multiline
          placeholder="Title"
          onChangeText={e => {
            setTitle(e);
          }}
        />
        <TextInput
          style={{borderBottomWidth: 0.5, borderBottomColor: '#9af'}}
          autoFocus
          multiline
          placeholder="Description"
          onChangeText={e => {
            setText(e);
          }}
        />
        <TextInput
          keyboardType="phone-pad"
          placeholder="Price"
          style={{borderBottomWidth: 0.5, borderBottomColor: '#9af'}}
          onChangeText={e => {
            setHarga(e);
          }}
        />

        <KeyboardAvoidingView
          style={{
            flexDirection: 'row',
            bottom: 0,
            marginTop: 10,
            alignItems: 'center',
          }}
          behavior="padding"
          enabled>
          <TouchableOpacity onPress={() => selecFile()}>
            <Ionicon name="ios-folder" size={30} style={{marginRight: 20}} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicon name="ios-camera" size={35} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{justifyContent: 'flex-end'}}></TouchableOpacity>
        </KeyboardAvoidingView>

        <View style={{flexDirection: 'row'}}>
          {showPhoto &&
            showPhoto.map(map => (
              <View key={map.uri}>
                <Image
                  source={{uri: map.uri}}
                  style={{width: 150, height: 150}}
                />
              </View>
            ))}
        </View>
      </Content>
    </Container>
  );
};

const mapStateToProps = state => ({
  textKirim: state.journalReducer.text,
});

const mapDispatchToProps = dispatch => ({
  writeJurnal: (jurnal, img, harga, title) =>
    dispatch(writeJournal(jurnal, img, harga, title)),
});

export default connect(mapStateToProps, mapDispatchToProps)(postOrder);
