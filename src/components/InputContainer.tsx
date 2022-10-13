import React, { Component } from 'react'
import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { height, width } from '../styles/Dimension';

import Colors from '../assets/colors/Colors';

interface InputAreaProps {
    placeHolderTitle: any,
    Icon?: any,
    styles?: any,
    secureTextEntry?: any,
    placeholderColor: any,
    onPress?:any,
    value?:any,
    onChange?:any,
    onChangeText?:any,
    keyboardType?:any,
}

interface InputAreaState {
    isVisible: boolean,
}

export class InputArea extends Component<InputAreaProps, InputAreaState> {
    static defaultProps = {
        styles: {},
    };
    constructor(props: InputAreaProps) {
        super(props);
        this.state = {
            isVisible: false
        }
    }

   
    render() {
        return (
            <View style={styles.inputContainer}>
                <TextInput
                    style={[styles.inputArea, { ...this.props.styles }]}
                    placeholder={this.props.placeHolderTitle}
                    secureTextEntry={this.props.secureTextEntry}
                    placeholderTextColor={this.props.placeholderColor}
                    value={this.props.value}
                    onChange={this.props.onChange}
                    onChangeText={this.props.onChangeText}
                    keyboardType={this.props.keyboardType}
                />
                <TouchableOpacity onPress={this.props.onPress} style={styles.iconWrap}>
                    {this.props.Icon}
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    inputContainer: {
        width: width * 0.90,
        height: height * 0.1,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        // backgroundColor:'red'
    },
    inputArea: {
        width: width * 0.90,
        height: height * 0.07,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        paddingHorizontal: 12,
        fontSize:15,
        color:Colors.primaryBlackColor
    },
    iconWrap: {
        width: '9.2%',
        height: 31,
        justifyContent: 'center',
        alignItems: 'center',
        right: 50
    },
});



export default InputArea;