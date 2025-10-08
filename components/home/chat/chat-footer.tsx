import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { socket } from "@/lib/socket";
import { useUserData } from "@/server/auth";
import { UsersRooms } from "@/types/api";
import React from "react";

const ChatFooter = ({
  currentRoom,
}: {
  currentRoom: UsersRooms | undefined;
}) => {
  const { data } = useUserData();
  const [text, setText] = React.useState("");

  const sendMessage = () => {
    if (!text.trim() || !currentRoom?.room.id) return;

    const payload = {
      roomId: currentRoom.room.id,
      userId: data?.data.id || "",
      message: text,
    };

    // Emit to socket
    socket.emit("send-message", payload);

    // Also send to API (for database persistence)

    setText("");
  };

  return (
    <Card>
      <CardContent className="flex flex-row items-center">
        <Input
          value={text}
          onChangeText={setText}
          placeholder="Type a message..."
          className="flex-1 mr-2"
        />
        <Button onPress={sendMessage}>
          <Text>Send</Text>
        </Button>
      </CardContent>
    </Card>
  );
};

export default ChatFooter;
