import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Dimensions,
  Image,
  TextInput,
} from 'react-native';

import {connect} from 'react-redux';
import {
  deleteDataCart,
  updateQuantityCart,
  getInfoItem,
} from '../../config/redux/actions/cartItem';

import Firestore from '@react-native-firebase/firestore';

const {width} = Dimensions.get('screen');

class cartItem extends Component {
  state = {
    keyItem: this.props.item.key,
    // quantityss: this.props.item.quantity,
    data: null,
    quantity: null,
  };
  getDataFromKey = async () => {
    const getdataDB = await Firestore()
      .collection('posts')
      .doc(this.state.keyItem)
      .get();
    return getdataDB;
  };

  componentDidMount() {
    this.getDataFromKey().then(data => {
      this.setState({data: data.data()});
      // this.props.getInfoItem(this.state.keyItem, data.data().harga);
    });
    // .then(data => this.props.getInfoItem(this.state.keyItem, data.harga));
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          {this.state.data && (
            <Image
              source={{uri: this.state.data.image[0]}}
              style={{height: 100, width: 100, borderRadius: 10}}
            />
          )}
        </View>
        {this.state.data && (
          <View style={{flex: 1, padding: 10}}>
            <Text style={{fontWeight: 'bold'}}>{this.state.data.title} </Text>
            <Text style={{fontWeight: 'bold', color: '#f10'}}>
              Rp {this.state.data.harga}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-end',
              }}>
              <TouchableOpacity
                style={styles.maginTombol}
                onPress={() =>
                  this.props.deleteDataCart(
                    this.state.keyItem,
                    this.state.data.uid,
                  )
                }>
                {/* <Text> {this.state.keyItem}</Text> */}
                <Text>hapus</Text>
              </TouchableOpacity>

              <View style={{borderBottomColor: '#aa0', borderBottomWidth: 1}}>
                <TextInput
                  keyboardType="number-pad"
                  placeholder={this.state.quantityss}
                  onChangeText={e =>
                    this.props.updateQuantityCart(this.state.keyItem, e)
                  }
                />
              </View>
            </View>
          </View>
        )}
      </View>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  updateQuantityCart: (key, quantity) =>
    dispatch(updateQuantityCart(key, quantity)),
  deleteDataCart: (key, uid) => dispatch(deleteDataCart(key, uid)),
  // getInfoItem: (key, data) => dispatch(getInfoItem(key, data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(cartItem);

const styles = StyleSheet.create({
  container: {
    width,
    padding: 10,
    backgroundColor: '#fa9',
    marginVertical: 5,
    flexDirection: 'row',
  },
  maginTombol: {
    marginHorizontal: 4,
    backgroundColor: '#f09',
    // width: 10,
    height: 30,
  },
});
