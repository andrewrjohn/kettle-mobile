import React, { Component } from 'react';
import firebase from 'firebase';

// External components
import StatusBar from './components/StatusBar';
import ActionButton from './components/ActionButton';
import SideMenu from 'react-native-simple-drawer';
import { styles } from './styles';

import { Button, FormInput, Icon } from 'react-native-elements';

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
  AsyncStorage,
  Keyboard,
  ActivityIndicator,
  KeyboardAvoidingView
} from 'react-native';

// Initialize Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyD71FqS5lCiGdJuE8UrfS4Ic_TgHsgikV4',
  authDomain: 'kettle-84ea2.firebaseapp.com',
  databaseURL: 'https://kettle-84ea2.firebaseio.com',
  projectId: 'kettle-84ea2',
  storageBucket: 'kettle-84ea2.appspot.com'
};
const firebaseApp = firebase.initializeApp(firebaseConfig);

class kettle extends Component {
  state = {
    currentKettle: 'Welcome to Kettle!',
    contentText:
      "1. A Kettle is public collection of text, unique by the Kettle ID (kID).\n\n2. REMEMBER: Anybody who has the name of your Kettle can see your data, so make sure you don't put anything important in it.\n\n3. You can search for previously-ceated Kettles, or create your own unique Kettle.\n\n4. Save your changes by tapping the Checkmark.\n\n5. Start by swiping from the left side of your screen. ",
    kID: '',
    newText: '',
    favoriteColor: 'black',

    //kettleTitle: 'WelcomeToKettle',
    animating: true
  };

  getRef() {
    return firebaseApp.database().ref();
  }

  listeningForChanges(kettleId) {
    if (kettleId == null) {
      this.state.currentKettle = 'WelcomeToKettle';
    } else {
      //this.state.currentKettle = kettleId;
      this.setState({ currentKettle: kettleId });
    }

    var contentRef = firebase
      .database()
      .ref('kettles/' + kettleId + '/content');

    var checkRef = firebase.database().ref('kettles/');
    // Checks if the searched Kettle exists
    checkRef.on('value', snapshot => {
      if (!snapshot.hasChild(kettleId)) {
        AlertIOS.alert(
          'Oops!',
          "This Kettle doesn't exist yet, why don't you try creating it?"
        );
      } else {
        Keyboard.dismiss();
        this.refs.menu.close();
        contentRef.once('value', snapshot => {
          this.setState({ contentText: snapshot.val() });
        });
      }
    });
  }

  openingPrompt() {
    AlertIOS.prompt(
      'Search for a Kettle',
      'Quickly jump to a new Kettle',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel'
        },
        {
          text: 'Go',
          onPress: name => {
            this.listeningForChanges(name);
          }
        }
      ],
      'plain-text'
    );
  }

  componentDidMount() {
    //this.openingPrompt();
    //this.listeningForChanges('WelcomeToKettle');
  }
  // Updates content
  updateContent(newT) {
    if (newT == null) {
    } else {
      Keyboard.dismiss();
      firebase
        .database()
        .ref('kettles/' + this.state.currentKettle + '/')
        .child('content')
        .set(this.state.newT);
    }
  }

  favoritePressed() {
    this.state.favoriteColor = 'orange';
  }

  render() {
    const menu = (
      <View style={{}}>
        <TextInput
          style={styles.sidemenuText}
          placeholder="Search for Kettle"
          autoCapitalize="none"
          returnKeyType={'search'}
          onChangeText={text => this.setState({ text })}
          onSubmitEditing={event => this.listeningForChanges(this.state.text)}
          autoCorrect={false}
          onBlur={() => Keyboard.dismiss()}
          selectTextOnFocus={true}
        />
        <Button
          style={styles.sidemenuButton}
          onPress={this._addItem.bind(this)}
          icon={{ name: 'add' }}
          title="New Kettle"
          backgroundColor="#66BB6A"
        />
      </View>
    );

    return (
      <SideMenu ref="menu" menu={menu} style={styles.sidemenu}>
        <StatusBar
          title={this.state.currentKettle}
          menuBtnPressed={() => this.refs.menu.open()}
          syncBtn={() => this.updateContent(this.state.newT)}
        />
        <KeyboardAvoidingView style={styles.container} behavior="padding">
          <TextInput
            style={{ padding: 10, fontSize: 14, backgroundColor: 'white' }}
            multiline={true}
            defaultValue={this.state.contentText}
            onChangeText={newT => this.setState({ newT })}
            value={this.state.newT}
            autoCorrect={false}
          />
        </KeyboardAvoidingView>
        <Icon
          style={{
            justifyContent: 'flex-start',
            alignItems: 'flex-end',
            margin: 10
          }}
          //onPress={this.favoritePressed}
          name="star"
          color={this.state.favoriteColor}
        />
      </SideMenu>
    );
  }

  _addItem() {
    AlertIOS.prompt(
      'New Kettle Name',
      "If you want to decrease the chance of people finding it, try naming it something unique like 'PurpleUnicorns4857602'.",
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel'
        },
        {
          text: 'Create',
          onPress: name => {
            var checkRef = firebase.database().ref('kettles/');

            if (name.length > 20) {
              AlertIOS.alert(
                'Oops!',
                "Try to keep your Kettle name under 21 characters.\n\nOur computers aren't THAT fast."
              );
            } else {
              var contentRef = firebase
                .database()
                .ref('kettles/' + name + '/content');
              checkRef.once('value', snapshot => {
                if (snapshot.hasChild(name)) {
                  AlertIOS.alert(
                    'Oops!',
                    "This Kettle already exists, why don't you try searching for it?"
                  );
                } else {
                  firebase.database().ref('kettles/' + name + '/').set({
                    content:
                      "Remember, Kettle's are open to anyone, so be careful what you put in here."
                  });
                  Keyboard.dismiss();
                  this.refs.menu.close();
                  this.state.currentKettle = name;
                  contentRef.on('value', snapshot => {
                    this.setState({ contentText: snapshot.val() });
                  });
                }
              });
            }
          }
        }
      ],
      'plain-text'
    );
  }

  _renderItem(item) {
    return null;
    //<ListItem item={item}/>
  }
}

export default kettle;
