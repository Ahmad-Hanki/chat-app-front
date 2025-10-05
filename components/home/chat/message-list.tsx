import { Message, UsersRooms } from "@/types/api";
import React from "react";
import { FlatList, View } from "react-native";
import ChatFooter from "./chat-footer";
import ChatHeader from "./chat-header";
import EmptyRoom from "./empty-room";
import MessageItems from "./message-item";

export const MessageList = ({
  messages,
  currentRoom,
  roomId,
}: {
  messages: Message[];
  roomId: string;
  currentRoom: UsersRooms | undefined;
}) => {
  return (
    <View style={{ flex: 1 }}>
      <ChatHeader roomId={roomId} currentRoom={currentRoom} />

      <FlatList
        style={{ flex: 1 }}
        data={messages}
        renderItem={({ item }) => <MessageItems message={item} />}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<EmptyRoom />}
        contentContainerStyle={
          messages.length == 0
            ? {
                flexGrow: 1,
                justifyContent: "center",
                alignItems: "center",
              }
            : { marginTop: 30, paddingVertical: 10, flexGrow: 1, gap: 15 } // adjust as needed for normal messages
        }
        showsVerticalScrollIndicator={false}
      />

      <ChatFooter currentRoom={currentRoom} />
    </View>
  );
};
