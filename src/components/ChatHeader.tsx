import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { Component } from "react";

import Colors from "../assets/colors/Colors";
import Icons from "../constants/Icons";

interface ChatHeaderProps {
onPress:any,
picture:any,
username:string,
onlineStatus:string,
}
interface ChatHeaderState { }

export default class ChatHeader extends Component<ChatHeaderProps, ChatHeaderState> {
	constructor(props: ChatHeaderProps) {
		super(props);
		this.state = {}
	}
	
	render() {
		return (
			<View style={styles.container}>
				{/* <TouchableOpacity style={styles.backButton} onPress={this.props.onPress}>
					<Icons.FontAwesome name="angle-left" size={30} color={theme.colors.white} />
				</TouchableOpacity> */}
				<View style={styles.profileOptions}>
					<TouchableOpacity style={styles.profile}>
						<Image style={styles.image} source={this.props.picture} />
						<View style={styles.usernameAndOnlineStatus}>
							<Text style={styles.username}>{this.props.username}</Text>
							<Text style={styles.onlineStatus}>{this.props.onlineStatus}</Text>
						</View>
					</TouchableOpacity>
					<View style={styles.options}>
						<TouchableOpacity
							// onPress={() => navigation.navigate("OnCallScreen", {
							// 	username: props.username,
							// 	picture: props.picture
							// })}
							style={{ paddingHorizontal: 5 }}
						>
							<Icons.FontAwesome
								name="phone"
								size={25}
								color={Colors.white}
							/>
						</TouchableOpacity>
						<TouchableOpacity style={{ paddingHorizontal: 20 }}>
							<Icons.FontAwesome
								name="ellipsis-v"
								size={25}
								color={Colors.white}
							/>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		);
	}
};

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		backgroundColor:Colors.headerColor,
		paddingTop: 10,
		paddingBottom: 10,
	},
	backButton: {
		alignSelf: "center",
		paddingHorizontal: 10,
	},
	profileOptions: {
		flex: 1,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingHorizontal: 10,
	},
	profile: {
		flexDirection: "row",
		alignItems: "center",
		borderColor: "#fff",
		flex: 4,
	},
	image: {
		height: 65,
		width: 65,
		borderRadius: 32.5,
	},
	usernameAndOnlineStatus: {
		flexDirection: "column",
		justifyContent: "center",
		paddingHorizontal: 10,
	},
	username: {
		color: Colors.white,
		fontSize: 18,
		fontWeight: "bold",
	},
	onlineStatus: {
		color: Colors.white,
		fontSize: 16,
	},
	options: {
		flex: 1,
		flexDirection: "row",
		justifyContent: "flex-end",
		alignItems: "center",
	},
});
