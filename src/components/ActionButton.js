import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import { styles, constants } from '../styles';

class ActionButton extends Component {
  render() {
    return (
      <TouchableHighlight
        style={{ backgroundColor: '#008080' }}
        underlayColor={constants.actionColor}
        onPress={this.props.onPress}
      >
        <View style={{ backgroundColor: '#008080' }}>
          <Text style={styles.actionText}>
            {this.props.title}
          </Text>
        </View>
      </TouchableHighlight>
    );
  }
}

export default ActionButton;
