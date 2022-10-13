import React, { Component, useState } from 'react';
import { Text, View } from 'react-native';
import { height, width } from '../../styles/Dimension'

import ChatHeader from "../../components/ChatHeader";
import ChatInput from "../../components/ChatInput";
import ImagePath from '../../constants/ImagePath';
import MessagesList from "../../components/MessagesList";
import WebrtcHandler from '../../utils/WebrtcHandler';

interface ChatScreenProps {
	onSend: Function,
	getReply:Function,
}
interface ChatScreenState {
	reply:Array<any>
 }

export default class ChatScreen extends Component<ChatScreenProps, ChatScreenState> {
	constructor(props: ChatScreenProps) {
		super(props);
		this.state = {
			reply:['']
		}
	}

	getReply=()=>{
		this.props.onSend();
	}

	onSend=(m:any)=>{
		this.setState({reply:[...this.state.reply,m]})
	}
	
	render() {
		console.log(this.state.reply);
		return (
			<View style={{ height: height * 0.92, }}>
				<ChatHeader
					onPress={() => { }}
					username={'Sachin ray'}
					picture={ImagePath.profile}
					onlineStatus={'Online'}
				/>
				<MessagesList messageList={this.state.reply}/>
				<ChatInput getReply={this.onSend} />
			</View>
		);
	}
};
