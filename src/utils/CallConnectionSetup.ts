import CallKitHandler, { CallKitEvents, CallStatus } from './CallKitHandler';
import { MessagePayload, VaniEvent } from 'vani-meeting-client';
import { Track, TrackKind } from 'vani-meeting-client/lib/model/Track';

import { Participant } from 'vani-meeting-client/lib/model/Participant';
import Utility from './utility';
import VideoHandler from './WebrtcHandler';

export class CallConnectionSetup {
  static instance?: CallConnectionSetup;
  static getInstance() {
    if (!CallConnectionSetup.instance) {
      CallConnectionSetup.instance = new CallConnectionSetup();
    }
    return CallConnectionSetup.instance;
  }

  constructor() {
    this.onInitDone = this.onInitDone.bind(this);
    this.onSocketConnected = this.onSocketConnected.bind(this);
    this.startAudio = this.startAudio.bind(this);
    this.onNewChatMessageReceived = this.onNewChatMessageReceived.bind(this);
    this.disconnectCall = this.disconnectCall.bind(this);
    this.registerEvents = this.registerEvents.bind(this);
    this.onCallDeclined = this.onCallDeclined.bind(this);
    this.onCallAccpted = this.onCallAccpted.bind(this);
    this.onNewIncomingCall = this.onNewIncomingCall.bind(this);
    this.onUserLeft = this.onUserLeft.bind(this);
    this.onAllParticipants = this.onAllParticipants.bind(this)
    this.onTrack = this.onTrack.bind(this)
    this.registerEvents();
  }

  registerEvents() {
    CallKitHandler.getInstance().eventEmitter.on(
      CallKitEvents.OnNewIncomingCall,
      this.onNewIncomingCall,
    );
    CallKitHandler.getInstance().eventEmitter.on(CallKitEvents.OnCallDeclined, this.onCallDeclined);
    CallKitHandler.getInstance().eventEmitter.on(CallKitEvents.OnCallAccepted, this.onCallAccpted);

  }
  onCallDeclined() {
    CallConnectionSetup.getInstance().disconnectCall()
  }
  onCallAccpted() {
    CallKitHandler.getInstance().callStatus = CallStatus.CallAnswered;
    VideoHandler.getInstance()
      .getMeetingHandler()
      .getEventEmitter()
      ?.off(VaniEvent.OnTrack, this.onTrack);

    VideoHandler.getInstance().getMeetingHandler().getAllTracks().forEach(track => {
      if(track.isLocalTrack === false && track.trackKind === TrackKind.Audio){
        VideoHandler.getInstance().getMeetingHandler().resumeIncomingTrack(track)
      }
    })
    const selfParticipant = VideoHandler.getInstance().getMeetingHandler().participantByUserId(VideoHandler.getInstance().getMeetingRequest()!.userId)
    if(selfParticipant){
      selfParticipant.userData.callStatus = CallStatus.CallAnswered
    }
    // const participant = VideoHandler.getInstance().getMeetingHandler().getAllParticipants().find(participant => (participant.userData.isVisitor && participant.userData.isVisitor === true ))
    // if(participant){
    //   const messagePayload = new MessagePayload("CallAccpeted",participant.userId)
    //   messagePayload.type = "CallAccepted"
    //   VideoHandler.getInstance().getMeetingHandler().sendMessage(messagePayload)
    // }
    // else{
    //     console.log("Participant not found")
    // }

  }
  onNewIncomingCall(data: any) {
    if (data && data.data && data.data.payload) {
      const payload = JSON.parse(data.data.payload)
      console.log(payload)

      // const home = payload.home;
      const roomId = payload.roomId;
      this.startCallSetup(roomId);
      console.log('onNewIncomingCall ', roomId);
    }
  }

  async startCallSetup(roomId: string) {
    if (!VideoHandler.getInstance().isOnCall) {
      VideoHandler.getInstance().setup(roomId, { isMobileUser: true, userId : await Utility.getUserIdFromAsyncStorage() , callStatus : CallStatus.IncomingCall });
      VideoHandler.getInstance()
        .getMeetingHandler()
        .getEventEmitter()
        ?.off(VaniEvent.OnInitDone, this.onInitDone);
      VideoHandler.getInstance()
        .getMeetingHandler()
        .getEventEmitter()
        ?.on(VaniEvent.OnInitDone, this.onInitDone);
      VideoHandler.getInstance().getMeetingHandler().init();
    }

  }

  onInitDone() {
    console.log("onInitDone")
    VideoHandler.getInstance()
      .getMeetingHandler()
      .getEventEmitter()
      ?.off(VaniEvent.OnInitDone, this.onInitDone);
    VideoHandler.getInstance()
      .getMeetingHandler()
      .getEventEmitter()
      ?.off(VaniEvent.OnSocketConnected, this.onSocketConnected);
    VideoHandler.getInstance()
      .getMeetingHandler()
      .getEventEmitter()
      ?.off(VaniEvent.OnAllParticipants, this.onAllParticipants);
    VideoHandler.getInstance()
      .getMeetingHandler()
      .getEventEmitter()
      ?.on(VaniEvent.OnAllParticipants, this.onAllParticipants);
    VideoHandler.getInstance()
      .getMeetingHandler()
      .getEventEmitter()
      ?.on(VaniEvent.OnSocketConnected, this.onSocketConnected);
    VideoHandler.getInstance()
      .getMeetingHandler()
      .getEventEmitter()
      ?.on(VaniEvent.OnUserLeft, this.onUserLeft);
    VideoHandler.getInstance()
      .getMeetingHandler()
      .getEventEmitter()
      ?.on(VaniEvent.OnTrack, this.onTrack);
    VideoHandler.getInstance()
      .getMeetingHandler()
      .getEventEmitter()
      ?.on(VaniEvent.OnNewChatMessageReceived, this.onNewChatMessageReceived);
    VideoHandler.getInstance().getMeetingHandler().checkSocket();
  }

  onAllParticipants(participants: Participant[]): void {
    console.log("onAllParticipants", participants);

    if (participants && participants.length > 0) {
      const visitor = participants.find((participant) => participant.userData.isVisitor === true)
      if (visitor) {
        CallKitHandler.getInstance().showCallNotification()
        return;
      }
    }
    CallKitHandler.getInstance().onCallDeclined(undefined);
    this.disconnectCall()
  }
  onTrack(track: Track) {
    if (track && track.isLocalTrack === false && CallKitHandler.getInstance().callStatus !== CallStatus.CallAnswered && track.trackKind === TrackKind.Audio) {
      VideoHandler.getInstance().getMeetingHandler().pauseIncomingTrack(track)
    }
  }
  onUserLeft(participant: Participant) {
    console.log("onUserLeft pre");
    if (participant.userData.isVisitor) {
      console.log("onUserLeft");
      CallKitHandler.getInstance().onCallDeclined(undefined);
    }
  }

  onSocketConnected() {
    console.log("onSocketConnected")
    VideoHandler.getInstance().getMeetingHandler().startMeeting();
    VideoHandler.getInstance().getMeetingHandler().getUpdatedParticipantsListFromServer()
    VideoHandler.getInstance().getMeetingHandler().getAllTracks().forEach(track => {
      this.onTrack(track)
    })
  }

  onNewChatMessageReceived(messagePayload: MessagePayload) {
    if (messagePayload.type === 'CallAccepted' && CallKitHandler.getInstance().callStatus !== CallStatus.CallAnswered) {
      // this.disconnectCall();
      CallKitHandler.getInstance().onCallDeclined(undefined);

    }
  }

  startAudio() {
    VideoHandler.getInstance()
      .getMeetingHandler()
      .startLocalStream(false, true);
  }

  disconnectCall() {
    VideoHandler.getInstance().cleanUp();
    CallKitHandler.getInstance().currentCallData = undefined;
    CallKitHandler.getInstance().callStatus = CallStatus.None;
  }
}
