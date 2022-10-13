import {Dimensions, StatusBar, Platform} from 'react-native';
export const height = Dimensions.get('window').height;
export const width = Dimensions.get('window').width;
export const statusBarHeight = StatusBar.currentHeight;
export const os = Platform.OS;