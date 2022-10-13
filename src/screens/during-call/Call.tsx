import { Image, StyleSheet, Text, View } from 'react-native';
import { MediaStream, RTCView } from 'react-native-webrtc';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import React, { Component } from 'react';
import { Track, TrackKind } from 'vani-meeting-client/lib/model/Track';
import { height, width } from '../../styles/Dimension';

import AnimatedVoice from '../../components/AnimatedVoice';
import { CallConnectionSetup } from '../../utils/CallConnectionSetup';
import Icons from '../../constants/Icons';
import ImagePath from '../../constants/ImagePath';
import RoundBtn from '../../components/RoundBtn';
import { VaniEvent } from 'vani-meeting-client';
import VideoHandler from '../../utils/WebrtcHandler';

interface CallProps {
  onCallDecline: Function;
  route: any;
  navigation: NavigationProp<ParamListBase>;
}
interface CallState {
  mediaStream?: MediaStream;
  info: any;
}
export default class Call extends Component<CallProps, CallState> {
  constructor(props: any) {
    super(props);
    this.state = {
      mediaStream: undefined,
      // info: JSON.parse(JSON.parse(this.props.route.params.info).data.payload)
      //   .home,
    };
    this.onTrack = this.onTrack.bind(this);
  }

  componentDidMount() {
    VideoHandler.getInstance()
      .getMeetingHandler()
      ?.getEventEmitter()
      ?.on(VaniEvent.OnTrack, this.onTrack);
    VideoHandler.getInstance()
      .getMeetingHandler()
      .getAllTracks()
      .forEach(track => {
        this.onTrack(track);
      });
  }

  onTrack(track: Track) {
    if (track && track.track && track.trackKind === TrackKind.Video) {
      console.log('On Track');
      this.setState({ mediaStream: new MediaStream([track.track]) });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.callScreen}>
          {!this.state.mediaStream && (
            <View
              style={{
                position: 'absolute',
                width: width,
                height: height,
                top: 0,
                left: 0,
                zIndex: 1000,
                backgroundColor: '#fff',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image source={ImagePath.profile} />
            </View>
          )}
          {/* {this.state.mediaStream ? (
            <RTCView
              style={{ height: height, width: '100%', flex: 1 }}
              key="bigVideo"
              zOrder={100}
              mirror={false}
              objectFit="cover"
              streamURL={this.state.mediaStream.toURL()}
            />
          ) : null} */}

          {/* {this.state.info ? (
            <AnimatedVoice info={this.state.info} />
          ) : (
            <Text>Loading...</Text>
          )} */}
        </View>
        <View style={styles.callAction}>
          <View
            style={{
              width: '70%',
              flexDirection: 'row',
              backgroundColor: '#EDF3FE',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <RoundBtn
              // onPress={this.props.route.params.onCallDecline}
              styles={{
                width: 60,
                height: 60,
                elevation: 8,
                backgroundColor: 'red',
              }}
              backgroundColor="rgba(0,0,0,0.5)"
              Icon={<Icons.MaterialIcons name="call-end" size={30} color="#fff" />}
            />
            <RoundBtn
              styles={{
                width: 60,
                height: 60,
                elevation: 8,
                backgroundColor: '#38b000',
              }}
              // onPress={() => {
              //   CallConnectionSetup.getInstance().onCallAccpted();
              //   this.props.navigation.navigate('call');
              // }}
              backgroundColor="rgba(0,0,0,0.5)"
              Icon={<Icons.Ionicons name="call" size={30} color="#fff" />}
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    width: width,
    height: height,
  },

  callScreen: {
    height: height * 0.88,
    backgroundColor: '#000',
  },
  callAction: {
    height: height * 0.12,
    backgroundColor: '#EDF3FE',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    overflow: 'hidden',
    zIndex: 110,
    width: width,
    flexDirection: 'row',
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
