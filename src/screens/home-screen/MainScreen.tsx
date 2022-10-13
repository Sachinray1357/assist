import React, { Component } from 'react';
import { SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { height, width } from '../../styles/Dimension';

import CustomButton from '../../components/CustomButton';
import Demovideo2 from '../../assets/video/Demovideo2.mp4';
import Icons from '../../constants/Icons';
import Video from 'react-native-video';

export default class MyComponent extends Component {

    render() {

        return (
            <SafeAreaView>
                <StatusBar barStyle='light-content' backgroundColor='transparent' translucent={true} />
                <Video
                    source={Demovideo2}
                    paused={false}
                    style={styles.backgroundVideo}
                    repeat={true}
                    resizeMode='cover'
                />
                <View style={styles.btnContainer}>
                    <CustomButton
                    Icon={
                        <Icons.FontAwesome5 name='video' size={30} color='white' />
                    }
                    title='Video'
                    />
                    <CustomButton
                    Icon={
                        <Icons.FontAwesome5 name='microphone' size={30} color='white' />
                    }
                    title='Audio'
                    />
                    <CustomButton
                    Icon={
                        <Icons.Ionicons name='chatbox' size={30} color='white' />
                    }
                    title='Chat'
                    />
                </View>
            </SafeAreaView>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        // flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    backgroundVideo: {
        width: width,
        height: height * 1.2,
        justifyContent: 'center',
        alignItems: 'center'
    },

    btnContainer: {
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        width: width,
        height: height * 0.14,
        flexDirection:'row',
        position: 'absolute',
        justifyContent: 'space-between',
        alignSelf: 'center',
        top: 660,
        zIndex: 10,
        padding: 10,
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
})
