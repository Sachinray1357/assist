import {ActivityIndicator, View} from 'react-native';
import React, {Component} from 'react';

export default class Loader extends Component {
  render() {
    return (
      <View
        style={{
          position: 'absolute',
          flex: 1,
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          zIndex: 10,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0,0,0,0.4)',
        }}>
        <ActivityIndicator size={'large'} color="#09C6F9" />
      </View>
    );
  }
}
