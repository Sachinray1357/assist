import {StyleSheet, Text, View} from 'react-native';

import React from 'react';
import {TouchableOpacity} from 'react-native';

export default function RoundBtn(props: any) {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={{
        backgroundColor: props.backgroundColor || '#fff',
        width: 50,
        height: 50,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 10,
        ...props.styles
      }}>
      {props.Icon}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({});
