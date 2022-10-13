import { Alert, StyleSheet, Text, View } from "react-native";
import React, { Component } from "react";

import Animated, {
} from "react-native-reanimated";
import Colors from "../assets/colors/Colors";

interface ChatProps {
    message: any,
    time: any,
    isLeft: any,
    onSwipe?: any,
}
interface ChatState { }

export default class Chat extends Component<ChatProps, ChatState> {
    constructor(props: ChatProps) {
        super(props);
        this.state = {
        }
    }

    isOnLeft = (type: any) => {
        if (this.props.isLeft && type === "messageContainer") {
            return {
                alignSelf: "flex-start",
                backgroundColor: "#f0f0f0",
                borderTopLeftRadius: 0,
            };
        } else if (this.props.isLeft && type === "message") {
            return {
                color: "#000",
            };
        } else if (this.props.isLeft && type === "time") {
            return {
                color: "darkgray",
            };
        } else {
            return {
                borderTopRightRadius: 0,
            };
        }
    };

    render() {

        return (
            <Animated.View style={styles.container}>
                <View
                    style={[
                        styles.messageContainer,
                        this.isOnLeft("messageContainer"),
                    ]}
                >
                    <View style={styles.messageView}>
                        <Text style={[styles.message, this.isOnLeft("message")]}>
                            {this.props.message}
                        </Text>
                    </View>
                    <View style={styles.timeView}>
                        <Text style={[styles.time, this.isOnLeft("time")]}>
                            {this.props.time}
                        </Text>
                    </View>
                </View>
            </Animated.View>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        paddingVertical: 10,
        marginVertical: 5,
    },
    messageContainer: {
        backgroundColor: Colors.headerColor,
        maxWidth: "80%",
        alignSelf: "flex-end",
        flexDirection: "row",
        borderRadius: 15,
        paddingHorizontal: 10,
        marginHorizontal: 10,
        paddingTop: 5,
        paddingBottom: 10,
    },
    messageView: {
        backgroundColor: "transparent",
        maxWidth: "80%",
    },
    timeView: {
        backgroundColor: "transparent",
        justifyContent: "flex-end",
        paddingLeft: 10,
    },
    message: {
        color: "white",
        alignSelf: "flex-start",
        fontSize: 15,
    },
    time: {
        color: "lightgray",
        alignSelf: "flex-end",
        fontSize: 10,
    },
});
