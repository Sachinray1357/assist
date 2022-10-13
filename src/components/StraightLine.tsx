import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { height, width } from '.././styles/Dimension'

import Colors from '../assets/colors/Colors';

interface StraightLineProps {
  title?: any;
}

export default class StraightLine extends Component<StraightLineProps, {}> {
  static defaultProps = {
    styles: {},
  };
  render() {
    return (
        <View style={{ width: width * 0.9, height: height * 0.1, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
        <View style={{ width: '43%', borderBottomWidth: 0.5, borderColor: 'gray' }} />
        <Text style={{ fontWeight: 'bold', fontSize: 17, color: 'gray' }}>{this.props.title}</Text>
        <View style={{ width: '43%', borderBottomWidth: 0.5, borderColor: 'gray' }} />
      </View>
    );
  }
}
