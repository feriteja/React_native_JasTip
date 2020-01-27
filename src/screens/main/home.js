import React, {Component} from 'react';
import {
  Text,
  StatusBar,
  StyleSheet,
  View,
  Button,
  Dimensions,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
} from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';

import HotProduct from '../../component/hotProduct';
import HomeItem from '../../component/homeItem';

import {
  getDataJournal,
  cleanDataJournal,
} from '../../../config/redux/actions/journalData';

const {height, width} = Dimensions.get('screen');

class home extends Component {
  state = {
    continent: null,
    continentPicker: 'Asia',
    itemFlatlist: 20,
  };

  componentWillUnmount() {
    this.props.cleanDataJournal();
  }

  componentDidMount() {
    this.props.getDataJournal(this.state.itemFlatlist);
  }

  render() {
    // let continent = countryContinent;

    // let countries = continent.filter(
    //   e => e.continent === this.state.continentPicker,
    // );

    return (
      <ScrollView>
        <View style={styles.headerS}>
          <View
            style={{
              backgroundColor: '#fefefe',
              width: width * 0.75,
              height: 40,
              borderRadius: 10,
              alignItems: 'center',
              paddingHorizontal: 9,
              flexDirection: 'row',
            }}>
            <Ionicon name="ios-search" size={24} />
            <Text style={{color: '#aaa', marginLeft: 5}}> Search here </Text>
          </View>
          <Ionicon size={25} name="ios-heart" style={{color: '#fff'}} />
          <Ionicon size={25} name="ios-mail" style={{color: '#fff'}} />
          <Ionicon size={25} name="ios-notifications" style={{color: '#fff'}} />
        </View>
        <View style={styles.Carosel}>
          <HotProduct />
        </View>

        <View style={styles.contentMain}>
          <View>
            <FlatList
              data={this.props.dataJournal}
              keyExtractor={item => item.uid + item.timestamp}
              renderItem={({item}) => (
                <HomeItem
                  key={item.key}
                  caption={item.caption}
                  image={item.image}
                  timestamp={item.timestamp}
                  uid={item.uid}
                />
              )}
            />
          </View>
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  dataJournal: state.dataJournalReducer,
});

const mapDispatchToProps = dispatch => ({
  getDataJournal: a => dispatch(getDataJournal(a)),
  cleanDataJournal: () => dispatch(cleanDataJournal()),
});

export default connect(mapStateToProps, mapDispatchToProps)(home);

const styles = StyleSheet.create({
  headerS: {
    alignItems: 'center',
    paddingHorizontal: 7,
    flexDirection: 'row',
    height: 50,
    backgroundColor: '#a3e2f2',
    justifyContent: 'space-evenly',
  },
  Carosel: {marginTop: 10},
  countryFlag: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  contentMain: {
    marginHorizontal: 15,
  },
  Flagstyle: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 80,
    width: 80,
    borderRadius: 40,
    backgroundColor: '#597bcb',
    marginHorizontal: 7,
    marginVertical: 10,
  },
});
