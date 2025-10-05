import { CardContent } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { useUserData } from "@/server/auth";
import { Message } from "@/types/api";
import { View } from "react-native";

const MessageItems = ({ message }: { message: Message }) => {
  const { data } = useUserData();
  const userId = data?.data.id;
  const messageUserId = message.userId;
  const isCurrentUser = userId == messageUserId;
  return (
    <View className="start px-4">
      {isCurrentUser ? (
        <CardContent className="bg-blue-800 px-3 py-2 rounded-2xl self-end min-w-[70%]">
          <Text className="text-white">{message.message}</Text>
        </CardContent>
      ) : (
        <CardContent className="bg-gray-200 px-3 py-2 rounded-2xl self-start min-w-[70%]">
          <Text className="text-green-600">{message.user?.name}</Text>
          <Text className="text-black">{message.message}</Text>
        </CardContent>
      )}
    </View>
  );
};

export default MessageItems;
