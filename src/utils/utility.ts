import {
  getBaseOs,
  getDeviceName,
  getSystemVersion,
} from 'react-native-device-info';

import AsyncStorage from '@react-native-async-storage/async-storage';
import queryString from 'query-string';

// import { isValidPhoneNumber } from 'libphonenumber-js';


class Utility {
  static getUserIdFromAsyncStorage = async () => {
    const id = await AsyncStorage.getItem('id');
    return id;
  };
  static getDeviceName = async () => {
    return await getDeviceName();
  };

  static getDeviceOs = async () => {
    return await getBaseOs();
  };

  static getHomeId(url: string): any {
    const queryParmas = queryString.parseUrl(url);
    return { qrId: queryParmas.query.vm, domain: queryParmas.url };
  }

  // static isPhoneNumberValid = (number: string) => {
  //   return !isValidPhoneNumber(`+${number}`);
  // };
  static getOSVersion = () => {
    return parseFloat(getSystemVersion());
  };
}

export default Utility;
