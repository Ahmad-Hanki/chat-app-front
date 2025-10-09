import { Text } from "@/components/ui/text";
import { UsersRooms } from "@/types/api";
import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useRef } from "react";
import { Pressable, View, Dimensions } from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import RoomSettings from "./room-settings";
import { DeleteRoomDialog } from "./delete-chat-room";

const ChatHeader = ({
  currentRoom,
}: {
  currentRoom: UsersRooms | undefined;
}) => {
  const [open, setOpen] = React.useState(false);

  const router = useRouter();
  const refRBSheet = useRef<any>(null);

  // 👇 Get screen height and calculate 70%
  const screenHeight = Dimensions.get("window").height;
  const sheetHeight = screenHeight * 0.7;

  const handleCloseSheet = () => {
    refRBSheet.current?.close(); // 👈 Close the sheet safely
  };

  return (
    <>
      <DeleteRoomDialog
        currentRoom={currentRoom}
        open={open}
        setOpen={setOpen}
      />

      <View className="w-full flex-row justify-between px-4 items-center">
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
          height={sheetHeight}
          customStyles={{
            wrapper: {
              backgroundColor: "transparent",
            },
            container: {
              backgroundColor: "black",
              padding: 20,
            },
            draggableIcon: {
              backgroundColor: "#fff",
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
          {/* 👇 Pass the close handler */}
          <RoomSettings
            onClose={handleCloseSheet}
            currentRoom={currentRoom}
            setOpen={setOpen}
          />
        </RBSheet>
      </View>
    </>
  );
};

export default ChatHeader;
