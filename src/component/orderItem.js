import React, {Component} from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {Content} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Firestore from '@react-native-firebase/firestore';

export default class orderItem extends Component {
  state = {
    uid: this.props.item.uid,
    imageProf: null,
    nameProf: null,
    caption: this.props.item.caption,
    imageOrder: this.props.item.image,
    harga: this.props.item.harga,
    judul: this.props.item.title,
  };

  getprof = uid => {
    return new Promise((res, rej) => {
      Firestore()
        .collection('userInfo')
        .doc(uid)
        .get()
        .then(data => res(data.data()))
        .catch(e => rej(e));
    });
  };

  componentDidMount() {
    this.getprof(this.state.uid).then(s =>
      this.setState({imageProf: s.photoProfileUser, nameProf: s.name}),
    );
  }

  render() {
    const {item} = this.props;
    return (
      <View style={styles.container}>
        <View
          style={{
            flexDirection: 'row',
            marginBottom: 5,
            alignItems: 'center',
          }}>
          <Image
            source={{uri: this.state.imageProf}}
            style={{
              height: 40,
              width: 40,
              borderRadius: 20,
              marginHorizontal: 5,
            }}
          />
          <Text style={{fontWeight: 'bold', fontSize: 14}}>
            {this.state.nameProf}{' '}
          </Text>
        </View>
        <Image
          source={{
            uri: this.state.imageOrder[0],
          }}
          style={{height: 170, width: 170}}
        />
        <Text style={{fontWeight: 'bold', fontSize: 16}}>
          {this.state.judul}
        </Text>
        <Text style={{color: '#e62121', fontWeight: 'bold', fontSize: 15}}>
          Rp {this.state.harga}
        </Text>
        <Text>lokasi</Text>
      </View>
      // <View style={styles.containerALL}>
      //   <View style={styles.itemContainer}>
      //     <Image
      //       source={{uri: this.state.imageProf}}
      //       style={{height: 60, width: 60, marginRight: 15, borderRadius: 20}}
      //     />
      //     <View style={{flex: 1, flexDirection: 'row'}}>
      //       <View>
      //         <Text>{this.state.nameProf} </Text>
      //         <Text>LOKASI barang</Text>
      //       </View>

      //       <View style={{flex: 1}}>
      //         <View style={{alignSelf: 'flex-end', width: 50}}>
      //           <Text> WAKTU POST</Text>
      //         </View>
      //       </View>
      //     </View>
      //   </View>

      //   <View style={styles.caption}>
      //     <Content horizontal showsHorizontalScrollIndicator={false}>
      //       {this.state.imageOrder.map(test => (
      //         <Image
      //           source={{uri: this.state.imageOrder[0]}}
      //           style={{
      //             width: 150,
      //             height: 150,
      //             marginHorizontal: 5,
      //             borderWidth: 1.2,
      //             borderColor: '#f0f0f0',
      //           }}
      //         />
      //       ))}
      //     </Content>

      //     <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
      //       <Text style={{color: 'red', fontWeight: 'bold', fontSize: 17}}>
      //         Rp {this.state.harga}
      //       </Text>
      //       <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
      //         <TouchableOpacity style={{marginRight: 10}}>
      //           <Ionicons name="ios-heart-empty" size={25} />
      //         </TouchableOpacity>
      //         <TouchableOpacity
      //           style={{marginRight: 10}}
      //           //  onPress={onPress}
      //         >
      //           <Ionicons name="ios-chatboxes" size={25} />
      //         </TouchableOpacity>
      //       </View>
      //     </View>
      //   </View>
      // </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 15,
    marginVertical: 7,
    elevation: 2,
  },
});
