import {
  View,
  Text,
  KeyboardAvoidingView,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import { MockedGroups } from "../mocks";

const Page = () => {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [icon, setIcon] = useState("");
  const router = useRouter();

  const startGroup = () => {
    // TODO: should use the real mutation here
    MockedGroups.push({
      _id: MockedGroups.length + 1,
      name,
      description: desc,
      icon_url: icon,
    });
  };

  const onCreateGroup = async () => {
    startGroup();
    router.back();
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <Text style={styles.label}>Name</Text>
      <TextInput
        style={styles.textInput}
        value={name}
        onChangeText={setName}
      ></TextInput>
      <Text style={styles.label}>Description</Text>
      <TextInput
        style={styles.textInput}
        value={desc}
        onChangeText={setDesc}
      ></TextInput>
      <Text style={styles.label}>Icon URL</Text>
      <TextInput
        style={styles.textInput}
        value={icon}
        onChangeText={setIcon}
      ></TextInput>

      <TouchableOpacity style={styles.button} onPress={onCreateGroup}>
        <Text style={styles.buttonText}>Create</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F5EA",
    padding: 10,
  },
  label: {
    marginVertical: 10,
  },
  textInput: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    paddingHorizontal: 10,
    minHeight: 40,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#EEA217",
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Page;
