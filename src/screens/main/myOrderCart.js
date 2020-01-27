import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Button,
} from 'react-native';
import {connect} from 'react-redux';

import {getDataCart, cleanCart} from '../../../config/redux/actions/cartItem';
import Auth from '@react-native-firebase/auth';

import CartItem from '../../component/cartItem';
import TotalHarga from '../../component/totalHarga';

const {width} = Dimensions.get('screen');

class myOrderCart extends Component {
  state = {
    dataHarga: null,
  };

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.itemcart.length !== nextProps.itemcount) {
      return true;
    } else return false;
  }

  componentDidMount() {
    this.props.getDataCarts(Auth().currentUser.uid);
    this.setState({dataHarga: this.props.itemcart});
  }

  componentWillUnmount() {
    this.props.cleanCart();
  }

  render() {
    if (this.props.itemcart.length == this.props.itemcount) {
      const harga = this.props.itemcart.map((data, index) => {
        return data.harga * data.quantity;
      });
      const totalHarga = harga.reduce((a, b) => a + b, 0);

      return (
        <View style={{flex: 1, position: 'relative'}}>
          <View>
            <FlatList
              data={this.props.itemcart}
              renderItem={({item}) => <CartItem item={item} />}
              contentContainerStyle={{marginHorizontal: 10}}
              ItemSeparatorComponent={() => (
                <View
                  style={{
                    width,
                    height: 1,
                    backgroundColor: '#dcdcdc',
                  }}></View>
              )}
            />
          </View>

          <View style={styles.footer}>
            <View>
              <Text style={{fontWeight: 'bold', fontSize: 15}}>
                Total Harga
              </Text>
              <Text style={{color: '#f10', fontWeight: 'bold', fontSize: 19}}>
                Rp {totalHarga}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('checkOut', {
                  checkoutItem: this.props.itemcart,
                  totalHarga,
                })
              }>
              <Text>Beli barang</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    } else {
      return <Text> tunggu sebentar</Text>;
    }
  }
}

const mapStateToProps = state => ({
  itemcart: state.cartItemReducer,
  itemcount: state.itemCountReducer,
});

const mapDispatchToProps = dispatch => ({
  getDataCarts: uid => dispatch(getDataCart(uid)),
  cleanCart: () => dispatch(cleanCart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(myOrderCart);

const styles = StyleSheet.create({
  footer: {
    position: 'absolute',
    bottom: 0,
    height: 60,
    width,
    flexDirection: 'row',
    backgroundColor: '#fa0a',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
});
