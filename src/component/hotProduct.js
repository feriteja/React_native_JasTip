import React, {Component} from 'react';
import {Text, StyleSheet, View, Image, Dimensions} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';

const {height, width} = Dimensions.get('screen');

export default class hotProduct extends Component {
  state = {
    activeSlide: 0,
    entries: [
      {uri: require('../../src/asssets/img/bg1.jpg')},
      {uri: require('../../src/asssets/img/bg2.jpg')},
      {uri: require('../../src/asssets/img/bg3.jpg')},
      {uri: require('../../src/asssets/img/bg4.jpg')},
      {uri: require('../../src/asssets/img/bg5.jpg')},
      {uri: require('../../src/asssets/img/bg6.jpg')},
    ],
  };

  _renderItem({item, index}) {
    return (
      <View
        style={{
          height: 180,
          width: width * 0.85,
          backgroundColor: '#9aa',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 5,
          borderRadius: 20,
          overflow: 'hidden',
        }}>
        <Image
          style={{
            width: width * 0.85,
            resizeMode: 'contain',
          }}
          source={item.uri}
        />
      </View>
    );
  }

  get pagination() {
    const {entries, activeSlide} = this.state;
    return (
      <Pagination
        dotsLength={entries.length}
        activeDotIndex={activeSlide}
        containerStyle={{
          paddingVertical: 5,
          justifyContent: 'flex-start',
        }}
        dotStyle={{
          width: 10,
          height: 10,
          borderRadius: 5,
          marginHorizontal: 0,
          left: -10,
          backgroundColor: 'rgba(155,225, 225, 0.92)',
        }}
        inactiveDotStyle={{
          // Define styles for inactive dots
          backgroundColor: 'rgba(155,155,155, 0.92)',
        }}
        inactiveDotOpacity={0.5}
        inactiveDotScale={0.5}
      />
    );
  }

  render() {
    return (
      <View>
        <Carousel
          data={this.state.entries}
          renderItem={this._renderItem}
          sliderWidth={width}
          itemWidth={width * 0.85}
          bounces={true}
          onSnapToItem={index => this.setState({activeSlide: index})}
        />

        {this.pagination}
      </View>
    );
  }
}

const styles = StyleSheet.create({});
