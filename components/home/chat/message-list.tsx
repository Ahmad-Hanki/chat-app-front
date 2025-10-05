import { Message } from "@/types/api";
import React from "react";
import { FlatList, View } from "react-native";
import ChatFooter from "./chat-footer";
import ChatHeader from "./chat-header";
import EmptyRoom from "./empty-room";
import MessageItems from "./message-item";

export const MessageList = ({
  messages,
  roomId,
}: {
  messages: Message[];
  roomId: string;
}) => {
  return (
    <View style={{ flex: 1 }}>
      <ChatHeader roomId={roomId} />

      <FlatList
        style={{ flex: 1 }}
        data={messages}
        renderItem={({ item }) => <MessageItems message={item} />}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<EmptyRoom />}
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center", // This centers the empty component
          alignItems: "center", // This centers horizontally
        }}
        showsVerticalScrollIndicator={false}
      />

      <ChatFooter />
    </View>
  );
};
