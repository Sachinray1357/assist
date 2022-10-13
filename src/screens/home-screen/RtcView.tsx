import {
    GestureHandlerRootView,
    ScrollView,
} from 'react-native-gesture-handler';
import { MediaStream, RTCView } from 'react-native-webrtc';
import { MessagePayload, VaniEvent } from 'vani-meeting-client';
import React, { Component, createRef } from 'react';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { Track, TrackKind } from 'vani-meeting-client/lib/model/Track';
import { height, width } from '../../styles/Dimension';

import Colors from '../../assets/colors/Colors';
import WebrtcHandler from '../../utils/WebrtcHandler'

interface WebCamProps {
    btn?: any,
    participant: any,
}

interface WebCamState {
    allParticipants: Array<any>,
    isInPipMode: boolean,
    videoStream?: MediaStream;
}
export default class RtcView extends Component<WebCamProps, WebCamState> {
    constructor(props: WebCamProps) {
        super(props)
        this.state = {
            allParticipants: [],
            isInPipMode: false,
            videoStream: undefined,
        }
    }

    componentDidMount() {
        console.log(WebrtcHandler.getInstance().getMeetingHandler().getAllTracks());
        WebrtcHandler.getInstance().getMeetingHandler().getEventEmitter()?.on(VaniEvent.OnTrack, this.onTrack);
        WebrtcHandler.getInstance().getMeetingHandler().getTracksByParticipantId(this.props.participant.userId).forEach((e) => { this.onTrack(e) })
    }
    componentWillUnmount() {
        WebrtcHandler.getInstance().getMeetingHandler().getEventEmitter()?.off(VaniEvent.OnTrack, this.onTrack);
    }

    onTrack = (track: any) => {
        console.log('track me kya', track);
        if (track.participant.userId === this.props.participant.userId) {
            if (track.trackKind === TrackKind.Video) {
                if (track.track) {
                    console.log('Sachin me kya', track);

                    this.setState({ videoStream: new MediaStream([track.track]) });
                    //console.log(MediaStream);
                }
            }
        }
    };


    render() {
        // console.log('roomId', this.state.roomId);
        console.log('media--', this.state.videoStream);
        console.log('media???--', this.state.videoStream?.toURL);
        console.log('User--id--', this.props.participant.userId);
        return (
            <>
                <View style={styles.container}>
                    {/* <View style={styles.callScreen}> */}

                        {this.state.videoStream ? (
                            <RTCView
                                style={
                                    !this.state.isInPipMode
                                        ? { height: height, width: '100%',flex:1 }
                                        : {
                                            aspectRatio: 1,
                                        }
                                }
                                key="bigVideo"
                                zOrder={100}
                                mirror={false}
                                objectFit={'cover'}
                                streamURL={this.state.videoStream.toURL()}
                            />
                        ) :
                            null
                        }

                </View>
            </>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 0.3,
        justifyContent: 'center',
        // backgroundColor: 'blue',
    },
    callScreen: {
        flex: 1,
        // width:'100%',
        backgroundColor: 'blue',
        // justifyContent: 'center',
        // alignItems:'center'
    },
    userVideo: {
        backgroundColor: 'black',
        position: "absolute",
        borderRadius: 80,
        left: "55%",
        top: "65%",
        width: "40%",
        height: "28%",
        overflow: 'hidden',
        zIndex: 2
    },
    remoteVideo: {
        backgroundColor: 'black',
        borderColor: 'black',
        flex: 1,
        borderWidth: 5,
        borderRadius: 20,
    }
});
