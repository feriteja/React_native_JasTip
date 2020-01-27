import React from 'react';

import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {Transition} from 'react-native-reanimated';

import home from '../../src/screens/main/home';
import productCart from '../../src/screens/main/productCart';
import postScreen from '../../src/screens/main/postScreen';
import myOrderCart from '../../src/screens/main/myOrderCart';
import profile from '../../src/screens/main/profile';
import userSetting from '../../src/screens/main/userSetting';

import journeyDetail from '../../src/screens/main/journeyDetail';
import productDetail from '../../src/screens/main/productDetail';
import checkOut from '../../src/screens/main/checkOut';

import loginScreen from '../../src/screens/auth/loginScreen';
import registerScreen from '../../src/screens/auth/registerScreen';

import loadingScreen from '../../src/screens/loadingScreen';

import IosIcon from 'react-native-vector-icons/Ionicons';

const mainSection = createStackNavigator(
  {
    default: createBottomTabNavigator(
      {
        home: {
          screen: home,
          navigationOptions: {
            tabBarLabel: 'Home',
            tabBarIcon: ({tintColor}) => (
              <IosIcon name="ios-home" size={24} color={tintColor} />
            ),
          },
        },
        productCart: {
          screen: productCart,
          navigationOptions: {
            tabBarLabel: 'Cart',
            tabBarIcon: ({tintColor}) => (
              <IosIcon name="ios-basket" size={24} color={tintColor} />
            ),
          },
        },
        postScreen: {
          screen: postScreen,
          navigationOptions: {
            tabBarLabel: 'Post',
            tabBarIcon: ({tintColor}) => (
              <IosIcon
                name="ios-add-circle"
                size={58}
                color="#E9446A"
                style={{
                  shadowColor: '#E9446A',
                  shadowOffset: {width: 0, height: 10},
                  shadowRadius: 10,
                  shadowOpacity: 0.3,
                }}
              />
            ),
          },
        },
        myOrderCart: {
          screen: myOrderCart,
          navigationOptions: {
            tabBarLabel: 'Menu  A',
            tabBarIcon: ({tintColor}) => (
              <IosIcon name="logo-snapchat" size={24} color={tintColor} />
            ),
          },
        },
        profile: {
          screen: profile,
          navigationOptions: {
            tabBarLabel: 'Profile',
            tabBarIcon: ({tintColor}) => (
              <IosIcon name="ios-happy" size={24} color={tintColor} />
            ),
          },
        },
      },
      {
        defaultNavigationOptions: {
          tabBarOnPress: ({navigation, defaultHandler}) => {
            if (navigation.state.key === 'postScreen') {
              navigation.navigate('postModal');
            } else {
              defaultHandler();
            }
          },
        },
        tabBarOptions: {
          activeTintColor: '#16882A',
          inactiveTintColor: '#B8BBC4',
          showLabel: false,
        },
      },
    ),
    postModal: {
      screen: postScreen,
    },
    userSetting,
    journeyDetail,
    productDetail,
    checkOut,
  },
  {
    headerMode: 'none',
    mode: 'modal',
    defaultNavigationOptions: {
      animationEnabled: false,
    },
  },
);

const authSection = createStackNavigator(
  {
    loginScreen,
    registerScreen,
  },
  {
    headerMode: 'none',
  },
);

const navigatorRoot = createSwitchNavigator({
  loadingScreen,
  authSection,
  mainSection,
});

export default createAppContainer(navigatorRoot);
