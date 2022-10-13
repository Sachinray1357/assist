import { MediaStream, RTCView } from 'react-native-webrtc';
import { MessagePayload, VaniEvent } from 'vani-meeting-client';
import React, { Component, createRef } from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { Track, TrackKind } from 'vani-meeting-client/lib/model/Track';
import { height, width } from '../../styles/Dimension';

import Colors from '../../assets/colors/Colors';
import HomeScreen from '../home-screen/HomeScreen';
import WebrtcHandler from '../../utils/WebrtcHandler'

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

export default class DuringCall2 extends Component<CallProps, CallState> {
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
        // this.onTrack = this.onTrack.bind(this);
        this.onPermissionApproved = this.onPermissionApproved.bind(this);
        this.onPermissionError = this.onPermissionError.bind(this);
        this.bottomSheetRef = createRef();
        this.snapPoints = ['14%', '35%'];
        this.eventListenerSubscription = null;
    }
   
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
        WebrtcHandler.getInstance().getMeetingHandler().startLocalStream(true, false);
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
        this.setState({isCamOnOff:true})
        WebrtcHandler.getInstance().getMeetingHandler().startMeeting();
        console.log("connected with server");
    };


    render() {
        console.log('roomId', this.state.roomId);
        console.log('userId2', this.state.userId2);

        return (
            <>
                <View style={styles.container}>
                    {/* <View style={styles.callScreen}> */}
                        {this.state.isCamOnOff ? (
                           <HomeScreen/>
                        ) :
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor:'pink' }}>
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
                    {/* </View> */}
                </View>
            </>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'pink',
    },
    btnWrap: {},

    callScreen: {
        flex: 0.9,
        backgroundColor: 'pink',
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
