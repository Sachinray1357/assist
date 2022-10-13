import { MeetingHandler, MeetingStartRequest } from "vani-meeting-client";

import CallKitHandler from "./CallKitHandler";
import EventEmitter from 'events';

class WebrtcHandler {
  static instance?: WebrtcHandler;
  meetingRequest?: MeetingStartRequest;
  meetingHandler: MeetingHandler;
  eventEmitter: EventEmitter;
  roomId?: string;
  isOnCall : boolean;

  static getInstance() {
    if (!WebrtcHandler.instance) {
      WebrtcHandler.instance = new WebrtcHandler();
    }
    return WebrtcHandler.instance;
  }

  constructor() {
    this.meetingHandler = new MeetingHandler();
    this.eventEmitter = new EventEmitter();
    this.isOnCall = false;
    this.getMeetingRequest = this.getMeetingRequest.bind(this);
  }

  cleanUp() {
    this.isOnCall = false;
    // this.unregisterOfEvents()
    console.log('Vani CLeanup');
    if( this.meetingHandler){
      this.getMeetingHandler().endAndDestory();
    }
    this.meetingRequest = undefined;
    this.eventEmitter.removeAllListeners();
    CallKitHandler.getInstance().canEnterPip = false;
    WebrtcHandler.instance = undefined;
  }

  setUp(roomId: string, userId: string, userData: any) {
    if (!this.meetingRequest || this.meetingRequest == null) {
      this.meetingRequest = this.getMeetingHandler().meetingStartRequestObject(
        roomId,
        userId,
        "demo",
        "wss://demoserver2.vanimeetings.com/?connection="
      );
      this.meetingRequest.userData = userData;
      this.meetingRequest.isMobileApp = true;
    }
  }
  getMeetingHandler() {
    if (!this.meetingHandler) {
      this.meetingHandler = new MeetingHandler();
    }
    return this.meetingHandler;
  }
  
  getMeetingRequest() {
    return this.meetingRequest;
  }

}

export default WebrtcHandler;