import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Text } from "@/components/ui/text";

import {
  userRoomSchema,
  UserRoomSchemaTypeInput,
} from "@/schemas/user-room-scheme";
import { useCreateUserRoom } from "@/server/usersRooms/creaet-users-rooms";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { ActivityIndicator, View } from "react-native";
import { Input } from "../ui/input";

export function CreateNewRoomDialog({
  open,
  setOpen,
  userId,
}: Readonly<{
  open: boolean;
  userId: string;
  setOpen: (open: boolean) => void;
}>) {
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<UserRoomSchemaTypeInput>({
    resolver: zodResolver(userRoomSchema),
    defaultValues: {
      roomName: "",
      userId,
    },
  });

  const { mutate, isPending } = useCreateUserRoom({
    mutationConfig: {
      onSuccess: async () => {
        setOpen(false);
      },
    },
  });

  const onSubmit: SubmitHandler<UserRoomSchemaTypeInput> = (
    data: UserRoomSchemaTypeInput
  ) => {
    mutate(data);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="min-w-full">
        <DialogHeader>
          <DialogTitle>Create a New Room</DialogTitle>
          <DialogDescription>
            Enter the details to create a new room.
          </DialogDescription>
        </DialogHeader>
        <View className="grid gap-4">
          <View className=" gap-3">
            <View className="gap-2">
              <Controller
                control={control}
                name="roomName"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    placeholder="Room Name"
                    value={value}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    autoCapitalize="none"
                    className="w-full"
                  />
                )}
              />
              {errors.roomName && (
                <Text className="text-sm text-red-500">
                  {errors.roomName.message}
                </Text>
              )}
            </View>
            <View className="gap-2">
              <Controller
                control={control}
                name="roomNumber"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    placeholder="Room Number"
                    value={value?.toString() ?? ""}
                    onBlur={onBlur}
                    onChangeText={(text) => onChange(Number(text))}
                    autoCapitalize="none"
                    className="w-full"
                  />
                )}
              />
              {errors.roomNumber && (
                <Text className="text-sm text-red-500">
                  {errors.roomNumber.message}
                </Text>
              )}
            </View>
          </View>
        </View>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">
              <Text>Cancel</Text>
            </Button>
          </DialogClose>
          <Button onPress={handleSubmit(onSubmit)} disabled={false}>
            <Text>
              {isPending ? <ActivityIndicator size="small" /> : "Create Room"}
            </Text>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
