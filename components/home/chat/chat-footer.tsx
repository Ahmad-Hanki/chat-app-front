import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import React from "react";
import { StyleSheet } from "react-native";

const ChatFooter = () => {
  const [text, setText] = React.useState("");
  return (
    <Card>
      <CardContent className="flex flex-row items-center ">
        <Input
          value={text}
          onChangeText={setText}
          placeholder="Type a message..."
          className="flex-1 mr-2"
        />
        <Button onPress={() => {}}>
          <Text>Send</Text>
        </Button>
      </CardContent>
    </Card>
  );
};

const styles = StyleSheet.create({});

export default ChatFooter;
