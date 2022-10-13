import {
    BackHandler,
    DeviceEventEmitter,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import {
    GestureHandlerRootView,
    ScrollView,
} from 'react-native-gesture-handler';
import { MediaStream, RTCView } from 'react-native-webrtc';
import { MessagePayload, VaniEvent } from 'vani-meeting-client';
import React, { Component, createRef } from 'react';
import { Track, TrackKind } from 'vani-meeting-client/lib/model/Track';
import { height, width } from '../../styles/Dimension';

import { CallConnectionSetup } from '../../utils/CallConnectionSetup'
import Colors from '../../assets/colors/Colors';
import HomeScreen from '../home-screen/HomeScreen';
import Icons from '../../constants/Icons';
import RoundBtn from '../../components/RoundBtn';
import StarRating from '../star-rating/StarRating';
import WebrtcHandler from '../../utils/WebrtcHandler'

// import InCallManager from 'react-native-incall-manager';




interface CallProps {
    onCallDecline: Function;
    route: any;
    handleRoomCreation?: any,
    getRoomId?: any,
    getUserName?: any
}

interface CallState {
    mediaStream?: MediaStream;
    isMicOff: boolean;
    isModalOpen: boolean;
    isSpeakerOn: boolean;
    pipStatus: boolean;
    userId: string | null;
    usersFromHome: Array<any> | null;
    isInPipMode: Boolean;
    isCamOnOff: boolean;
    videoCall: boolean,
    roomId: string,
    userName: string,
    userId2: any,
}

export default class DuringCall extends Component<CallProps, CallState> {
    private bottomSheetRef: any;
    private snapPoints: any;
    eventListenerSubscription: any;
    constructor(props: any) {
        super(props);
        this.state = {
            mediaStream: undefined,
            isMicOff: false,
            isModalOpen: false,
            usersFromHome: [],
            userId: null,
            isInPipMode: false,
            isCamOnOff: false,
            pipStatus: false,
            isSpeakerOn: true,
            videoCall: false,
            roomId: '',
            userName: '',
            userId2: new Date().getTime().toString(),
        };
        this.handleRoomCreation = this.handleRoomCreation.bind(this),
            this.onInitDone = this.onInitDone.bind(this);
        this.onTrack = this.onTrack.bind(this);
        this.onPermissionApproved = this.onPermissionApproved.bind(this);
        this.onPermissionError = this.onPermissionError.bind(this);
        // this.onMeeting = this.onMeeting.bind(this);
        // this.getRoomId = this.getRoomId.bind(this);
        // this.getUserName = this.getUserName.bind(this);
        this.bottomSheetRef = createRef();
        this.snapPoints = ['14%', '35%'];
        this.eventListenerSubscription = null;
    }

    // onMeeting() {
    //     WebrtcHandler.getInstance().setUp("abc", "54", { name: "mohan" });
    //     WebrtcHandler.getInstance().getMeetingHandler().getEventEmitter()?.on(VaniEvent.OnInitDone, this.onInitDone)
    //     WebrtcHandler.getInstance().getMeetingHandler().init();
    // }

    // componentDidMount() {
    //     WebrtcHandler.getInstance().setUp("r443rvd", "54", { name: "mohan" });
    //     WebrtcHandler.getInstance().getMeetingHandler().getEventEmitter()?.on(VaniEvent.OnInitDone, this.onInitDone)
    //     WebrtcHandler.getInstance().getMeetingHandler().init();
    // }

    handleRoomCreation() {
        console.log('roomId inside', this.state.roomId);
        console.log('userId2 inside', this.state.userId2);
        WebrtcHandler.getInstance().setUp(this.state.roomId, this.state.userId2, {
            name: this.state.userName
        });
        WebrtcHandler.getInstance().getMeetingHandler().getEventEmitter()?.on(VaniEvent.OnInitDone, this.onInitDone);
        WebrtcHandler.getInstance().getMeetingHandler().init();
    }

    onInitDone() {
        WebrtcHandler.getInstance().getMeetingHandler().getEventEmitter()?.off(VaniEvent.OnInitDone, this.onInitDone);
        WebrtcHandler.getInstance().getMeetingHandler().getEventEmitter()?.on(VaniEvent.OnPermissionApproved, this.onPermissionApproved);
        WebrtcHandler.getInstance().getMeetingHandler().getEventEmitter()?.on(VaniEvent.OnPermissionError, this.onPermissionError);
        WebrtcHandler.getInstance().getMeetingHandler().getEventEmitter()?.on(VaniEvent.OnTrack, this.onTrack);
        WebrtcHandler.getInstance().getMeetingHandler().startLocalStream(true, true);
    }

    onPermissionApproved() {
        console.log("permission Granted");
        WebrtcHandler.getInstance().getMeetingHandler().getEventEmitter()?.on(VaniEvent.OnSocketConnected, this.onSocketConnected);
        WebrtcHandler.getInstance().getMeetingHandler().checkSocket();
    }

    onPermissionError() {
        console.log("permission not Granted");
    }

    onSocketConnected = () => {
        console.log("socket is working");
        WebrtcHandler.getInstance().getMeetingHandler().startMeeting();
        console.log("connected with server");
    };

    onTrack(track: any) {
        if (track.isLocalTrack) {
            if (track.trackKind === TrackKind.Video) {
                if (track.track) {
                    // this.localVideo.current.srcObject = new MediaStream([track.track]);
                    this.setState({ mediaStream: new MediaStream([track.track]) });
                }
            }
            else if (track.trackKind === TrackKind.Audio && track.isLocalTrack === false) {
                if (track.track) {
                    this.setState({ mediaStream: new MediaStream([track.track]) });
                }
            }
        }
    }

    // onTrack(track: Track) {
    //     if (track && track.track && track.trackKind === TrackKind.Video) {
    //       console.log('On Track');
    //       this.setState({ mediaStream: new MediaStream([track.track]) });
    //     } else if (
    //       track &&
    //       track.track &&
    //       track.trackKind === TrackKind.Audio &&
    //       track.isLocalTrack === true
    //     ) {
    //       this.setState({ isMicOff: false });
    //     }
    //   }

    // onEndCallTapped() {
    //     console.log('inside');

    //     this.props.route.params.onCallDecline();
    //     CallConnectionSetup.getInstance().disconnectCall();
    //     InCallManager.stop();
    //     InCallManager.setKeepScreenOn(false);

    //     BackHandler.exitApp();
    // }

    // handleCam = () => {
    //     if (this.state.isCamOnOff) {
    //         WebrtcHandler.getInstance().getMeetingHandler().pauseCamera();
    //     }
    //     else {
    //         WebrtcHandler.getInstance().getMeetingHandler().resumeCamera();
    //     }
    //     this.setState({ isCamOnOff: !this.state.isCamOnOff })
    // }

    // handleMic = () => {
    //     if (this.state.isMicOff) {
    //         WebrtcHandler.getInstance().getMeetingHandler().unmute();
    //     } else {
    //         WebrtcHandler.getInstance().getMeetingHandler().muteUser();
    //     }
    // };
    // handleBottomModal = () => {
    //     // if(this.sta)
    //     if (this.state.isModalOpen) {
    //         this.bottomSheetRef?.collapse();
    //         this.setState({ isModalOpen: false });
    //         return;
    //     }
    //     this.bottomSheetRef?.expand();
    //     this.setState({ isModalOpen: true });
    //     return;
    // };

    // handleSpeaker = () => {
    //     if (this.state.isSpeakerOn) {
    //         InCallManager.setForceSpeakerphoneOn(false);
    //         this.setState({ isSpeakerOn: false });
    //     } else {
    //         InCallManager.setForceSpeakerphoneOn(true);
    //         this.setState({ isSpeakerOn: true });
    //     }
    // };


    // handleRoomCreation() {
    //     WebrtcHandler.getInstance().setUp(this.state.roomId, this.state.userId, {
    //         name: this.state.userName
    //     });
    //     WebrtcHandler.getInstance().getMeetingHandler().getEventEmitter()?.on(VaniEvent.OnInitDone, this.onInitDone);
    //     WebrtcHandler.getInstance().getMeetingHandler().init();
    // }

    // onInitDone() {
    //     WebrtcHandler.getInstance().getMeetingHandler().getEventEmitter()?.off(VaniEvent.OnInitDone, this.onInitDone);
    //     WebrtcHandler.getInstance().getMeetingHandler().getEventEmitter()?.on(VaniEvent.OnPermissionApproved, this.onPermissionApproved);
    //     WebrtcHandler.getInstance().getMeetingHandler().getEventEmitter()?.on(VaniEvent.OnPermissionError, this.onPermissionError);
    //     WebrtcHandler.getInstance().getMeetingHandler().startLocalStream(true, true);
    // }

    // getRoomId(id: any) {
    //     this.setState({ roomId: id });
    // };
    // getUserName(name: any) {
    //     this.setState({ userName: name.target.value });
    // };

    render() {
        console.log('roomId', this.state.roomId);
        console.log('userId2', this.state.mediaStream);

        return (
            <>
                <GestureHandlerRootView style={styles.container}>
                    <View style={styles.callScreen}>
                        {this.state.mediaStream ? (
                            <RTCView
                                style={
                                    !this.state.isInPipMode
                                        ? { height: height, width: '100%', flex: 1 }
                                        : {
                                            aspectRatio: 1,
                                        }
                                }
                                key="bigVideo"
                                zOrder={100}
                                mirror={false}
                                objectFit={this.state.isInPipMode ? 'contain' : 'cover'}
                                streamURL={this.state.mediaStream.toURL()}
                            />
                        ) :
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <TextInput
                          placeholder='Name'
                          placeholderTextColor='red'
                          style={styles.input}
                          value={this.state.userName}
                          onChangeText={(name)=>this.setState({userName:name})}
                        />
                        <TextInput
                          placeholder='Room id'
                          placeholderTextColor='red'
                          style={styles.input}
                          value={this.state.roomId}
                          onChangeText={(id)=>this.setState({roomId:id})}
                        />
                        <TouchableOpacity
                        style={{ backgroundColor:Colors.headerColor, width:width*0.8, height:height*0.05,marginTop:5, }}
                        onPress={this.handleRoomCreation}>
                          <Text>Create Room</Text>
                        </TouchableOpacity>
                      </View>
                        }
                    </View>

                    {/* <BottomSheet
                        ref={ref => (this.bottomSheetRef = ref)}
                        handleIndicatorStyle={{
                            display: 'none',
                            padding: 0,
                            // height: 200,
                            // flex:1
                        }}
                        handleStyle={{
                            padding: 0,
                        }}
                        // enableOverDrag={false}
                        enableHandlePanningGesture={
                            this.state.usersFromHome?.length! >= 2 ? true : false
                        }
                        // enablePanDownToClose={false}
                        enableContentPanningGesture={
                            this.state.usersFromHome?.length! >= 2 ? true : false
                        }
                        backgroundStyle={{
                            backgroundColor: '#EDF3FE',
                            padding: 0,
                        }}
                        style={{
                            backgroundColor: '#EDF3FE',
                            padding: 0,
                            display: this.state.isInPipMode ? 'none' : 'flex',
                        }}
                        onChange={index => {
                            index === 1
                                ? this.setState({ isModalOpen: true })
                                : this.setState({ isModalOpen: false });
                        }}
                        snapPoints={this.snapPoints}>
                        <BottomSheetView style={styles.bottomSheetStyle}>
                            <View style={[styles.BottomSheetView]}>
                                {this.state.usersFromHome?.length! >= 2 && (
                                    <View style={styles.chevronStyle}>
                                        <Icons.Entypo
                                            onPress={this.handleBottomModal}
                                            name={
                                                this.state.isModalOpen
                                                    ? 'chevron-thin-down'
                                                    : 'chevron-thin-up'
                                            }
                                            size={25}
                                            color="#293241"
                                        />
                                    </View>
                                )}
                                <View style={styles.BottomSheetViewAction}>
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            width: '100%',
                                            justifyContent: 'space-between',
                                            alignItems: 'flex-start',
                                        }}>
                                        <RoundBtn
                                            styleBtn={styles.btnWrap}
                                            onPress={this.handleMic}
                                            backgroundColor="#fff"
                                            Icon={
                                                <Icons.MaterialIcons
                                                    name={this.state.isMicOff ? 'mic-off' : 'mic'}
                                                    size={23}
                                                    color="rgba(0,0,0,0.9)"
                                                />
                                            }
                                        />
                                        <RoundBtn
                                            styleBtn={styles.btnWrap}
                                            onPress={this.handleSpeaker}
                                            backgroundColor="#fff"
                                            Icon={
                                                <Icons.MaterialIcons
                                                    name={
                                                        this.state.isSpeakerOn ? 'volume-up' : 'volume-off'
                                                    }
                                                    size={25}
                                                    color="rgba(0,0,0,0.9)"
                                                />
                                            }
                                        />
                                        <RoundBtn
                                            styleBtn={styles.btnWrap}
                                            // onPress={() => {
                                            //     this.onEndCallTapped();
                                            // }}
                                            backgroundColor="#ff0000"
                                            Icon={<Icons.MaterialIcons name="call-end" size={23} color="#fff" />}
                                        />
                                    </View>
                                </View>
                            </View>
                        </BottomSheetView>
                    </BottomSheet> */}
                </GestureHandlerRootView>
                {/* )} */}
            </>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',

        // marginBottom: 40,
        // width: width,
        // height: height,
        // backgroundColor: 'rgba(0,0,0,0.3)',
    },
    btnWrap: {},

    callScreen: {
        flex: 0.9,
        backgroundColor: '#000',
    },
    callAction: {
        flex: 0.2,
        position: 'absolute',
        bottom: 0,
        zIndex: 110,
        width: width,
        backgroundColor: '#045DE9',
        flexDirection: 'row',
        // paddingVertical: 10,
        justifyContent: 'center',
        borderTopLeftRadius: 18,
        borderTopRightRadius: 18,
        elevation: 15,
    },
    bottomSheetStyle: {
        width: '100%',
        // flexDirection: 'row',
        height: '100%',
        // justifyContent: 'center',
        alignItems: 'center',
        // elevation: 10,
        backgroundColor: '#EDF3FE',
    },
    BottomSheetView: {
        width: '100%',
        borderBottomWidth: 2,
        borderColor: '#293241',
        // paddingBottom: '10%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#EDF3FE',
        height: height * 0.14,
        // flex:1,
        // flex: 1,
        // paddingVertical:12
    },
    BottomSheetViewAction: {
        width: '70%',
        // flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        backgroundColor: '#EDF3FE',
        // marginTop: -30,
    },
    chevronStyle: {
        width: '100%',
        // justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 0,
        // marginTop: 8,
    },
    bottomSheetContentWrap: {
        width: '100%',
        // padding: 10,
        // marginBottom: -30,
        backgroundColor: '#EDF3FE',
    },
    contentContainerStyle: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    bottomSheetContent: {
        width: '90%',
        backgroundColor: '#EDF3FE',
        marginBottom: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    avatar: {
        backgroundColor: '#293241',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 5,
        paddingHorizontal: 5,
    },
    nameAvatar: {
        width: 40,
        height: 40,
        backgroundColor: '#293241',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarText: {
        fontFamily: 'p-500',
        color: '#fff',
        marginHorizontal: 10,
        fontSize: 14,
    },
    nameText: {
        fontFamily: 'p-600',
        color: '#000',
        marginHorizontal: 10,
        fontSize: 16,
        width: '65%',
        maxWidth: '65%',
    },
    nameFirstText: {
        fontFamily: 'p-600',
        color: '#000',
        marginHorizontal: 10,
        fontSize: 16,
    },
    input: {
        width: width * 0.90,
        height: height * 0.07,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        paddingHorizontal: 12,
        fontSize:15,
        marginTop:5,
        color:Colors.headerColor
      },
});
