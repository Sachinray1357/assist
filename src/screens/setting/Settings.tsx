import { Image, ImageBackground, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { Component } from 'react';
import { height, width } from '../../styles/Dimension';

import Colors from '../../assets/colors/Colors';
import Icons from '../../constants/Icons';
import ImagePath from '../../constants/ImagePath';
import MenuItem from '../../components/MenuItem';
import Status from '../../components/Status';
import styles from './styles';

interface SettingProps {
}
interface SettingState {
}

export class Settings extends Component {
    render() {
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar barStyle='dark-content' backgroundColor={Colors.bgColor} />
                <View style={styles.headerView}>
                    <Text style={{ fontWeight: 'bold', fontSize: 20, color: Colors.primaryBlackColor }}>Settings</Text>
                </View>
                <View style={styles.profileContainer}>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={styles.picContainer}>
                        <View style={styles.profilePic}>
                            <Image source={ImagePath.profile} style={{ width: width * 0.25, height: height * 0.123, }} />
                        </View>
                        <View style={styles.editIconContainer}>
                            <Icons.MaterialIcons name='edit' size={22} color='gray' />
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.profileTextContainer}>
                    <Text style={{ fontWeight: 'bold', fontSize: 18, color: Colors.primaryBlackColor }}>Codeplay</Text>
                    <Text style={{ fontWeight: '600', fontSize: 16, color: 'gray' }}>codeplay@gmail.com</Text>
                </View>
                <View style={styles.menuWrap}>
                    <Status
                        title="Current status:"
                        // status='Online'
                        Icon={
                            <Icons.Oct name='dot-fill' size={20} color='green' />
                        }
                    />
                    <MenuItem
                        title="Notification"
                        // onPress={() => {
                        //     this.handleAddHome();
                        // }}
                        Icon={
                            <Icons.Ionicons name='notifications' size={20} color='gray' />
                        }
                    />
                    <MenuItem
                        title="Logout"
                        // onPress={() => {
                        //     this.handleAddHome();
                        // }}
                        Icon={
                            <Icons.MaterialIcons name='logout' size={20} color='gray' />
                        }
                    />
                </View>
            </SafeAreaView>
        )
    }
}

export default Settings;