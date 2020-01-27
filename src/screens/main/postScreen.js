import React, {Component} from 'react';
import {Text, StyleSheet, View, TouchableOpacity} from 'react-native';
import {RNCamera} from 'react-native-camera';
import {PERMISSIONS, request, check, RESULTS} from 'react-native-permissions';
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
import PostJurnal from '../../component/postJournal';
import PostOrder from '../../component/postOrder';

import {deleteJournal} from '../../../config/redux/actions/journal';

import firestoreJournal from '../../../config/Firebase/fireStoreJournal';
import fireStoreGoods from '../../../config/Firebase/fireStoreGoods';

class postScreen extends Component {
  state = {
    postType: 'Journal',
    permissionStats: {},
  };
  componentDidMount() {
    this.askPermission();
  }

  postAct = async () => {
    if (this.state.postType === 'Journal') {
      firestoreJournal.execution
        .addPost(
          this.state.postType,
          this.props.dataKirim.text,
          this.props.dataKirim.img,
        )
        .then(() => {
          this.props.deleteJournal();
          this.props.navigation.navigate('home');
        })
        .catch(e => console.log(e));
    } else if (this.state.postType === 'Order') {
      fireStoreGoods.execution
        .addPost(
          this.props.dataKirim.title,
          this.state.postType,
          this.props.dataKirim.text,
          this.props.dataKirim.img,
          this.props.dataKirim.harga,
        )
        .then(() => {
          this.props.deleteJournal();
          this.props.navigation.navigate('productCart');
        })
        .catch(e => console.log(e));
    }
  };

  askPermission = async () => {
    const checkCamera = await check(PERMISSIONS.ANDROID.CAMERA);
    const checkStorage = await check(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);

    switch (checkCamera) {
      case RESULTS.GRANTED:
        console.log('camera ok');
        break;
      case RESULTS.BLOCKED:
        alert("can't use camera");
        break;
      case RESULTS.UNAVAILABLE:
        try {
          await request(PERMISSIONS.ANDROID.CAMERA);
        } catch (error) {
          alert(error);
        }
        break;
      case RESULTS.DENIED:
        alert("can't use camera");
        break;
    }

    switch (checkStorage) {
      case RESULTS.GRANTED:
        console.log('camera ok');
        break;
      case RESULTS.BLOCKED:
        alert("can't use camera");
        break;
      case RESULTS.UNAVAILABLE:
        try {
          await request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
        } catch (error) {
          alert(error);
        }
        break;
      case RESULTS.DENIED:
        alert("can't use camera");
        break;
    }

    this.setState({permissionStats: {checkCamera, checkStorage}});
  };

  render() {
    const {deleteJournal} = this.props;
    // console.log(this.state.permissionStats);
    return (
      <Container>
        <Header transparent style={{height: 80, marginRight: 15}}>
          <Left>
            <Form>
              <Picker
                note
                mode="dropdown"
                style={{width: 120}}
                selectedValue={this.state.postType}
                onValueChange={(itemValue, itemIndex) => {
                  this.setState({postType: itemValue});
                  deleteJournal();
                }}>
                <Picker.Item label="Journal" value="Journal" />
                <Picker.Item label="Order" value="Order" />
              </Picker>
            </Form>
          </Left>
          <Right>
            <TouchableOpacity onPress={() => this.postAct()}>
              <Text style={{fontSize: 17, color: '#aaa'}}>POST</Text>
            </TouchableOpacity>
          </Right>
        </Header>

        {this.state.postType === 'Order' ? <PostOrder /> : <PostJurnal />}
      </Container>
    );
  }
}

const styles = StyleSheet.create({});

const mapStateToProps = state => ({
  dataKirim: state.journalReducer,
});

const mapDispatchToProps = disatch => ({
  deleteJournal: () => disatch(deleteJournal()),
});

export default connect(mapStateToProps, mapDispatchToProps)(postScreen);
