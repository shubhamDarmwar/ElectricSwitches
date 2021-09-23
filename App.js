/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */


import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  NativeModules,
  NativeEventEmitter,
  Button,
  Platform,
  PermissionsAndroid,
  FlatList,
  TouchableHighlight,
  Item,
} from 'react-native';
// import {my_styles} from './components/my_styles';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import BluetoothSerial from 'react-native-bluetooth-serial';
import Toast from 'react-native-simple-toast';

const App = () => {
  const [isScanning, setIsScanning] =  useState(false);
  const [isBluetoothOn, setIsBluetoothOn] = useState(false);
  const peripherals = new Map();
  const [list, setList] = useState([]);

  BluetoothSerial.on('bluetoothEnabled', () => {
    Toast.show('Bluetooth enabled');
  });
  BluetoothSerial.on('bluetoothDisabled', () => 
    Toast.show('Bluetooth disabled'),
  );
  BluetoothSerial.on('error', err => console.log(`Error: ${err.message}`));
  BluetoothSerial.on('connectionLost', () => {
    if (this.state.device) {
      Toast.show(
        'Connection to device ${this.state.device.name} has been lost',
      );
    }
    this.setState({connected: false});
  });

  Promise.all(() => {
    BluetoothSerial.list();
  })

  const pairedDevices = async () => {
    const devices = await BluetoothSerial.list();
    console.log(devices);
    var rows = [];
    for (var i = 0; i < devices.length; i++) {
      var obj = {};
      obj.title = devices[i].name;
      rows.push(obj);
    }
    setList(rows);
  };

  const unpairedDevices = async () => {
    setIsScanning(true);
    await BluetoothSerial.discoverUnpairedDevices()
      .then(devices => {
        var rows = [];
        for (var i = 0; i < devices.length; i++) {
          var obj = {};
          if (devices[i].name) {
            obj.title = devices[i].name;
            obj.id = devices[i].id;
            rows.push(obj);
          }
        }
        setList(rows);
        console.log(devices);
        setIsScanning(false);
        console.log('Scanning done');
      })
      .catch(() => {
        console.log('Scanning failed');
      });
  };

  const connectToDevice = async id => {
    const device = await BluetoothSerial.connect(id);
    console.log(device);
  };

  const cancelDiscovery = async () => {
    await BluetoothSerial.cancelDiscovery().then(() => {
      console.log('Cancelled');
    });
  };

  const toggle = async () => {
    if (isBluetoothOn == true) {
      setIsBluetoothOn(false);
      await BluetoothSerial.disable();
    } else {
      setIsBluetoothOn(true);
      await BluetoothSerial.enable();
    }
  };

  const FlatList1 = () => {
    return (
      <View style={styles.container}>
        <FlatList
          data={list}
          // renderItem={({item}) => <Text style={styles.item}>{item.title}</Text>}
          renderItem={({item}) =>
            <Button
              // style={styles.item}
              title={item.title}
              onPress={() => connectToDevice(item.id)}
            />
          }/>
      </View>
    );
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <View style={styles.body}>
        <View style={{margin: 10}}>
          <Button
            title={'Paired devices'}
            onPress={() => pairedDevices()}
          />
        </View>

        <View style={{margin: 10}}>
          <Button
            title={'Unpaired devices (' + (isScanning ? 'on' : 'off') + ')'}
            onPress={() => unpairedDevices()}
          />
        </View>
        <View style={{margin: 10}}>
          <Button title="Cancel discovery" onPress={() => cancelDiscovery()} />
        </View>

        {/* <View style={{margin: 10}}>
          <Button
            title="Retrieve discovered"
            onPress={() => retrieveDiscovered()}
          />
        </View> */}
        <View style={{margin: 10}}>
          <Button
            title={'Toggle Bluetooth (' + (isBluetoothOn ? 'on' : 'off') + ')'}
            onPress={() => toggle()}
          />
        </View>
      </View>
      <FlatList1 />
    </>
  );
};


const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
  container: {
    // flex: 1,
    paddingTop: 22,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});

export default App;


//connectionSuccess
//connectionFailed
//connectionLost