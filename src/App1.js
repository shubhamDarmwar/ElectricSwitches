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
import BluetoothManager from './BluetoothManager';

const App = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [isBluetoothOn, setIsBluetoothOn] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const peripherals = new Map();
  const [list, setList] = useState([]);
  const bluetoothManager = new BluetoothManager();

  BluetoothSerial.on('bluetoothEnabled', () => {
    Toast.show('Bluetooth enabled');
  });
  BluetoothSerial.on('bluetoothDisabled', () => 
    Toast.show('Bluetooth disabled'),
  );
  BluetoothSerial.on('error', err => console.log(`Error: ${err.message}`));
  BluetoothSerial.on('connectionLost', () => {
    Toast.show('Disconnected device');
    setIsConnected(false);
  });

  BluetoothSerial.on('connectionSuccess', () => {
    Toast.show('Connected device');
    setIsConnected(true);
  });

  // Promise.all(() => {
  //   BluetoothSerial.list();
  // });

  const connectToDevice = async id => {
    console.log('Connecting');
    await BluetoothSerial.connect(id).then(device => {
      console.log(device);
      // setIsConnected(true);
    });
  };

  const disconnectDevice = async () => {
    await BluetoothSerial.disconnect();
  };

  const sendString = async () => {
    await BluetoothSerial.write('a').then(() => {
      Toast.show('data sent');
    });
  };

  const cancelDiscovery = async () => {
    await BluetoothSerial.cancelDiscovery().then(() => {
      console.log('Cancelled');
    });
  };

  const toggle = async () => {
    if (isBluetoothOn === true) {
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
              title={item.title}
              onPress={() => connectToDevice(item.id)}
            />
          }
        />
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
            onPress={() => BluetoothManager.pairedDevices((rows) => {
              console.log(rows);
            })}
          />
        </View>

        <View style={{margin: 10}}>
          <Button
            title={'Unpaired devices (' + (bluetoothManager.isScanning ? 'on' : 'off') + ')'}
            onPress={() => bluetoothManager.unpairedDevices((rows) => {
                console.log(rows);
                setList(rows);
            })}
          />
        </View>
        <View style={{margin: 10}}>
          <Button title="Cancel discovery" onPress={() => cancelDiscovery()} />
        </View>

        <View style={{margin: 10}}>
          <Button
            title={'Toggle Bluetooth (' + (isBluetoothOn ? 'on' : 'off') + ')'}
            onPress={() => toggle()}
          />
        </View>
        <View>
          {isConnected ? (
            <Button title={'Disconnect'} onPress={() => disconnectDevice()} />
          ) : (
            <Text> '' </Text>
          )}
          {isConnected ? (
            <Button title={'Send string'} onPress={() => sendString('a')} />
          ) : (
            <Text> '' </Text>
          )}
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