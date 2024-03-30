import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import React from "react";
import { Link } from "expo-router";

const Page = () => {
  const groups = [
    {
      _id: 1,
      name: "Running club",
      description: "A club to burn calories",
      icon_url:
        "https://as2.ftcdn.net/v2/jpg/05/78/72/67/1000_F_578726709_AtgfsV2daQE7DxZx4K6Sa5h0VCsWiKIa.jpg",
    },
    {
      _id: 2,
      name: "Study club",
      description: "A club to burn the brain",
      icon_url: "https://cdn-icons-png.flaticon.com/512/2466/2466734.png",
    },
    {
      _id: 3,
      name: "Taco Tuesday club",
      description: "A club to burn the sadness",
      icon_url: "https://cdn-icons-png.flaticon.com/512/4062/4062916.png",
    },
  ];
  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        {groups.map((group) => (
          <Link
            href={{
              pathname: "/(chat)/[chatid]",
              params: { chatid: group._id },
            }}
            key={group._id.toString()}
            asChild
          >
            <TouchableOpacity style={styles.group}>
              <Image
                source={{ uri: group.icon_url }}
                style={{ width: 50, height: 50 }}
              />
              <View style={{ flex: 1 }}>
                <Text>{group.name}</Text>
                <Text style={{ color: "#888" }}>{group.description}</Text>
              </View>
            </TouchableOpacity>
          </Link>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#F8FSEA",
  },
  group: {
    flexDirection: "row",
    gap: 1,
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    elevation: 3,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
});

export default Page;
