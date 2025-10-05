import { Text } from "@/components/ui/text";
import { UsersRooms } from "@/types/api";
import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Pressable, View } from "react-native";

const ChatHeader = ({
  roomId,
  currentRoom,
}: {
  roomId: string;
  currentRoom: UsersRooms | undefined;
}) => {
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

      <Text className="font-bold">{currentRoom?.room.name}</Text>

      <AntDesign name="edit" size={20} color="blue" />
    </View>
  );
};

export default ChatHeader;
