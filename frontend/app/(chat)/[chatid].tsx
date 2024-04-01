import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  TouchableOpacity,
  ListRenderItem,
  FlatList,
  SafeAreaView,
  Keyboard,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MockedGroups, MockedMessages } from "../mocks";
import { Ionicons } from "@expo/vector-icons";
import { Message } from "../message.interface";

const Page = () => {
  const { chatid } = useLocalSearchParams<{ chatid: string }>();
  const [user, setUser] = useState<string | null>(null);
  const navigation = useNavigation();
  const [newMessage, setNewMessage] = useState("");
  const listRef = useRef<FlatList>(null);

  const getMessages = () => {
    // TODO: replace with the real query
    return MockedMessages.filter((msg) => msg.group_id.toString() === chatid);
  };

  const messages = getMessages();

  const findGroup = (chatid: string) => {
    return MockedGroups.find((group) => group._id.toString() === chatid);
  };

  const addMessage = () => {
    //TODO replace with the real mutation
    messages.push({
      _id: messages.length + 1,
      _createTime: Date.now(),
      content: newMessage,
      group_id: parseInt(chatid),
      user: user || "unknownUser",
      file: undefined,
    });
  };

  useEffect(() => {
    const loadGroup = async () => {
      const groupInfo = findGroup(chatid as string); // TODO: Should call the real query here
      navigation.setOptions({ headerTitle: groupInfo?.name });
    };

    loadGroup();
  }, [chatid]);

  useEffect(() => {
    const loadUser = async () => {
      const user = await AsyncStorage.getItem("user");
      setUser(user);
    };
    loadUser();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      listRef.current?.scrollToEnd({ animated: true });
    }, 300);
  }, [messages]);

  const handleSendMessage = () => {
    Keyboard.dismiss();
    addMessage();
    setNewMessage("");
  };

  const renderMessage: ListRenderItem<Message> = ({ item }) => {
    const isUserMessage = item.user === user;

    return (
      <View
        style={[
          styles.messageContainer,
          isUserMessage
            ? styles.userMessageContainer
            : styles.otherMessageContainer,
        ]}
      >
        {item.content !== "" && (
          <Text
            style={[
              styles.messageText,
              isUserMessage ? styles.userMessageText : null,
            ]}
          >
            {item.content}
          </Text>
        )}
        <Text style={styles.timestamp}>
          {new Date(item._createTime).toLocaleTimeString()} - {item.user}
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={100}
      >
        <FlatList
          ref={listRef}
          ListFooterComponent={<View style={{ padding: 5 }} />}
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(item) => item._id.toString()}
        ></FlatList>

        {/* TODO: here goes the bottom input */}
        <View style={styles.inputContainer}>
          <View style={{ flexDirection: "row" }}>
            <TextInput
              style={styles.textInput}
              value={newMessage}
              onChangeText={setNewMessage}
            ></TextInput>
            <TouchableOpacity
              style={styles.sendButton}
              onPress={handleSendMessage}
              disabled={newMessage === ""}
            >
              <Ionicons
                name="send-outline"
                style={styles.sendButtonText}
              ></Ionicons>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F5EA",
  },
  inputContainer: {
    padding: 10,
    backgroundColor: "#fff",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -8,
    },
    shadowOpacity: 0.1,
    shadowRadius: 5,

    elevation: 3,
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    paddingHorizontal: 10,
    minHeight: 40,
    backgroundColor: "#fff",
    paddingTop: 10,
  },
  sendButton: {
    backgroundColor: "#EEA217",
    borderRadius: 5,
    padding: 10,
    marginLeft: 10,
    alignSelf: "flex-end",
  },
  sendButtonText: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
  messageContainer: {
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
    marginHorizontal: 10,
    maxWidth: "80%",
  },
  userMessageContainer: {
    backgroundColor: "#791363",
    alignSelf: "flex-end",
  },
  otherMessageContainer: {
    alignSelf: "flex-start",
    backgroundColor: "#fff",
  },
  messageText: {
    fontSize: 16,
    flexWrap: "wrap",
  },
  userMessageText: {
    color: "#fff",
  },
  timestamp: {
    fontSize: 12,
    color: "#c7c7c7",
  },
});
export default Page;
