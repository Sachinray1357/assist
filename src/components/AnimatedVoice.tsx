import {
  Animated,
  Button,
  Image,
  LayoutAnimation,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import ImagePath from '../constants/ImagePath';
import React from 'react';
import {width} from '../styles/Dimension';

interface UserInfoProps {
  info: any;
}
interface UserInfoState {
  animated: any;
  opacityA: any;
  isPressed: boolean;
}
export default class UserInfo extends React.Component<
  UserInfoProps,
  UserInfoState
> {
  constructor(props: UserInfoProps) {
    super(props);
    this.state = {
      isPressed: true,
      animated: new Animated.Value(0),
      opacityA: new Animated.Value(1),
    };

    this._onPress = this._onPress.bind(this);
  }
  _onPress() {
    this.setState(state => ({
      isPressed: !state.isPressed,
    }));
  }

  render() {
    const {isPressed, animated, opacityA} = this.state;
    return (
      <View style={styles.container}>
        <View
          style={{
            width: 82,
            height: 82,
            borderRadius: 50,
            backgroundColor: '#fff',
            opacity: 1,
            overflow: 'hidden',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: '20%',
          }}>
          <Image
            style={{
              width: '100%',
              height: '100%',
            }}
            source={ImagePath.profile}
          />
        </View>
        <Text
          style={{
            color: '#fff',
            fontSize: 20,
            fontFamily: 'p-500',
            marginTop: '6%',
          }}>
          {this.props.info.homeTitle}
        </Text>
        <Text
          style={{
            color: '#fff',
            fontSize: 20,
            marginTop: '1%',
            fontFamily: 'p-600',
            // marginBottom:'80%'
          }}>
          Visitor Ringing...
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: 'transparent',
    position: 'absolute',
    zIndex: 120,
    width: width,
  },
  container1: {
    // flex:1,
    backgroundColor: '#045DE9',
    marginTop: '20%',
    width: '100%',
    alignItems: 'center',
    // justifyContent:'flex-start',
    // backgroundColor:'red'
  },
});
