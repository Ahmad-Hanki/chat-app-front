import { Text } from "@/components/ui/text";
import { useUserData } from "@/server/auth";
import React from "react";
import { View } from "react-native";

const Home = () => {
  const { data } = useUserData();

  return (
    <View style={{ flex: 1 }}>
      <Text>Hello {data?.data.name}</Text>
    </View>
  );
};

export default Home;
