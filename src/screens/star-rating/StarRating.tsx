import React, { Component } from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { height, width } from '../../styles/Dimension'

import Colors from '../../assets/colors/Colors';

interface FormProps {
  handleRoomCreation: any,
  getUserName?: any,
  getRoomId?: any
}
interface FormState {
}

export default class StarRating extends Component<FormProps, FormState> {
  constructor(props: FormProps) {
    super(props)
  }

  render() {
    console.log('ratings--');

    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <TextInput
          placeholder='Name'
          placeholderTextColor='gray'
          style={styles.input}
          // value={this.state.message}
          onChangeText={this.props.getUserName}
        />
        <TextInput
          placeholder='Name'
          placeholderTextColor='gray'
          style={styles.input}
          // value={this.state.message}
          onChangeText={this.props.getRoomId}
        />
        <TouchableOpacity
        style={{ backgroundColor:Colors.headerColor, width:width*0.8, height:height*0.05,marginTop:5, }}
        onPress={this.props.handleRoomCreation}>
          <Text>Create Room</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  input: {
    width: width * 0.90,
    height: height * 0.07,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    paddingHorizontal: 12,
    fontSize:15,
    marginTop:5,
    color:Colors.primaryBlackColor
  },
})