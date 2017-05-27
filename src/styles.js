import { StyleSheet } from 'react-native';

export const constants = {
	actionColor: '#24CE84'
};

export const styles = StyleSheet.create({
	container: {
		backgroundColor: '#f2f2f2',
		flex: 1
	},
	listview: {
		flex: 1
	},
	li: {
		backgroundColor: '#fff',
		borderBottomColor: '#eee',
		borderColor: 'transparent',
		borderWidth: 1,
		paddingLeft: 16,
		paddingTop: 14,
		paddingBottom: 16
	},
	liContainer: {
		flex: 2
	},
	liText: {
		color: '#333',
		fontSize: 16
	},
	navbar: {
		alignItems: 'center',
		backgroundColor: '#fff',
		borderBottomColor: '#eee',
		borderColor: 'transparent',
		borderWidth: 1,
		height: 44,
		justifyContent: 'center',
		flexDirection: 'row',
		paddingLeft: 10
	},
	navbarTitle: {
		color: '#444',
		fontSize: 16,
		fontWeight: '500',
		justifyContent: 'center'
	},
	sidemenu: {
		flex: 1,
		backgroundColor: '#fff',
		paddingTop: 20
	},
	sidemenuText: {
		height: 40,
		paddingLeft: 14
	},
	statusbar: {
		backgroundColor: '#fff',
		height: 22
	},
	center: {
		textAlign: 'center'
	},
	actionText: {
		color: '#fff',
		fontSize: 16,
		textAlign: 'center'
	},
	linkText: {
		fontSize: 12,
		textAlign: 'center'
	},
	action: {
		justifyContent: 'flex-end',
		backgroundColor: constants.actionColor,
		borderColor: 'transparent',
		borderWidth: 1,
		paddingLeft: 16,
		paddingRight: 16,
		paddingTop: 14,
		paddingBottom: 16
	}
});
