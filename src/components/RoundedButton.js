import React, {useState} from 'react';
import {View, TouchableHighlight, ImageBackground, Text, Image} from 'react-native';
import Styles from '../Styles/Styles';

const RoundedButton = props => {
  const [pressed, setPressed] = useState(false);
  const bubble_white = '../images/bubble_white.png';
  const bubble_black = '../images/bubble_black.png';

  return (
    <View style={Styles.buttonBackground}>
      <TouchableHighlight
        style={Styles.roundButton1}
        activeOpacity={1}
        title={props.name}
        onPress={() => {
          // setPressed(false);
          props.onPress();
        }}
        onPressIn={() => {
          setPressed(true);
        }}
        onPressOut={() => {
          setPressed(false);
        }}>
        <View style={Styles.root}>
          <ImageBackground
            source={pressed ? require(bubble_white) : require(bubble_black)}
            style={{height: 69, width: 69}}>
            <View
              style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              {props.name && (
                <Text
                  style={{
                    color: pressed ? '#000' : '#fff',
                    fontWeight: 'bold',
                    fontSize: 20,
                  }}>
                  {props.name}
                </Text>
              )}
              {props.image && (
                <Image
                  source={props.image}
                  style={{height: 30, width: 30}}
                />
              )}
            </View>
          </ImageBackground>
        </View>
      </TouchableHighlight>
    </View>
  );
};

export default RoundedButton;
