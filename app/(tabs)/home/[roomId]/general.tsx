import { Card, CardContent } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { useUserData } from "@/server/auth";
import { useUsersRooms } from "@/server/usersRooms/get-users-rooms";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";

const General = () => {
  const { roomId } = useLocalSearchParams<{ roomId: string }>();
  const { data } = useUserData();

  const { data: rooms } = useUsersRooms({
    userId: data?.data.id || "",
    queryConfig: { enabled: !!data?.data.id },
  });

  const currentRoom = rooms?.data.find(
    (room) => room.room.id.toString() == roomId
  );

  console.log(currentRoom);
  console.log(roomId);

  return (
    <View className="gap-4 p-4" style={{ flex: 1 }}>
      <Card>
        <CardContent>
          <Text>{currentRoom?.room.name}</Text>
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <Text>{currentRoom?.room.roomNumber}</Text>
        </CardContent>
      </Card>
    </View>
  );
};

export default General;
