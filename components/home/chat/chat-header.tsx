import { Text } from "@/components/ui/text";
import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";

const ChatHeader = ({ roomId }: { roomId: string }) => {
  const router = useRouter();
  return (
    <View className="w-full flex-row justify-between ">
      <Pressable
        onPress={() => router.back()}
        className="flex gap-2 flex-row items-center"
      >
        <AntDesign name="arrow-left" size={20} color="blue" />
        <Text className="text-blue-950">Chats</Text>
      </Pressable>

      <Text className="font-bold">{roomId}</Text>

      <AntDesign name="edit" size={20} color="blue" />
    </View>
  );
};

const styles = StyleSheet.create({});

export default ChatHeader;
