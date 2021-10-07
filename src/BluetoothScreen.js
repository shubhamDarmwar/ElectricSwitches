import React, {Component, useState} from 'react';
import {
  Button,
  Text,
  View,
  FlatList,
  SectionList,
  TouchableHighlight,
  SafeAreaView,
  StatusBar,
} from 'react-native';

import Styles from './Styles/Styles';
import BluetoothManager from './BluetoothManager';

const bluetoothManager = new BluetoothManager();

const DeviceSectionList = ({pairedDevices, unpairedDevices, callback}) => {
  return (
    <View style={Styles.container}>
      <SectionList
        sections={[
          {title: 'Paired devices', data: pairedDevices},
          {title: 'New devices', data: unpairedDevices},
        ]}
        renderItem={({item}) =>
          <TouchableHighlight onPress={() => {
            callback(item)
          }}>
            <View>
              <View
                flex={1}
                justifyContent={'center'}
                height={50}
                >
                <Text style={{fontSize: 17, color:'white', paddingLeft:10}}>{item.title}</Text>
              </View>
              <View height={1} backgroundColor='#fff'></View>
            </View>
          </TouchableHighlight>
        }
        renderSectionHeader={({section}) =>
          <View
            style={{
              flex: 1,
              height: 40,
              justifyContent: 'center',
              backgroundColor: '#444'}}>
            <Text style={{
                fontSize: 20,
                color: 'white',
                paddingLeft:10}}>
                  {section.title}
            </Text>
          </View>
        }
        keyExtractor={(item, index) => index}
      />
    </View>
  );
};

class BluetoothScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pairedDevices: [{title: 'b', id: 'sfsi'}],
      unpairedDevices: [{title: 'a', id: 'ds'}],
    };
  }

  render() {
    return (
      <SafeAreaView style={{flex: 1, justifyContent: 'flex-end', backgroundColor:'#666'}}>
        <StatusBar barStyle="light-content" backgroundColor="#333" />
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-start',
            backgroundColor: '#000',
          }}>
          <DeviceSectionList
            pairedDevices={this.state.pairedDevices}
            unpairedDevices={this.state.unpairedDevices}
            callback={device => {
              console.log(device);
              bluetoothManager.connectToDevice(device.id, temp => {
                console.log(temp);
              });
            }}
          />
        </View>
        <Button
          title={'Scan for devices'}
          onPress={() => {
            console.log('Scaning started');
            this.scanForNewDevices();
          }}
        />
      </SafeAreaView>
    );
  }

  componentDidMount() {
    BluetoothManager.pairedDevices(devices => {
      console.log(devices);
      this.setState({pairedDevices: devices});
    });
  }
  componentWillUnmount() {
    console.log('Unmouted Bluetooth screen');
  }
  scanForNewDevices() {
    // BluetoothManager.unpairedDevices(devices => {
    //   console.log('Scanning stopped');
    //   this.setState({unpairedDevices: devices});
    // });
    bluetoothManager.unpairedDevices(devices => {
      console.log(devices);
      this.setState({unpairedDevices: devices});
    });
  }
}

export default BluetoothScreen;
