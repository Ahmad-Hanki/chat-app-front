import { MessageList } from "@/components/home/chat/message-list";
import { useRoomsMessages } from "@/server/messages/get-room-messages";
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

  const { data, isPending } = useRoomsMessages({
    roomId,
    queryConfig: { enabled: !!roomId },
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
        <MessageList messages={data?.data ?? []} roomId={roomId} />
      </View>
    </KeyboardAvoidingView>
  );
};

export default RoomId;
