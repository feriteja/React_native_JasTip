import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  StatusBar,
  Button,
} from 'react-native';
import {
  Header,
  Right,
  Body,
  Left,
  Content,
  Container,
  List,
  ListItem,
  Text,
} from 'native-base';
import Auth from '@react-native-firebase/auth';

import Firestore from '@react-native-firebase/firestore';
import Ionicon from 'react-native-vector-icons/Ionicons';

import ProfilNav from '../../../config/Router/profileNav';

import Storage from '@react-native-firebase/storage';

export default class profile extends Component {
  state = {
    caption: '',
    fotoURL: null,
    dummyData: [
      {dataA: 'good1', dataB: 'nice1', key: 'a'},
      {dataA: 'good2', dataB: 'nice2', key: 'b'},
      {dataA: 'good3', dataB: 'nice3', key: 'c'},
      {dataA: 'good4', dataB: 'nice4', key: 'aa'},
      {dataA: 'good5', dataB: 'nice5', key: 'av'},
      {dataA: 'good6', dataB: 'nice6', key: 'af'},
    ],
  };

  DataCaption = () => {
    Firestore()
      .collection('userInfo')
      .doc(Auth().currentUser.uid)
      .onSnapshot(change => {
        if (change.exists) {
          this.setState({
            caption: change.data().caption,
          });
          this.setState({fotoURL: change.data().photoProfileUser});
        }
      });
  };

  componentDidMount() {
    this.DataCaption();
    // this.userfoto();
  }

  get downloadURL() {
    return Storage()
      .ref(Auth().currentUser.photoURL)
      .getDownloadURL();
  }

  logoutHandler = async () => {
    Auth()
      .signOut()
      .then(() => this.props.navigation.nevigate('loadingScreen'));
  };
  render() {
    return (
      <Container>
        <Content showsVerticalScrollIndicator={false}>
          <View style={styles.ProfInfo}>
            <View>
              <Image
                source={{uri: this.state.fotoURL}}
                style={{
                  height: 100,
                  width: 100,
                  marginVertical: 5,
                  borderRadius: 50,
                }}
              />

              <Text style={{fontWeight: 'bold'}}>
                {Auth().currentUser.displayName}{' '}
              </Text>
            </View>
            <View style={{alignItems: 'center'}}>
              <Text style={{fontWeight: 'bold', fontSize: 18}}>123</Text>
              <Text style={styles.userInfo}>Travel Done</Text>
            </View>
            <View style={{alignItems: 'center'}}>
              <Text style={{fontWeight: 'bold', fontSize: 18}}>456</Text>
              <Text style={styles.userInfo}>Order Done</Text>
            </View>
            <View style={{alignItems: 'center'}}>
              <Text style={{fontWeight: 'bold', fontSize: 18}}>bintang</Text>
              <Text style={styles.userInfo}>Rating</Text>
            </View>
          </View>

          <View style={styles.caption}>
            <Text style={{marginHorizontal: 15}}>{this.state.caption}</Text>
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('userSetting', {
                  caption: this.state.caption,
                  photoURL: this.state.fotoURL,
                })
              }
              style={{
                backgroundColor: '#38fa',
                marginTop: 10,
                marginBottom: 5,
                alignItems: 'center',
                paddingVertical: 3,
              }}>
              <Text>Edit Profile</Text>
            </TouchableOpacity>
          </View>
          <View>
            <ProfilNav theme="light" />
          </View>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 40,
    borderBottomWidth: 0.1,
    borderBottomColor: '#fffff2',
    elevation: 0.9,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingVertical: 23,
    padding: 15,
  },
  ProfInfo: {
    // backgroundColor: '#fa9',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',

    marginHorizontal: 25,
  },
  caption: {
    marginHorizontal: 10,
  },
  itemProfile: {
    flex: 1,
    marginHorizontal: 5,
    marginVertical: 15,
  },
  userInfo: {
    fontSize: 15,
  },
});
