import { MediaStream, RTCView } from 'react-native-webrtc';
import { MessagePayload, VaniEvent } from 'vani-meeting-client';
import React, { Component, createRef } from 'react';
import {
    ScrollView,
    StyleSheet,
    View,
} from 'react-native';
import { Track, TrackKind } from 'vani-meeting-client/lib/model/Track';
import { height, width } from '../../styles/Dimension';

import RtcView from './RtcView';
import WebrtcHandler from '../../utils/WebrtcHandler'

interface WebCamProps {
    btn?: any,
    participant?: any,
}

interface WebCamState {
    allParticipants: Array<any>,
    userName: Array<any>,
    isInPipMode: boolean,
    mediaStream?: MediaStream;
}
export default class HomeScreen extends Component<WebCamProps, WebCamState> {
    constructor(props: WebCamProps) {
        super(props)
        this.state = {
            allParticipants: [],
            userName: [''],
            isInPipMode: false,
            mediaStream: undefined,
        }
        this.onInitDone = this.onInitDone.bind(this);
        this.onTrack = this.onTrack.bind(this);
    }

    componentDidMount() {
        WebrtcHandler.getInstance().getMeetingHandler().getEventEmitter()?.on(VaniEvent.OnAllParticipants, this.onAllParticipants);
        WebrtcHandler.getInstance().getMeetingHandler().getUpdatedParticipantsListFromServer();
        // WebrtcHandler.getInstance().getMeetingHandler().getEventEmitter()?.on(VaniEvent.OnUserJoined, this.onUserJoined);
        // WebrtcHandler.getInstance().getMeetingHandler().getEventEmitter()?.on(VaniEvent.OnUserLeft, this.onUserJoined);
    }

    onInitDone() {
        // WebrtcHandler.getInstance().getMeetingHandler().getEventEmitter()?.off(VaniEvent.OnInitDone, this.onInitDone);
        // WebrtcHandler.getInstance().getMeetingHandler().getEventEmitter()?.on(VaniEvent.OnPermissionApproved, this.onPermissionApproved);
        // WebrtcHandler.getInstance().getMeetingHandler().getEventEmitter()?.on(VaniEvent.OnPermissionError, this.onPermissionError);
        // WebrtcHandler.getInstance().getMeetingHandler().getEventEmitter()?.on(VaniEvent.OnTrack, this.onTrack);
        // WebrtcHandler.getInstance().getMeetingHandler().startLocalStream(true, true);
    }

    onPermissionApproved = () => {
        console.log("permission done");
    };
    onPermissionError = () => {
        console.log("permission not given");
    }
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
    onAllParticipants = (p: any) => {
        console.log(p);
        this.setState({ allParticipants: p });
    }
    onUserJoined = (p: any) => {
        // this.state.allParticipants.push(p); 
        // this.setState({allParticipants:[...WebrtcHandler.getInstance().getMeetingHandler().getAllParticipants()]})
        this.setState({ allParticipants: [...this.state.allParticipants, p] })
        console.log("user joined");
    }

    onUserLeft = (l: any) => {
        this.setState({ allParticipants: this.state.allParticipants.filter(participant => participant.userId !== l.userId) });
    }


    render() {
        console.log('User--', this.state.allParticipants);
        return (
            <>
                <View style={styles.container}>
                    {this.state.allParticipants.map((e) => {
                        return <View style={styles.container}>
                            <RtcView participant={e} />
                        </View>
                    })}
                </View>
            </>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#fff',
        // alignItems:'center'
    },
});
