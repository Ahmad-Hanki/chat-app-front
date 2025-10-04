import { CreateNewRoomDialog } from "@/components/home/add-new-room-dialog";
import { UserMenu } from "@/components/user-menu";
import { useUserData } from "@/server/auth";
import { useUsersRooms } from "@/server/usersRooms/get-users-rooms";
import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { View } from "react-native";
const Home = () => {
  const [open, setOpen] = React.useState(false);
  const { data } = useUserData();

  const { data: rooms } = useUsersRooms({
    userId: data?.data.id || "",
    queryConfig: { enabled: !!data?.data.id },
  });

  return (
    <View className="p-4" style={{ flex: 1 }}>
      <CreateNewRoomDialog
        open={open}
        setOpen={setOpen}
        userId={data?.data?.id ?? ""}
      />
      <View className="w-full flex-row justify-between">
        <UserMenu />
        <AntDesign
          name="plus"
          size={24}
          color="green"
          onPress={() => setOpen(true)}
        />
      </View>
    </View>
  );
};

export default Home;
