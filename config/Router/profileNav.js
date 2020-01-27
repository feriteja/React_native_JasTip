import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import {createAppContainer} from 'react-navigation';
import journalPost from '../../src/component/journalPost';
import orderPost from '../../src/component/orderPost';

const topbar = createMaterialTopTabNavigator(
  {
    journalPost: {
      screen: journalPost,
      navigationOptions: {
        // tabBarLabel: 'Journal',
        title: 'Journal',
      },
    },
    orderPost: {
      screen: orderPost,
      navigationOptions: {
        title: 'Order Post',
      },
    },
  },
  {
    // swipeEnabled: true,
    // swipeDistanceThreshold: 20,
    // swipeVelocityThreshold: 5,
    tabBarOptions: {
      labelStyle: {
        color: '#000',
      },
      style: {
        backgroundColor: '#fff',
      },
    },
  },
);

export default createAppContainer(topbar);
