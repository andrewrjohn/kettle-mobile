import React, { Component } from 'react';
import firebase from 'firebase';

// External components
import StatusBar from './components/StatusBar';
import ActionButton from './components/ActionButton';
import SideMenu from 'react-native-simple-drawer';
import { styles } from './styles';

import {
  AppRegistry,
  ListView,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  AlertIOS,
  TouchableOpacity,
  TextInput,
  AsyncStorage
} from 'react-native';

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyD71FqS5lCiGdJuE8UrfS4Ic_TgHsgikV4",
  authDomain: "kettle-84ea2.firebaseapp.com",
  databaseURL: "https://kettle-84ea2.firebaseio.com",
  projectId: "kettle-84ea2",
  storageBucket: "kettle-84ea2.appspot.com"
};
const firebaseApp = firebase.initializeApp(firebaseConfig);
async () => {
  const defaultKettle = await AsyncStorage.getItem('@MySuperStore:key');
  if (defaultKettle !== nul) {
    this.setState({currentKettle: defaultKettle});
  } else {
    this.setState({currentKettle: 'newKettle'});
  }
}

class kettle extends Component {
  state = {
    currentKettle: '',
    contentText: '',
    kID: '',
    kettleTitle: 'WelcomeToKettle',
  }

  getRef() {
    return firebaseApp.database().ref();
  }

  changeKettle() {

  }

  listeningForChanges(kettleId) {
    if (kettleId == null) {
      //this.state.kID = ""
      this.state.kettleTitle = "WelcomeToKettle"
      kettleId = "WelcomeToKettle"
      this.state.currentKettle = kettleId
    } else {
      kettleId = this.state.currentKettle
      this.state.kettleTitle = kettleId
    }

    var contentRef = firebase.database().ref('kettles/' + kettleId + '/content');
    contentRef.on('value', (snapshot) => {
      this.setState({contentText:snapshot.val()});
    });
  }

  componentDidMount() {
    this.listeningForChanges(this.state.currentKettle);
  }

  render() {
    const menu = (
      <View>
        <TextInput
          style={styles.sidemenuText}
          placeholder="Search for Kettle" autoCapitalize="none" returnKeyType={'search'} onSubmitEditing={(event) => this.updateKettle(event.nativeEvent.text)}
        />

        <ActionButton onPress={this._addItem.bind(this)} title="New Kettle" />
      </View>
    );

    return (
      <SideMenu ref="menu" menu={menu} style={styles.sidemenu}>
        <View style={styles.container}>

          <TouchableOpacity onPress={() => this.refs.menu.open()}>
            <StatusBar title={this.state.kettleTitle} onPress={() => this.refs.menu.open()}>
            </StatusBar>
          </TouchableOpacity>

          <TextInput style={{padding: 10}} value={this.state.contentText} multiline={true} onChangeText={(text) => updateContent(text)}>
          </TextInput>
        </View>
        <Text style={styles.linkText}>You can access your Kettle at: arjohnson.mykettle.co</Text>
      </SideMenu>
    );
  }

  updateKettle(searchedKettle) {
    this.listeningForChanges(searchedKettle);
    this.setState({currentKettle:searchedKettle});
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

            firebase.database().ref('kettles/' + text + '/').set({
              content: 'Welcome to your new Kettle!'
            });
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

export default kettle;
