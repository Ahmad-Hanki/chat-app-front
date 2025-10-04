import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { UsersRooms } from "@/types/api";
import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useColorScheme } from "nativewind";
import React from "react";
import { FlatList, Pressable, View } from "react-native";
import { Text } from "../ui/text";

const RoomsList = ({ rooms }: { rooms: UsersRooms[] }) => {
  const { colorScheme } = useColorScheme();
  const router = useRouter();

  return (
    <View>
      <FlatList
        data={rooms}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={() => (
          <View className="p-4 border-b border-gray-200">
            <Text className="text-lg font-medium">Rooms</Text>
          </View>
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ gap: 10 }}
        ListEmptyComponent={() => (
          <View className="p-4">
            <Text className="text-center text-gray-500">No rooms found</Text>
          </View>
        )}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => {
              router.push(`/home/${item.room.roomNumber}`);
            }}
          >
            <Card>
              <CardHeader>
                <CardTitle>{item.room.name}</CardTitle>
                <CardDescription>
                  Room Number: {item.room.roomNumber}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <View className="flex flex-row justify-between">
                  {item?.room?.message?.[0]?.message ? (
                    <Text className="text-sm text-gray-600">
                      Last message: {item.room.message[0].message}
                    </Text>
                  ) : (
                    <Text className="text-sm text-gray-600">
                      No messages yet
                    </Text>
                  )}

                  <AntDesign
                    name="arrow-right"
                    size={24}
                    color={colorScheme === "dark" ? "white" : "black"}
                  />
                </View>
              </CardContent>
            </Card>
          </Pressable>
        )}
      />
    </View>
  );
};

export default RoomsList;
