import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Button,
  Image,
  TextInput,
  Modal,
  ActivityIndicator,
} from 'react-native';
import Auth from '@react-native-firebase/auth';
import Ionicon from 'react-native-vector-icons/Ionicons';

export default class loginScreen extends Component {
  state = {
    username: '',
    password: '',
    modalVisible: false,
    errMessage: null,
  };

  loginHandler = async () => {
    Auth()
      .signInWithEmailAndPassword(this.state.username, this.state.password)
      .then(() => {
        this.setState({modalVisible: false});
        this.props.navigation.navigate('loadingScreen');
      })
      .catch(err => {
        this.setState({errMessage: err.code, modalVisible: false});
      });
  };

  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center'}}>
        <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.modalVisible}>
          <View style={{flex: 1, justifyContent: 'center'}}>
            <ActivityIndicator size="large" />
          </View>
        </Modal>

        <View style={styles.formLogin}>
          <Text> LOGIN </Text>
          {this.state.errMessage && (
            <Text style={{color: 'red'}}> {this.state.errMessage} </Text>
          )}
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Ionicon name="ios-person" size={25} color="#999" />
            <TextInput
              placeholder="Username"
              keyboardType="email-address"
              autoCapitalize="none"
              onChangeText={username => this.setState({username})}
              value={this.state.username}
              style={{
                marginHorizontal: 10,
                width: 200,
                borderBottomColor: '#a99',
                borderBottomWidth: 0.3,
              }}
            />
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Ionicon name="ios-lock" size={25} color="#999" />
            <TextInput
              placeholder="password"
              secureTextEntry
              onChangeText={password => this.setState({password})}
              value={this.state.password}
              style={{
                marginHorizontal: 10,
                width: 200,
                borderBottomColor: '#a99',
                borderBottomWidth: 0.3,
              }}
            />
          </View>

          <TouchableOpacity
            style={styles.btnLogin}
            onPress={() => {
              if (this.state.password && this.state.username) {
                this.setState({modalVisible: true});
                this.loginHandler();
              } else {
                this.setState({errMessage: "user/password can't empty"});
              }
            }}>
            <Text>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('registerScreen')}>
            <Text>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  formLogin: {
    alignItems: 'center',
    marginHorizontal: 30,
    padding: 20,
    borderRadius: 15,
  },
});
