import React, {Component} from 'react';
import {Text, View, TouchableOpacity, Button} from 'react-native';
import {Provider} from 'react-redux';

import RootNavigator from './config/Router';
import store from './config/redux/store';

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <View style={{flex: 1}}>
          <RootNavigator />
        </View>
      </Provider>
    );
  }
}
