import { MessageList } from "@/components/home/chat/message-list";
import { useUserData } from "@/server/auth";
import { useRoomsMessages } from "@/server/messages/get-room-messages";
import { useUsersRooms } from "@/server/usersRooms/get-users-rooms";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  View,
} from "react-native";

const RoomId = () => {
  const { roomId } = useLocalSearchParams<{ roomId: string }>();
  const { data } = useUserData();

  const { data: rooms } = useUsersRooms({
    userId: data?.data.id || "",
    queryConfig: { enabled: !!data?.data.id },
  });
  const currentRoom = rooms?.data.find(
    (room) => room.room.roomNumber.toString() == roomId
  );
  const { data: messages, isPending } = useRoomsMessages({
    roomId: currentRoom?.room.id || "",
    queryConfig: { enabled: !!currentRoom?.room.id },
  });

  if (isPending) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
    >
      <View style={{ flex: 1 }}>
        <MessageList
          messages={messages?.data ?? []}
          roomId={roomId}
          currentRoom={currentRoom}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

export default RoomId;
