import { Text } from "@/components/ui/text";
import { UsersRooms } from "@/types/api";
import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useRef } from "react";
import { Pressable, View } from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";

const ChatHeader = ({
  roomId,
  currentRoom,
}: {
  roomId: string;
  currentRoom: UsersRooms | undefined;
}) => {
  const router = useRouter();
  const refRBSheet = useRef<any>(null);

  return (
    <View className="w-full flex-row justify-between px-4 ">
      <Pressable
        onPress={() => router.back()}
        className="flex gap-2 flex-row items-center"
      >
        <AntDesign name="arrow-left" size={20} color="blue" />
        <Text className="text-blue-950">Chats</Text>
      </Pressable>

      <Text className="font-bold">{currentRoom?.room.name}</Text>
      <Pressable onPress={() => refRBSheet.current.open()}>
        <AntDesign name="edit" size={20} color="blue" />
      </Pressable>

      <RBSheet
        ref={refRBSheet}
        useNativeDriver={true}
        height={600}
        customStyles={{
          wrapper: {
            backgroundColor: "transparent",
          },
          draggableIcon: {
            backgroundColor: "#000",
          },
        }}
        customModalProps={{
          animationType: "slide",
          statusBarTranslucent: true,
        }}
        customAvoidingViewProps={{
          enabled: false,
        }}
      >
        <Text className="text-black">Room Details Coming Soon...</Text>
      </RBSheet>
    </View>
  );
};

export default ChatHeader;
