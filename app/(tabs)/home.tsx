import { UserMenu } from "@/components/user-menu";
import { useUserData } from "@/server/auth";
import { useUsersRooms } from "@/server/usersRooms/get-users-rooms";
import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { View } from "react-native";
const Home = () => {
  const { data } = useUserData();

  const { data: rooms } = useUsersRooms({
    userId: data?.data.id || "",
    queryConfig: { enabled: !!data?.data.id },
  });

  

  return (
    <View className="p-4" style={{ flex: 1 }}>
      <View className="w-full flex-row justify-between">
        <UserMenu />
        <AntDesign name="plus" size={24} color="green" />
      </View>
    </View>
  );
};

export default Home;
