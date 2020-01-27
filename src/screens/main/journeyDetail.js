import React, {Component} from 'react';
import {Text, View, Button} from 'react-native';

export default class productList extends Component {
  render() {
    return (
      <View>
        <Text> Product List </Text>
        <Button
          title="go"
          onPress={() => this.props.navigation.navigate('productDetail')}
        />
      </View>
    );
  }
}
