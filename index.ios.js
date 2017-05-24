/**
 * Sample Firebase & React Native App
 * https://github.com/davideast/firebase-react-native-sample
 */
'use strict';

import React, {Component} from 'react';
import ReactNative from 'react-native';


const firebase = require('firebase');

// External components
const StatusBar = require('./components/StatusBar');
const ActionButton = require('./components/ActionButton');

import SideMenu from 'react-native-simple-drawer';

const styles = require('./styles.js')

const {
  AppRegistry,
  ListView,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  AlertIOS,
  TouchableOpacity,
  TextInput
} = ReactNative;

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyD71FqS5lCiGdJuE8UrfS4Ic_TgHsgikV4",
    authDomain: "kettle-84ea2.firebaseapp.com",
    databaseURL: "https://kettle-84ea2.firebaseio.com",
    projectId: "kettle-84ea2",
    storageBucket: "kettle-84ea2.appspot.com"
};
const firebaseApp = firebase.initializeApp(firebaseConfig);


class kettle extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      })
    };
    this.itemsRef = this.getRef().child('kettles');
  }

  getRef() {
    return firebaseApp.database().ref();
  }

  listenForItems(itemsRef) {
    itemsRef.on('value', (snap) => {

      // get children as an array
      var items = [];
      snap.forEach((child) => {
        items.push({
          title: child.val().content,
          _key: child.key
        });
      });

      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(items)
      });

    });
  }

  componentDidMount() {
    this.listenForItems(this.itemsRef);
  }

  render() {


    const menu = (
            <View>
            <TextInput
      style={styles.sidemenuText}
      placeholder="Search for Kettle" />

    <ActionButton onPress={this._addItem.bind(this)} title="New Kettle" />
            </View>


        )

    return (
      <SideMenu ref="menu" menu={menu} style={styles.sidemenu}>
      <View style={styles.container}>


        <TouchableOpacity onPress={() => this.refs.menu.open()}>
        <StatusBar title="arjohnson" onPress={() => this.refs.menu.open()}>
        </StatusBar>
        </TouchableOpacity>


        <ListView
          dataSource={this.state.dataSource}
          renderRow={this._renderItem.bind(this)}
          enableEmptySections={true}
          style={styles.listview}/>



      </View>
      <Text style={styles.linkText}>You can access your Kettle at: arjohnson.mykettle.co</Text>
      </SideMenu>
    )
  }

  _addItem() {
    AlertIOS.prompt(
      'Enter a unique name for your new Kettle',
      null,
      [
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {
          text: 'Create',
          onPress: (text) => {
            this.itemsRef.push({ content: text })
          }
        },
      ],
      'plain-text'
    );
  }

  _renderItem(item) {

    return (
      null
      //<ListItem item={item}/>
    );
  }

}

AppRegistry.registerComponent('kettle', () => kettle);
