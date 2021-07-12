import * as React from "react";
import {
  Alert,
  Button,
  View,
  Text,
  FlatList,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  Keyboard,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { connect } from "react-redux";
import { isEmpty } from "lodash";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import KeyboardSpacer from "react-native-keyboard-spacer";

import Header from "../../components/header";
import ChatBubble from "../../components/chat-bubble";

import Colors from "../../utils/colors";
import tStyles from "../../utils/textStyles";
import styles from "./styles";
import {
  sendChatMessage,
  subscribeToFireStore,
  endChat,
} from "../../actions/chat";

class ChatScreen extends React.Component {
  state = {
    message: "",
    isInitialScroll: true,
    endText: "",
  };

  componentDidMount() {
    const { navigation } = this.props;

    const channelId = navigation.getParam("channelId", "");
    this.props.dispatch(subscribeToFireStore(channelId));
    setTimeout(() => {
      this.setState({ isInitialScroll: false });
    }, 500);
  }

  sendMessage = () => {
    const { message } = this.state;
    const { userId, navigation } = this.props;

    const channelId = navigation.getParam("channelId", "");
    console.log("channelId", channelId);
    this.props.dispatch(
      sendChatMessage(message, userId, channelId, () => {
        Keyboard.dismiss();
      })
    );
    this.setState({ message: "" });
  };

  successEndChatCallback = () => {
    this.setState({ endText: "Chat has ended." });
    Alert.alert(
      "",
      "Chat has ended.",
      [
        {
          text: "Ok",
          onPress: () => {
            const { messages, navigation, userId } = this.props;
            console.log("userId", userId);
            const channelId = navigation.getParam("channelId", "");

            this.props.dispatch(
              sendChatMessage("Chat has ended...", userId, channelId, () => {
                navigation.goBack();
              })
            );
          },
        },
      ],
      { cancelable: false }
    );
  };

  render() {
    const { messages, navigation, userId } = this.props;
    console.log(userId, messages);

    const { message, isInitialScroll } = this.state;

    const isButtonSendEnabled = !isEmpty(message);
    console.log("channelId log", navigation.getParam("channelId"));

    const channelId = navigation.getParam("channelId", "");
    const allowChat = navigation.getParam("allowChat", true);
    console.log("allowChat", allowChat);
    console.log("this.state", this.state.endText);

    return (
      <View style={styles.viewContainer}>
        <View style={styles.backContainer}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Image
              resizeMode="contain"
              style={styles.backImage}
              source={require("../../images/ic_back.png")}
            />
          </TouchableOpacity>

          <Text allowFontScaling={false} style={styles.backTitle}>
            TWO-WAY Chat
          </Text>

          {allowChat && (
            <TouchableOpacity
              onPress={() => {
                Alert.alert(
                  "End Chat",
                  "Are you sure you like to End this chat? Once ended, it CANNOT be restarted.",
                  [
                    {
                      text: "Yes",
                      onPress: () => {
                        this.props.dispatch(
                          endChat(
                            channelId,
                            this.successEndChatCallback,
                            userId
                          )
                        );
                      },
                    },
                    {
                      text: "No",
                      onPress: () => {
                        console.log("no!!");
                      },
                    },
                  ],
                  { cancelable: false }
                );
              }}
            >
              <View
                style={[
                  allowChat ? { opacity: 1 } : { opacity: 0.25 },
                  {
                    marginTop: 4,
                    paddingHorizontal: 8,
                    paddingVertical: 4,
                    borderRadius: 4,
                    backgroundColor: "red",
                  },
                ]}
              >
                <Text style={{ color: "white" }}>End Chat</Text>
              </View>
            </TouchableOpacity>
          )}
        </View>

        <View style={{ height: 8, backgroundColor: "white", width: "100%" }} />

        <FlatList
          style={styles.chatContainer}
          data={messages}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => {
            console.log("item.message", item.message);
            return (
              <ChatBubble
                message={item}
                fromUser={item.userId === userId}
                userId={userId}
                navigation={this.props.navigation}
                allowChat={allowChat}
              />
            );
          }}
          inverted
        />

        {allowChat && (
          <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : {}}
            enabled
          >
            <View style={styles.viewFooter}>
              <TextInput
                placeholderTextColor="silver"
                allowFontScaling={false}
                style={[{ flex: 1, marginRight: 16 }, styles.input]}
                value={message}
                onChangeText={(text) => this.setState({ message: text })}
                placeholder="Write your message..."
                multiline={true}
              />

              <TouchableOpacity
                disabled={!isButtonSendEnabled}
                onPress={() => this.sendMessage()}
              >
                <View
                  style={[
                    styles.btnSend,
                    { opacity: isButtonSendEnabled ? 1 : 0.5 },
                  ]}
                >
                  <Text allowFontScaling={false} style={[styles.txtGenerate]}>
                    Send
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        )}
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    messages: state.chat.data,
    toggleValue: state.ui.toggleValue,
    user: state.user.userData,
    userId: state.user.userId,
  };
};

export default connect(mapStateToProps)(ChatScreen);
