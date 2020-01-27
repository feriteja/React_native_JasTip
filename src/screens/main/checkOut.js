import React, {Component} from 'react';
import {Text, StyleSheet, View, TextInput} from 'react-native';

import Firestore from '@react-native-firebase/firestore';
import Auth from '@react-native-firebase/auth';

export default class checkOut extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.navigation.getParam('checkoutItem', null),
      totalHarga: this.props.navigation.getParam('totalHarga', null),
      alamat: null,
    };
  }

  getAlamat = () => {
    Firestore().collection('userInfo');
  };

  render() {
    console.log(this.state.data);
    return (
      <View style={styles.container}>
        <TextInput
          onChangeText={e => this.setState({alamat: e})}
          placeholder="alamat"
        />
        <Text> total harga {this.state.totalHarga} </Text>
        <Text> transfer ke ,,,</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
