import React, {Component} from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {Content} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Firestore from '@react-native-firebase/firestore';

export default class homeItem extends Component {
  state = {
    uid: this.props.uid,
    imageProf: null,
    nameProf: null,
    caption: this.props.caption,
    imageJourney: this.props.image,
  };

  getprof = uid => {
    return new Promise((res, rej) => {
      Firestore()
        .collection('userInfo')
        .doc(uid)
        .get()
        .then(data => res(data.data()))
        .catch(e => rej(e));
    });
  };

  componentDidMount() {
    this.getprof(this.state.uid).then(s =>
      this.setState({imageProf: s.photoProfileUser, nameProf: s.name}),
    );
  }

  render() {
    return (
      <View style={styles.containerALL}>
        <View style={styles.itemContainer}>
          <Image
            source={{uri: this.state.imageProf}}
            style={{height: 60, width: 60, marginRight: 15, borderRadius: 20}}
          />
          <View style={{flex: 1, flexDirection: 'row'}}>
            <View>
              <Text>{this.state.nameProf} </Text>
              <Text>LOKASI TEST</Text>
            </View>

            <View style={{flex: 1}}>
              <View style={{alignSelf: 'flex-end', width: 50}}>
                <Text> WAKTU POST</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.caption}>
          <Content horizontal showsHorizontalScrollIndicator={false}>
            {this.state.imageJourney.map(test => (
              <Image
                source={{uri: test}}
                style={{
                  width: 150,
                  height: 150,
                  marginHorizontal: 5,
                  borderWidth: 1.2,
                  borderColor: '#f0f0f0',
                }}
              />
            ))}
          </Content>
          <Text>{this.state.caption}</Text>

          <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
            <TouchableOpacity style={{marginRight: 10}}>
              <Ionicons name="ios-heart-empty" size={25} />
            </TouchableOpacity>
            <TouchableOpacity
              style={{marginRight: 10}}
              //  onPress={onPress}
            >
              <Ionicons name="ios-chatboxes" size={25} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
  },
  containerALL: {
    alignSelf: 'stretch',
    backgroundColor: '#fff',
    borderWidth: 0.8,
    borderRadius: 10,
    borderColor: '#fefefe',
    paddingBottom: 26,
    marginHorizontal: 5,
    padding: 10,
    elevation: 2,
    marginVertical: 7,
  },
  caption: {
    paddingTop: 10,
  },
});
