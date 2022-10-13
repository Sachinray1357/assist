import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import Icons from '../constants/Icons'

interface MenuItemProps {
  // menuIcon: Element;
  Icon?: any;
  title: string;
  onPress: any;
  styles?: any;
}

export default class MenuItem extends Component<MenuItemProps, {}> {
  constructor(props: MenuItemProps) {
    super(props);
  }
  public static defaultProps = {
    onPress: null,
  };
  render() {
    return (
      <TouchableOpacity activeOpacity={0.7} onPress={this.props.onPress}
        style={[styles.menuItem, { ...this.props.styles }]}>
        <View style={styles.iconWrap}>
          {this.props.Icon}
        </View>
        <View style={[styles.menuItemWrap, { ...this.props.styles }]}>
          <Text
            style={{
              fontFamily: 'p-500',
              color: '#000',
              fontWeight:'700',
              fontSize:15
            }}>
            {this.props.title}
          </Text>
        </View>
        <Icons.FontAwesome name='angle-right' size={25} color='black' />
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: 'red',
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
