import BluetoothSerial from 'react-native-bluetooth-serial';
import React, {useState, useEffect} from 'react';
import { Component } from 'react';
import {Toast} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';

class BluetoothManager {
  bluetoothStateUpdated;
  isScanning = false;
  isBluetoothOn = false;
  storeKey = 'deviceId';

  storeDeviceId = async value => {
    try {
      await AsyncStorage.setItem(this.storeKey, value);
    } catch (error) {
      console.log('Error saving data');
      console.log(error.message);
    }
  };

  fetchDeviceId = async callBack => {
    try {
      const value = await AsyncStorage.getItem(this.storeKey);
      if (value !== null) {
        // We have data!!
        console.log(value);
        callBack(value);
      }
    } catch (error) {
      console.log('Error retrieving data');
      console.log(error.message);
      callBack('');
    }
  };

  constructor() {
    // console.log('Bluetooth manager initialized');
    BluetoothSerial.on('bluetoothEnabled', () => {
      // console.log('Bluetooth enabled w');
      if (this.bluetoothStateUpdated) {
        this.bluetoothStateUpdated();
      } else {
        // console.log('bluetoothStateUpdated not  set');
      }
    });
    BluetoothSerial.on('bluetoothDisabled', () => {
      // console.log('Bluetooth disabled w');
      if (this.bluetoothStateUpdated) {
        this.bluetoothStateUpdated();
      } else {
        // console.log('bluetoothStateUpdated not  set');
      }
    });

    this.isBluetoothOn = BluetoothSerial.isEnabled();
  }
  async enableGPS(callback) {
    RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({
      interval: 10000,
      fastInterval: 5000,
    })
      .then((data) => {
        console.log(`GPS = ${data}`);
        callback();
        // The user has accepted to enable the location services
        // data can be :
        //  - "already-enabled" if the location services has been already enabled
        //  - "enabled" if user has clicked on OK button in the popup
      })
      .catch((err) => {
        console.log(`GPS error = ${err.message}`);
        // The user has not accepted to enable the location services or something went wrong during the process
        // "err" : { "code" : "ERR00|ERR01|ERR02|ERR03", "message" : "message"}
        // codes :
        //  - ERR00 : The user has clicked on Cancel button in the popup
        //  - ERR01 : If the Settings change are unavailable
        //  - ERR02 : If the popup has failed to open
        //  - ERR03 : Internal error
      });
  }
  async enableBluetooth(callback) {
    await BluetoothSerial.enable().then(() => {
      callback();
    });
  }
  static async pairedDevices(callback) {
    const devices = await BluetoothSerial.list();
    var rows = [];
    for (var i = 0; i < devices.length; i++) {
      var obj = {};
      obj.title = devices[i].name;
      obj.id = devices[i].id;
      rows.push(obj);
    }
    callback(rows);
  }

  async unpairedDevices(callback) {
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
        callback(rows);
        this.isScanning = false;
        console.log('Scanning done');
      })
      .catch(() => {
        console.log('Scanning failed');
      });
  }

  async connectToDevice(id, callback) {
    console.log(`Connecting to ${id}`);
    await BluetoothSerial.connect(id)
      .then(device => {
        console.log(device);
        callback(device);
        this.storeDeviceId(id);
        console.log('Connected');
      })
      .catch(err => {
        console.log(`catched : ${err}`);
      });
      // .then(device => {
        
      // })
      // .error(err => {
      //   // console.log('Connection  error');
      //   // console.log(err);
      // });
  }

  async connectToDefaultDevice(callback) {
    console.log('Default device');
    this.fetchDeviceId(id => {
      console.log(id);
      this.connectToDevice(id, callback);
    });
  }

  async disconnectDevice(callback) {
    await BluetoothSerial.disconnect();
    callback();
  }

  async sendString(string, callback) {
    await BluetoothSerial.write(string).then(() => {
      callback();
    });
  }

  async cancelDiscovery(callback) {
    await BluetoothSerial.cancelDiscovery().then(() => {
      callback();
    });
  }

  async toggle(callBack) {
    if (this.isBluetoothOn === true) {
      await BluetoothSerial.disable();
      this.isBluetoothOn = false;
    } else {
      await BluetoothSerial.enable();
      this.isBluetoothOn = true;
    }
    // callBack(this.isBluetoothOn);
  }
}
export default BluetoothManager;
