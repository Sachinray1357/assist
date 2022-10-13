import {NativeModules} from 'react-native';
const {NotificationHandlerModule, contactIntentModule} = NativeModules;
module.exports = NotificationHandlerModule;

export {contactIntentModule};
