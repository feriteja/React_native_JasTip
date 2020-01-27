import React, {Component} from 'react';
import {
  Text,
  Image,
  StyleSheet,
  View,
  Button,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';

import MyOrder from '../../../config/Firebase/myOrderHandler';

const {width, height} = Dimensions.get('screen');

export default class productDetail extends Component {
  state = {
    item: this.props.navigation.getParam('item', {item: ''}),
    activeSlide: 0,
  };

  _renderItem({item, index}) {
    return (
      <View
        style={{
          height: 350,
          width: width,
          backgroundColor: '#9aa',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 5,
          overflow: 'hidden',
        }}>
        <Image
          style={{
            width: width,
            height: 350,
            // resizeMode: 'contain',
          }}
          source={{uri: item}}
        />
      </View>
    );
  }

  get pagination() {
    const {entries, activeSlide} = this.state;
    return (
      <Pagination
        dotsLength={this.state.item.image.length}
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
      <View style={styles.container}>
        <View>
          <Carousel
            data={this.state.item.image}
            renderItem={this._renderItem}
            sliderWidth={width}
            layout="default"
            itemWidth={width}
            // bounces={true}
            onSnapToItem={index => this.setState({activeSlide: index})}
          />
          {this.pagination}
          <View style={styles.detail}>
            <Text style={{fontSize: 18, fontWeight: 'bold'}}>
              {this.state.item.title}
            </Text>
            <Text style={{fontSize: 18, fontWeight: 'bold', color: '#f00b'}}>
              Rp {this.state.item.harga}
            </Text>
            <Text style={{fontSize: 17}}>{this.state.item.caption} </Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.footer}
          onPress={() =>
            MyOrder.execution.addToBucket(
              this.state.item.key,
              this.state.item.harga,
            )
          }>
          <Text>Tambah Keranjang</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
  },
  detail: {
    marginHorizontal: 10,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    height: 60,
    width,
    backgroundColor: '#f9a',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});
