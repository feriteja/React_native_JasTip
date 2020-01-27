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

const postJurnal = ({writeJurnal, textKirim}) => {
  const [fileSelected, setFile] = useState();
  const [showPhoto, setPhoto] = useState();
  const [texta, setText] = useState();

  writeJurnal(texta, fileSelected);

  selectFile = async () => {
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
          placeholder="how was your journey ?"
          onChangeText={e => {
            setText(e);
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
          <TouchableOpacity onPress={() => selectFile()}>
            <Ionicon name="ios-folder" size={30} style={{marginRight: 20}} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicon name="ios-camera" size={35} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{justifyContent: 'flex-end'}}></TouchableOpacity>
        </KeyboardAvoidingView>

        <Content horizontal showsHorizontalScrollIndicator={false}>
          {showPhoto &&
            showPhoto.map(map => (
              <View
                key={map.uri}
                style={{
                  elevation: 2,
                  marginHorizontal: 8,
                  borderWidth: 0.1,
                }}>
                <Image
                  source={{uri: map.uri}}
                  style={{width: 150, height: 150}}
                />
              </View>
            ))}
        </Content>
      </Content>
    </Container>
  );
};

const mapStateToProps = state => ({
  textKirim: state.journalReducer.text,
});

const mapDispatchToProps = dispatch => ({
  writeJurnal: (jurnal, img) => dispatch(writeJournal(jurnal, img)),
});

export default connect(mapStateToProps, mapDispatchToProps)(postJurnal);
