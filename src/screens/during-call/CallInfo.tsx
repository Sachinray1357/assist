import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';

import Icons from '../../constants/Icons';

export default class CallAccpt_Decline extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.popup}>
          <View style={styles.btn}>
            <View style={styles.greenbtn}>
              <Icons.Ionicons
                name="close"
                size={30}
                color={'#000'}
                style={{
                  marginBottom: 5,
                  alignSelf: 'center',
                }}
              />
            </View>
            <View style={styles.redbtn}>
              <Icons.Ionicons
                name="ios-checkmark-sharp"
                size={30}
                color={'#000'}
                style={{
                  marginBottom: 5,
                  alignSelf: 'center',
                }}
              />
            </View>
          </View>
        </View>
        <View style={styles.text}>
          <Text style={{marginRight: 40, fontSize: 18, color: 'black'}}>
            Decline
          </Text>
          <Text style={{fontSize: 18, color: 'black'}}>Accept</Text>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    //backgroundColor: 'pink'
  },
  popup: {
    height: '40%',
    width: '80%',
    backgroundColor: '#fff',
    alignSelf: 'center',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'white',
    elevation: 4,
  },
  btn: {
    bottom: 0,
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-around',
    //backgroundColor:'red',
    width: '100%',
    height: '10%',
  },
  greenbtn: {
    height: 70,
    width: 70,
    backgroundColor: 'red',
    borderRadius: 40,
    justifyContent: 'center',
    marginTop: -5,
  },
  redbtn: {
    height: 70,
    width: 70,
    backgroundColor: 'green',
    borderRadius: 40,
    justifyContent: 'center',
    marginTop: -5,
  },
  text: {
    height: '15%',
    width: '80%',
    //backgroundColor:'blue',
    alignSelf: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row',
    padding: 25,
    alignItems: 'center',
  },
});
