/* eslint-disable react-native/no-inline-styles */
import React, {useState, Component} from 'react';
import Geolocation from '@react-native-community/geolocation';

import {
  View,
  Text,
  FlatList,
  // TouchableOpacity,
  // TouchableWithoutFeedback,
  TouchableHighlight,
  SafeAreaView,
  Dimensions,
  Image,
  ImageBackground,
  StatusBar,
  Alert,
  Toast
} from 'react-native';

import BluetoothManager from './BluetoothManager';

import Styles from './Styles/Styles';
import RoundedButton from './components/RoundedButton';

// const windowWidth = Dimensions.get('window').width;

const buttons = [
  {title: '1', code: 'a'},
  {title: '2', code: 'b'},
  {title: '3', code: 'c'},
  {title: '4', code: 'd'},
  {title: '5', code: 'e'},
  {title: '6', code: 'f'},
  {title: '7', code: 'g'},
  {title: '8', code: 'h'},
  {title: '9', code: 'i'},
  {title: '10', code: 'j'},
  {title: '11', code: 'k'},
  {title: '12', code: 'l'},
  {title: '13', code: 'm'},
  {title: '14', code: 'n'},
];

const bluetoothManager = new BluetoothManager();

class SettingScreen extends Component {
  enableBluetooth() {
    if (!bluetoothManager.isBluetoothOn) {
      bluetoothManager.enableBluetooth(() => {
        this.setState({isBluetoothEnabled: true});
      });
    }
  }

  enableRemote = () => {
    // this.checkGPSStatus();
    // this.enableBluetooth();
    bluetoothManager.enableBluetooth(() => {
      this.setState({isBluetoothEnabled: true});
    });
    // console.log(`${this.state.isBluetoothEnabled}  ${this.state.isLocationEnabled}`)
    bluetoothManager.connectToDefaultDevice(() => {
      console.log('Connected to device');
    });
    bluetoothManager.enableGPS(() => {
      this.setState({isLocationEnabled: true});
    });
  };

  constructor(props) {
    super(props);
    this.state = {
      isBluetoothOn: true,
      isLocationEnabled: false,
      isBluetoothEnabled: false,
    };
  }

  componentDidMount() {
    console.log('');
    this.enableRemote();
    // userDefaults.set('key1', 'valueIsString').then(data => console.log(data));
    // userDefaults.get('key1').then(data => console.log(data));
  }

  render() {
    bluetoothManager.bluetoothStateUpdated = () => {
      console.log(`Bluetooth  State update ${bluetoothManager.isBluetoothOn}`);
      this.setState({isBluetoothEnabled: bluetoothManager.isBluetoothOn});
    };
    return (
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: 'flex-end',
          backgroundColor: '#000',
        }}>
        <StatusBar barStyle="light-content" backgroundColor="#333" />
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-end',
            flexDirection: 'row',
          }}>
          <Image
            style={{
              position: 'absolute',
              left: 100,
              top: -100,
              width: 500,
              height: 500,
            }}
            source={require('./images/logo.png')}
          />
          <View style={{flex: 1, justifyContent: 'flex-start'}}>
            <RoundedButton
              image={
                this.state.isBluetoothEnabled && this.state.isLocationEnabled
                  ? require('./images/power_green.png')
                  : require('./images/power_white.png')
              }
              onPress={() => {
                // bluetoothManager.toggle(state => {
                //   console.log('bluetooth  toggled');
                //   console.log(state);
                // });

                this.enableRemote();
              }}/>
          </View>
        </View>
        <ButtonView devices={buttons} />
      </SafeAreaView>
    );
  }
}

const ButtonView = props => {
  return (
    <SafeAreaView style={Styles.keypad}>
      <FlatList
        contentContainerStyle={Styles.listView}
        data={props.devices}
        renderItem={({item}) => (
          <RoundedButton
            name={item.title}
            onPress={() => {
              bluetoothManager.sendString(item.code, () => {
                console.log('data sent');
              });
            }}
          />
        )}
        numColumns={4}
      />
    </SafeAreaView>
  );
};

export default SettingScreen;
