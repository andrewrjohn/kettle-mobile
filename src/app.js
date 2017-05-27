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
	AsyncStorage,
	Keyboard,
	ActivityIndicator
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
async () => {
	const defaultKettle = await AsyncStorage.getItem('@MySuperStore:key');
	if (defaultKettle !== nul) {
		this.setState({ currentKettle: defaultKettle });
	} else {
		this.setState({ currentKettle: 'newKettle' });
	}
};

class kettle extends Component {
	state = {
		currentKettle: '',
		contentText: '',
		kID: '',
		kettleTitle: 'WelcomeToKettle',
		animating: true
	};

	getRef() {
		return firebaseApp.database().ref();
	}

	listeningForChanges(kettleId) {
		if (kettleId == null) {
			// this.state.currentKettle = 'WelcomeToKettle';
			// kettleId = 'WelcomeToKettle';
		} else {
			this.state.currentKettle = kettleId;
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
				contentRef.on('value', snapshot => {
					this.setState({ contentText: snapshot.val() });
				});
			}
		});
	}

	componentDidMount() {
		// var kID = '';
		// if (this.state.currentKettle == null) {
		// 	kID = 'WelcomeToKettle';
		// } else {
		// 	kID = this.state.currentKettle;
		// }
		// this.listeningForChanges(kID);
	}

	updateContent(newText) {
		firebase.database().ref('kettles/' + this.state.currentKettle + '/').set({
			content: newText
		});
	}

	render() {
		const menu = (
			<View>
				<TextInput
					style={styles.sidemenuText}
					placeholder="Search for Kettle"
					autoCapitalize="none"
					returnKeyType={'search'}
					onChangeText={text => this.setState({ text })}
					value={this.state.text}
					onSubmitEditing={event => this.listeningForChanges(this.state.text)}
					autoCorrect={false}
					onBlur={event => Keyboard.dismiss()}
					selectTextOnFocus={true}
				/>
				<Text style={styles.linkText}> Remember, capitalization matters </Text>
				<ActionButton onPress={this._addItem.bind(this)} title="New Kettle" />
			</View>
		);

		return (
			<SideMenu ref="menu" menu={menu} style={styles.sidemenu}>

				<View style={styles.container}>

					<TouchableOpacity onPress={() => this.refs.menu.open()}>
						<StatusBar
							title={this.state.currentKettle}
							onPress={() => this.refs.menu.open()}
						/>
					</TouchableOpacity>

					<TextInput
						style={{ padding: 10 }}
						multiline={true}
						onChangeText={text => this.setState({ contentText: text })}
						value={this.state.contentText}
						onSubmitEditing={event =>
							this.updateContent(this.state.contentText)}
					/>
				</View>
				<TouchableOpacity style={{ alignItems: 'flex-end', paddingRight: 10 }}>
					<Text>Placeholder</Text>
				</TouchableOpacity>
			</SideMenu>
		);
	}

	_addItem() {
		AlertIOS.prompt(
			'Enter a name for your new Kettle',
			'Hint: if you want a less chance of people finding it, try naming it something super unique.',
			[
				{
					text: 'Cancel',
					onPress: () => console.log('Cancel Pressed'),
					style: 'cancel'
				},
				{
					text: 'Create',
					onPress: text => {
						var checkRef = firebase.database().ref('kettles/');

						var contentRef = firebase
							.database()
							.ref('kettles/' + text + '/content');

						checkRef.on('value', snapshot => {
							if (snapshot.hasChild(text)) {
								AlertIOS.alert(
									'Oops!',
									"This Kettle already exists, why don't you try searching for it?"
								);
							} else {
								firebase.database().ref('kettles/' + text + '/').set({
									content: "Remember, Kettle's are open to anyone, so be careful what you put in here"
								});
								Keyboard.dismiss();
								this.refs.menu.close();
								this.state.currentKettle = text;
								contentRef.on('value', snapshot => {
									this.setState({ contentText: snapshot.val() });
								});
							}
						});
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
