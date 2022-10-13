import AsyncStorage from '@react-native-async-storage/async-storage';
import Call from '../screens/call/Call';
import { CallConnectionSetup } from './CallConnectionSetup';
import { DeviceEventEmitter } from 'react-native';
import EventEmitter from 'events';
import NotificationHandlerModule from './NativeModulesHandler';
import { PermissionsAndroid } from 'react-native';
import { Platform } from 'react-native';
import VideoHandler from './WebrtcHandler';
import VoipPushNotification from 'react-native-voip-push-notification';
import messaging from '@react-native-firebase/messaging';

// import RNCallKeep from 'react-native-callkeep';




export enum CallKitEvents {
  ShowFullScreenIncomingCall = 'ShowFullScreenIncomingCall',
  OnNewIncomingCall = 'OnNewIncomingCall',
  OnCallAccepted = 'OnCallAccepted',
  OnCallDeclined = 'OnCallDeclined',
}
export enum CallStatus {
  None = 'None',
  IncomingCall = 'IncomingCall',
  CallAnswered = 'CallAnswered',
}

class CallKitHandler {
  static instance = new CallKitHandler();
  isRinging: boolean = false;
  canEnterPip: boolean = false;
  eventEmitter: EventEmitter = new EventEmitter();
  currentCallData: any = undefined;
  callStatusWhenKilled?: String = undefined;
  fcmTopics: Array<String> = [];
  callStatus: CallStatus = CallStatus.None;
  isDynamicLinkOnLinkSubscribed: boolean = false
  static getInstance() {
    if (CallKitHandler.instance === null) {
      CallKitHandler.instance = new CallKitHandler();
    }
    return CallKitHandler.instance;
  }

  constructor() {
    this.onCallDeclined = this.onCallDeclined.bind(this);
    this.setupVoipNotification = this.setupVoipNotification.bind(this);
    this.subscibeToFullScreenIntentNotification =
      this.subscibeToFullScreenIntentNotification.bind(this);
    this.setUpRNCallKeep = this.setUpRNCallKeep.bind(this);
    this.handleMessgingBackground = this.handleMessgingBackground.bind(this);
    this.showCallNotificationForAndroid =
      this.showCallNotificationForAndroid.bind(this);
    this.handleFCMMessage = this.handleFCMMessage.bind(this);
    this.configureNotificationHandler =
      this.configureNotificationHandler.bind(this);
    this.getCurrentEvents = this.getCurrentEvents.bind(this);
    this.showCallNotification = this.showCallNotification.bind(this);
  }

  setUp() {
    if (Platform.OS === 'ios') {
      this.setUpRNCallKeep();
      this.setupVoipNotification();
    } else {
      this.configureNotificationHandler();
    }
  }

  handleMessgingBackground() {
    messaging().onMessage(async (remoteMessage: any) => {
      // if (!this.currentCallData || this.currentCallData.data.type !== remoteMessage.data.type ) {
      console.log('onMessage', 'New Call');
      this.handleFCMMessage(remoteMessage);
      // }
    });
    messaging().setBackgroundMessageHandler(async (remoteMessage: any) => {
      // if (!this.currentCallData || this.currentCallData.data.type !== remoteMessage.data.type) {
      console.log('setBackgroundMessageHandler', 'New Call');
      this.handleFCMMessage(remoteMessage);
      // }
    });
  }

  handleFCMMessage(message: any) {
    if (!message) {
      return
    }
    if
      (
      message.data.type === 'VaniNewCall' ||
      message.data.type === 'HeatupNewCall'
    ) {
      console.log('Sachin', message);

      if (this.currentCallData) {
        const currentCallDataPayload = JSON.parse(
          this.currentCallData.data.payload,
        );
        const cureentDataRoomId = currentCallDataPayload.roomId;
        const messagePayload = JSON.parse(message.data.payload);
        const messageRoomId = messagePayload.roomId;

        if (
          this.currentCallData.data.type === message.data.type &&
          cureentDataRoomId === messageRoomId
        ) {
          //REpeated Notification
          console.log('REpeated Notification');
          return;
        } else if (
          this.currentCallData.data.type === message.data.type &&
          cureentDataRoomId !== messageRoomId
        ) {
          //Room Changed toh phir se setup
          CallConnectionSetup.getInstance().disconnectCall();
          this.currentCallData = undefined;
        }
        // else if (this.currentCallData.data.type === 'HeatupNewCall'
        //   && message.data.type === 'VaniNewCall' && cureentDataRoomId === messageRoomId) {
        // }
        else if (
          this.currentCallData.data.type === 'HeatupNewCall' &&
          message.data.type === 'VaniNewCall' &&
          cureentDataRoomId !== messageRoomId
        ) {
          CallConnectionSetup.getInstance().disconnectCall();
          this.currentCallData = undefined;
        } else if (
          this.currentCallData.data.type === 'VaniNewCall' &&
          message.data.type === 'HeatupNewCall'
        ) {
          return;
        }
      }
      this.currentCallData = message;

      if (
        message.data.type === 'VaniNewCall' &&
        VideoHandler.getInstance().isOnCall === true &&
        VideoHandler.getInstance().getMeetingHandler().isWebScoketConnected()
      ) {
        this.showCallNotification();
      } else {
        this.configureNotificationHandler();
        CallConnectionSetup.getInstance();
        this.showCallNotificationForAndroid(message);
      }
    }

    // if(message.data.type === 'VaniNewCall'){

    // }
  }

  showCallNotificationForAndroid(remoteMessage: any) {
    this.isRinging = true;
    this.eventEmitter.emit(CallKitEvents.OnNewIncomingCall, remoteMessage);
  }

  onCallDeclined(remoteMessage: any | undefined) {
    if (this.currentCallData) {
      console.log('OnCallDeclined');
      // this.currentCallData = undefined
      this.callStatusWhenKilled = CallKitEvents.OnCallDeclined;
      this.eventEmitter.emit(CallKitEvents.OnCallDeclined, remoteMessage);
      console.log('Call Declined');
      this.isRinging = false;
      NotificationHandlerModule.onCallDeclined();
    }
  }

  onCallAcpptedFromAPP() {
    if (this.currentCallData) {
      NotificationHandlerModule.onCallAccepted();
      // this.currentCallData = undefined
    }
  }

  showCallNotification() {
    console.log('showCallNotification', this.currentCallData);

    if (
      this.currentCallData &&
      this.currentCallData.data.type === 'VaniNewCall'
    ) {
      const visitor = VideoHandler.getInstance()
        .getMeetingHandler()
        .getAllParticipants()
        .find(participant => participant.userData.isVisitor === true);
      if (visitor) {
        this.callStatus = CallStatus.IncomingCall;
        NotificationHandlerModule.showCallNotificationForData(
          JSON.stringify(this.currentCallData),
          (callStatus: string) => {
            if (callStatus === 'denied') {
              //  this.onCallDeclined(remoteMessage)
            } else {
              // this.eventEmitter.emit(CallKitEvents.OnCallAccepted, remoteMessage);
              console.log('Call Accepted');
            }
          },
        );
      }
    }
  }

  setupVoipNotification() {
    VoipPushNotification.addEventListener('register', token => {
      // --- send token to your apn provider server
      this.onVoipPushNotificationRegistered(token);
    });

    VoipPushNotification.addEventListener('didLoadWithEvents', events => {
      // --- this will fire when there are events occured before js bridge initialized
      // --- use this event to execute your event handler manually by event type

      if (!events || !Array.isArray(events) || events.length < 1) {
        return;
      }
      for (let voipPushEvent of events) {
        let { name, data } = voipPushEvent;
        if (name === 'register') {
          this.onVoipPushNotificationRegistered(data);
        }
        //  else if (name === VoipPushNotification.RNVoipPushRemoteNotificationReceivedEvent) {
        //     this.onVoipPushNotificationiReceived(data);
        // }
      }
    });
    VoipPushNotification.registerVoipToken(); // --- register token
  }
  onVoipPushNotificationRegistered(token: any) {
    console.log('Voip Token', token);
  }
  setUpRNCallKeep() {
    const options = {
      ios: {
        appName: 'DoorVi',
      },
      android: {
        alertTitle: 'Permissions required',
        alertDescription:
          'This application needs to access your phone accounts',
        cancelButton: 'Cancel',
        okButton: 'ok',
        imageName: 'phone_account_icon',
        additionalPermissions: [PermissionsAndroid.PERMISSIONS.example],
        // Required to get audio in background when using Android 11
        foregroundService: {
          channelId: 'com.company.my',
          channelName: 'Foreground service for my app',
          notificationTitle: 'My app is running on background',
          notificationIcon: 'Path to the resource icon of the notification',
        },
      },
    };

    // RNCallKeep.setup(options).then(accepted => { });
  }

  configureNotificationHandler() {
    console.log('configureNotificationHandler');
    DeviceEventEmitter.addListener('ShowIncomingViewCallback', (data: any) => {
      console.log('Show Incoming Call View');
      this.eventEmitter.emit(CallKitEvents.ShowFullScreenIncomingCall, data);
    });
    DeviceEventEmitter.addListener('OnCallDeclined', (data: any) => {
      this.onCallDeclined(data);
    });
    DeviceEventEmitter.addListener('OnCallAccpted', (data: any) => {
      console.log('OnCallAccpted');
      if (this.currentCallData) {
        this.callStatusWhenKilled = CallKitEvents.OnCallAccepted;
        // this.currentCallData = undefined
        this.eventEmitter.emit(CallKitEvents.OnCallAccepted, data);
      }
    });
  }

  getCurrentEvents() {
    console.log('getCurrentEvents');
    NotificationHandlerModule.getCurrentEvents();
  }

  clearCurrentEvents() {
    NotificationHandlerModule.infromOnNewCall();
  }
  async subscibeToFullScreenIntentNotification(topic: string) {
    console.log("subscibeToFullScreenIntentNotification", topic);
    messaging().subscribeToTopic(topic);
    this.fcmTopics.push(topic);
    await AsyncStorage.setItem('topics', JSON.stringify(this.fcmTopics));
  }

  unsubscibeToFullScreenIntentNotification(topic: string) {
    console.log("unsubscibeToFullScreenIntentNotification", topic);
    messaging().unsubscribeFromTopic(topic);
  }
}

export default CallKitHandler;
