import { MessageList } from "@/components/home/chat/message-list";
import { socket } from "@/lib/socket";
import { useUserData } from "@/server/auth";
import { useRoomsMessages } from "@/server/messages/get-room-messages";
import { useUsersRooms } from "@/server/usersRooms/get-users-rooms";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect } from "react";
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

  const [liveMessages, setLiveMessages] = React.useState(messages?.data ?? []);

  // Join the socket room
  useEffect(() => {
    if (!currentRoom?.room.id) return;

    // join the room
    socket.emit("join-room", currentRoom.room.id);
    
    // Listens for "new-message" events from the server.
    socket.on("new-message", (message) => {
      setLiveMessages((prev) => [...prev, message]);
    });

    return () => {
      socket.off("new-message");
    };
  }, [currentRoom?.room.id]);

  // Sync when REST data loads
  useEffect(() => {
    if (messages?.data) {
      setLiveMessages(messages.data);
    }
  }, [messages]);

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
          messages={liveMessages}
          roomId={roomId}
          currentRoom={currentRoom}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

export default RoomId;
