import React from 'react';
import {View, Text, ActivityIndicator} from 'react-native';
import Auth from '@react-native-firebase/auth';

const loadingScreen = props => {
  Auth().onAuthStateChanged(user => {
    if (user) {
      props.navigation.navigate('mainSection');
    } else {
      props.navigation.navigate('authSection');
    }
  });

  return (
    <View>
      <ActivityIndicator size="large" />
    </View>
  );
};

export default loadingScreen;
