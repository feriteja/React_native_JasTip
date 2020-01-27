import React, {Component} from 'react';
import {Text, StyleSheet, View, FlatList} from 'react-native';

import {connect} from 'react-redux';
import {
  getDataOrder,
  cleanDataJournal,
} from '../../../config/redux/actions/orderData';

import OrderItem from '../../component/orderItem';
import {TouchableOpacity} from 'react-native-gesture-handler';

class productCart extends Component {
  state = {
    limit: 20,
  };

  componentWillUnmount() {
    this.props.cleanDataOrder();
  }

  componentDidMount() {
    this.props.getDataOrder(this.state.limit);
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <FlatList
          numColumns={2}
          columnWrapperStyle={{justifyContent: 'space-around'}}
          keyExtractor={item => item.uid + item.timestamp}
          data={this.props.dataOrder}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('productDetail', {
                  item,
                })
              }>
              <OrderItem item={item} />
            </TouchableOpacity>
          )}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  dataOrder: state.dataOrderReducer,
});

const mapDispatchToProps = dispatch => ({
  getDataOrder: limit => dispatch(getDataOrder(limit)),
  cleanDataOrder: () => dispatch(cleanDataJournal()),
});

export default connect(mapStateToProps, mapDispatchToProps)(productCart);

const styles = StyleSheet.create({});
