import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import { styles, constants } from '../styles';

class ActionButton extends Component {
  render() {
    return (
      <TouchableHighlight
        underlayColor={constants.actionColor}
        onPress={this.props.onPress}
      >
        <View style={styles.action}>
          <Text style={styles.actionText}>{this.props.title}</Text>
        </View>
      </TouchableHighlight>
    );
  }
}

export default ActionButton;
