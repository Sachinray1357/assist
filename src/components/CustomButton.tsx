import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { height, width } from '.././styles/Dimension'

import Colors from '../assets/colors/Colors';

interface CustomButtonProps {
  onPress?: any;
  title?: any;
  title2?: any;
  Icon?: any;
  styles?: any;
}

export default class CustomButton extends Component<CustomButtonProps, {}> {
  static defaultProps = {
    styles: {},
  };
  render() {
    return (
      <TouchableOpacity
        onPress={this.props.onPress}
        style={[styles.btnContainer, {...this.props.styles}]}>
        {this.props.Icon}
        <Text style={styles.btnText}>{this.props.title}</Text>
        <Text style={styles.btnText2}>{this.props.title2}</Text>
      </TouchableOpacity>
      // <TouchableOpacity
      //   activeOpacity={0.7}
      //   onPress={this.props.onPress}
      //   style={[styles.btn, {...this.props.styles}]}>
      //   {this.props.Icon}
      //   <Text style={styles.btnTitle}>{this.props.title}</Text>
      // </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  btnContainer: {
    width: '90%',
    paddingVertical: 12,
    backgroundColor: Colors.primaryBtnColor,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    flexDirection: 'row',
    // alignSelf:'baseline',
  },
  btnText: {
    color: Colors.btnTxtColor,
    fontSize: 16,
    fontFamily: 'p-500',
    fontWeight:'bold'
  },
  btnText2: {
    color: Colors.headerColor,
    fontSize: 16,
    fontFamily: 'p-500',
    fontWeight:'bold',
    left:8
  },
  btn: {
    width: width * 0.18,
    height: height * 0.09,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 10,
},
btnTitle: {
    color: 'white',
    fontWeight: 'bold',
}
});
