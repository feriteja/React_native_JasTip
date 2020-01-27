import React, {Component} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import {connect} from 'react-redux';

import Firestore from '@react-native-firebase/firestore';

class totalHarga extends Component {
  state = {
    keyItem: this.props.itemcart,
    data: null,
  };

  componentDidMount() {
    this.getHarga();
  }

  getHarga = async () => {
    let harganya = Promise.all(
      this.state.keyItem.map(item => {
        return Firestore()
          .collection('posts')
          .doc(item.key)
          .get()
          .then(data => {
            return data.data();
          });
      }),
    ).then(data => {
      return data;
    });
    let iniharga = await harganya.harga;

    this.setState({data: iniharga});
    console.log(iniharga);
  };

  //   getHarga = async () => {
  //     let harganya = Promise.all(
  //       this.state.keyItem.map(item => {
  //         return Firestore()
  //           .collection('posts')
  //           .doc(this.state.keyItem)
  //           .get()
  //           .then(data => {
  //             return data.data();
  //           });
  //       }),
  //     ).then(data => {
  //       return data;
  //     });

  //     let iniharga = await harganya;

  //     console.log(iniharga);
  //   };

  render() {
    // console.log(this.state.keyItem.key);
    return (
      <View>
        <Button
          title="tse"
          onPress={() => console.log(this.state.keyItem[0].key)}
        />
        <Text> textInComponent </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({});

const mapStateToProps = state => ({
  itemcart: state.cartItemReducer,
});

export default connect(mapStateToProps)(totalHarga);
