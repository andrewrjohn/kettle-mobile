import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { styles } from '../styles';
import { Icon } from 'react-native-elements';
import kettle from '../app.js';

class StatusBar extends Component {
  render() {
    return (
      <View>
        <View style={styles.statusbar} />
        <View style={styles.navbar}>
          <Icon
            style={styles.favoriteButton}
            onPress={this.props.menuBtnPressed}
            name="menu"
          />
          <Text style={styles.navbarTitle}>
            {this.props.title}
          </Text>
          <Icon style={styles.favoriteButton} name="star" />
        </View>
      </View>
    );
  }
}

export default StatusBar;
