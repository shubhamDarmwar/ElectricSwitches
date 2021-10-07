import React, {useState} from 'react';
import OptionsMenu from 'react-native-option-menu';
const MoreIcon = require('../images/more.png');

const OptionButton = params => {
  return (
    <OptionsMenu
      button={MoreIcon}
      buttonStyle={{width: 30, height: 25, margin: 7.5, resizeMode: 'contain'}}
      destructiveIndex={1}
      options={params.buttonNames}
      actions={params.buttonActions}
    />
  );
};

export default OptionButton;
