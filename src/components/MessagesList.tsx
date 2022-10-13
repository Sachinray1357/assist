import React, { Component, createRef, useRef } from "react";

import Chat from "./Chat";
import Colors from "../assets/colors/Colors";
import { ScrollView } from "react-native";

// import Message from "./Message";



interface MessageListProps {
	onSwipeToReply?: Function,
	messageList: any,
}
interface MessageListState {
	messages: Array<any>,
}

export default class MessagesList extends Component<MessageListProps, MessageListState> {
	private user: any;
	private scrollView: any;
	constructor(props: MessageListProps) {
		super(props);
		this.user = createRef();
		this.user.current = 0;
		this.scrollView = createRef();
		this.state = {
			messages: [
				{
					user: 0,
					time: "12:00",
					content: "Hey",
					// content: this.props.messageList,
				},
				{
					user: 1,
					time: "12:05",
					content: "What's up",
				},
			]
		}
	}


	render() {
		console.log('list' ,this.props.messageList);

		return (
			<ScrollView style={{ backgroundColor: Colors.white, flex: 1 }}
				ref={ref => this.scrollView.current = ref}
				onContentSizeChange={() => {
					this.scrollView.current.scrollToEnd({ animated: true })
				}}
			>
				{/* {this.state.messages.map((message:any, index:any) => (
					<Message
						key={index}
						time={message.time}
						isLeft={message.user !== this.user.current}
						message={message.content}
						onSwipe={this.props.onSwipeToReply}
					/>
				))} */}
				{this.state.messages.map((message: any, index: any) => (
					<Chat
						key={index}
						time={message.time}
						isLeft={message.user !== this.user.current}
						message={message.content}
						onSwipe={this.props.onSwipeToReply}
					/>
				))}
			</ScrollView>
		);
	}
};
