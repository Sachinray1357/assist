import {Image, StyleSheet} from 'react-native';
import React, {Component} from 'react';

import ImagePath from '../constants/ImagePath';
import {width} from '../styles/Dimension';

export default class LogoWithTitle extends Component {
  render() {
    return (
      <>
        <Image
          source={ImagePath.logo_Title}
          resizeMode="center"
          style={styles.logoTitle}
        />
      </>
    );
  }
}

const styles = StyleSheet.create({
  logoTitle: {
    width: width * 0.60,
    bottom: 40,
  },
});
