'use strict';

import React, {Component} from 'react';
import ReactNative from 'react-native';
const styles = require('../styles.js')
const constants = styles.constants;
const { StyleSheet, Text, View, TouchableHighlight} = ReactNative;

class ActionButton extends Component {
  render() {
    return (
      <TouchableHighlight
      underlayColor={constants.actionColor}
      onPress={this.props.onPress}>
      <View style={styles.action}>


          <Text style={styles.actionText}>{this.props.title}</Text>

      </View>
      </TouchableHighlight>
    );
  }
}

module.exports = ActionButton;
