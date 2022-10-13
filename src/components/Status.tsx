import React, { Component } from 'react';
import { StyleSheet, Switch, Text, View } from 'react-native';

import Icons from '../constants/Icons'

interface StatusProps {
    // menuIcon: Element;
    Icon?: any;
    title: string;
    onPress: any;
    styles?: any;
    status?:string;
}

interface StatusState {
    toggle: boolean,
}

export default class Status extends Component<StatusProps, StatusState> {
    constructor(props: StatusProps) {
        super(props);
        this.state = {
            toggle: false,
        }
    }
    public static defaultProps = {
        onPress: null,
    };

    toggleAlert = () => {
        if (this.state.toggle) {
         this.setState({toggle:false})
        } else {
            this.setState({toggle:true})
        }
      };

    render() {
        return (
            <View 
                style={[styles.menuItem, { ...this.props.styles }]}>
                <View style={styles.iconWrap}>
                    {/* {this.props.Icon} */}
                    <Icons.Oct name='dot-fill' size={20} color={this.state.toggle ? 'green' : 'gray'} />
                </View>
                <View style={[styles.menuItemWrap, { ...this.props.styles }]}>
                    <Text
                        style={{
                            fontFamily: 'p-500',
                            color: 'gray',
                            fontWeight: '700'
                        }}>
                        {this.props.title}
                    </Text>
                    <Text
                        style={{
                            fontFamily: 'p-500',
                            color: '#000',
                            fontWeight: '700',
                            fontSize:15
                        }}>
                        {/* {this.props.status} */}
                        {this.state.toggle ? 'Online' : 'Offline'}
                    </Text>
                </View>
                <View
                    pointerEvents="auto"
                    style={{
                        position: 'absolute',
                        right: -5,
                        opacity: 1,
                        zIndex: 1000,
                    }}>
                    <Switch
                        value={this.state.toggle}
                        onValueChange={this.toggleAlert}
                        trackColor={{ false: '#ced4da', true: 'blue' }}
                        thumbColor={this.state.toggle ? 'gray' : 'blue'}
                    />
                </View>
                {/* <Icons.FontAwesome name='angle-right' size={25} color='black' /> */}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        // backgroundColor: 'red'
    },
    menuItemWrap: {
        flex: 1,
        // backgroundColor: 'red',
        borderBottomColor: '#E8E8E8',
        marginLeft: 15,
        paddingVertical: 18,
        borderBottomWidth: 0.2,
    },
    iconWrap: {
        width: '9.2%',
        height: 31,
        backgroundColor: '#ebedf0',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 17
    },
});
