import {Colors} from 'react-native/Libraries/NewAppScreen';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  container: {
    paddingTop: 22,
    paddingBottom: 22,
    paddingHorizontal: 22,
  },
  keypad: {
    // paddingTop: 20,
    // paddingBottom: 20,
    // paddingHorizontal: 20,
    // backgroundColor: 'white',
    // flex: 1,
    // justifyContent: 'flex-end',
    height: 360,
  },
  listView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#5550',
  },

  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },

  buttonBackground: {
    width: 90,
    height: 90,
    // backgroundColor: '#fff',
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // zIndex:0,
  },
  roundButton1: {
    width: 70,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    // padding: 10,
    borderRadius: 35,
    // backgroundColor: '#CCC',
    borderWidth: 2,
    borderColor: '#fff',
  },
});

export default styles;
