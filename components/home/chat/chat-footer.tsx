import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { useUserData } from "@/server/auth";
import { useCreateNewMessage } from "@/server/messages/post-new-message";
import { UsersRooms } from "@/types/api";
import React from "react";
import { StyleSheet } from "react-native";

const ChatFooter = ({
  currentRoom,
}: {
  currentRoom: UsersRooms | undefined;
}) => {
  const { data } = useUserData();

  const [text, setText] = React.useState("");
  const { mutate } = useCreateNewMessage({
    mutationConfig: {
      onSuccess: () => {
        setText("");
        console.log("Message sent successfully");
      },
    },
  });
  return (
    <Card>
      <CardContent className="flex flex-row items-center ">
        <Input
          value={text}
          onChangeText={setText}
          placeholder="Type a message..."
          className="flex-1 mr-2"
        />
        <Button
          onPress={() => {
            mutate({
              roomId: currentRoom?.room.id || "",
              userId: data?.data.id || "",
              message: text,
            });
            setText("");
          }}
        >
          <Text>Send</Text>
        </Button>
      </CardContent>
    </Card>
  );
};

const styles = StyleSheet.create({});

export default ChatFooter;
