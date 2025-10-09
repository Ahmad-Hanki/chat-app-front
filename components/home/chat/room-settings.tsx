import { Card, CardContent } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { UsersRooms } from "@/types/api";
import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Pressable, View } from "react-native";

const RoomSettings = ({
  onClose,
  currentRoom,
  setOpen,
}: {
  onClose: () => void;
  currentRoom: UsersRooms | undefined;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const router = useRouter();

  return (
    <View className="gap-8">
      <View className="flex flex-row justify-between items-center">
        {/* 👇 Close the sheet on press */}
        <Pressable onPress={onClose}>
          <View className="flex flex-row gap-3 items-center">
            <AntDesign name="arrow-left" size={20} color="blue" />
            <Text className="text-blue-600">Back</Text>
          </View>
        </Pressable>

        <Text className="text-center font-bold text-lg text-white">
          Room Settings
        </Text>
      </View>

      <Pressable
        onPress={() => {
          router.push(`/home/${currentRoom?.roomId}/general`);
        }}
      >
        <Card>
          <CardContent>
            <View className="flex flex-row items-center justify-between">
              <View className="space-y-2">
                <Text>General</Text>
                <Text className="text-muted-foreground">
                  Change the name, description
                </Text>
              </View>
              <AntDesign name="arrow-right" size={20} color="gray" />
            </View>
          </CardContent>
        </Card>
      </Pressable>

      <Pressable
        onPress={() => {
          onClose();
          setOpen(true);
        }}
      >
        <Card className="bg-red-600/45">
          <CardContent>
            <View className="flex flex-row items-center justify-between">
              <View className="space-y-2">
                <Text>Delete Room</Text>
                <Text className="text-muted-foreground">
                  This action cannot be undone
                </Text>
              </View>
              <AntDesign name="delete" size={20} color="red" />
            </View>
          </CardContent>
        </Card>
      </Pressable>
    </View>
  );
};

export default RoomSettings;
