import { StyleSheet } from 'react-native';

export const constants = {
  actionColor: '#24CE84'
};

export const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
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
    display: 'flex',
    backgroundColor: '#fff',
    borderBottomColor: '#eee',
    borderColor: 'transparent',
    borderWidth: 1,
    height: 44,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10
  },

  navbarTitle: {
    color: '#444',
    fontSize: 16,
    fontWeight: '500'
  },
  sidemenu: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 20
  },
  sidemenuText: {
    height: 40,
    paddingLeft: 10
  },
  statusbar: {
    backgroundColor: '#fff',
    height: 22
  },
  sidemenuButton: {
    margin: 10
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
  }
});
