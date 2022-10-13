import {
	KeyboardAvoidingView,
	Platform,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View
} from "react-native";
import React, { Component } from "react";

import Animated from "react-native-reanimated";
import Colors from "../assets/colors/Colors";
import Icons from "../constants/Icons";

interface ChatInputProps {
	reply?: any,
	closeReply?: any,
	isLeft?: any,
	username?: any,
	// onSend?:Function,
	getReply: Function,
}
interface ChatInputState {
	message: string,
	enableShift: boolean,
	// reply:Array<string>
}

export default class ChatInput extends Component<ChatInputProps, ChatInputState> {
	constructor(props: ChatInputProps) {
		super(props);
		this.state = {
			message: '',
			enableShift: false
			// reply:['']
		}
	}

	onSend = () => {
		this.props.getReply(this.state.message)
	}

	handleChange = (e: any) => {
		this.setState({
			message: e
		});
	}

	render() {
		// console.log(this.state.reply);

		return (
			// <Animated.View style={styles.container}>
			<KeyboardAvoidingView style={styles.container} behavior='position' enabled={this.state.enableShift}>
				<View style={styles.innerContainer}>
					<View style={styles.inputAndMicrophone}>
						<View
							style={styles.emoticonButton}
						>
							<Icons.MtrialCom
								name="emoticon-outline"
								size={23}
								color={Colors.description}
							/>
						</View>
						<TextInput
							multiline
							onFocus={() => this.setState({ enableShift: true })}
							placeholder={"Type something..."}
							placeholderTextColor='gray'
							style={styles.input}
							value={this.state.message}
							onChangeText={(text) => this.setState({ message: text })}
						/>
						<TouchableOpacity style={styles.rightIconButtonStyle}>
							<Icons.MtrialCom
								name="paperclip"
								size={23}
								color={Colors.description}
							/>
						</TouchableOpacity>
						<TouchableOpacity style={styles.rightIconButtonStyle}>
							<Icons.MtrialCom
								name="camera"
								size={23}
								color={Colors.description}
							/>
						</TouchableOpacity>
					</View>
					<TouchableOpacity style={styles.sendButton}
						onPress={this.onSend}
					>
						<Icons.MtrialCom
							name="send"
							size={23}
							color={Colors.white}
						/>
					</TouchableOpacity>
				</View>
			</KeyboardAvoidingView>
			// </Animated.View>
		);
	}
};

const styles = StyleSheet.create({
	container: {
		justifyContent: "center",
		backgroundColor: Colors.white,
	},
	replyContainer: {
		paddingHorizontal: 10,
		marginHorizontal: 10,
		justifyContent: "center",
		alignItems: "flex-start",
	},
	title: {
		marginTop: 5,
		fontWeight: "bold",
	},
	closeReply: {
		position: "absolute",
		right: 10,
		top: 5,
	},
	reply: {
		marginTop: 5,
	},
	innerContainer: {
		paddingHorizontal: 10,
		marginHorizontal: 10,
		justifyContent: "space-between",
		alignItems: "center",
		flexDirection: "row",
		paddingVertical: 10,
	},
	inputAndMicrophone: {
		flexDirection: "row",
		backgroundColor: Colors.inputBackground,
		flex: 3,
		marginRight: 10,
		paddingVertical: Platform.OS === "ios" ? 10 : 0,
		borderRadius: 30,
		alignItems: "center",
		justifyContent: "space-between",
	},
	input: {
		backgroundColor: "transparent",
		paddingLeft: 20,
		color: Colors.inputText,
		flex: 3,
		fontSize: 15,
		height: 50,
		alignSelf: "center",
		// alignItems:'center'
	},
	rightIconButtonStyle: {
		justifyContent: "center",
		alignItems: "center",
		paddingRight: 15,
		paddingLeft: 10,
		borderLeftWidth: 1,
		borderLeftColor: "#fff",
	},
	swipeToCancelView: {
		flexDirection: "row",
		alignItems: "center",
		marginRight: 30,
	},
	swipeText: {
		color: Colors.description,
		fontSize: 15,
	},
	emoticonButton: {
		justifyContent: "center",
		alignItems: "center",
		paddingLeft: 10,
	},
	recordingActive: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingLeft: 10,
	},
	recordingTime: {
		color: Colors.description,
		fontSize: 20,
		marginLeft: 5,
	},
	microphoneAndLock: {
		alignItems: "center",
		justifyContent: "flex-end",
	},
	lockView: {
		backgroundColor: "#eee",
		width: 60,
		alignItems: "center",
		borderTopLeftRadius: 30,
		borderTopRightRadius: 30,
		height: 130,
		paddingTop: 20,
	},
	sendButton: {
		backgroundColor: Colors.headerColor,
		borderRadius: 50,
		height: 50,
		width: 50,
		alignItems: "center",
		justifyContent: "center",
	},
});
