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
import { useCreateUserRoom } from "@/server/usersRooms/create-users-rooms";
import { useJoinUserRoom } from "@/server/usersRooms/join-room";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
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
  const [createOrJoin, setCreateOrJoin] = useState<"create" | "join">("create");
  const [error, setError] = useState<string | null>(null);
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
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
  const { mutate: joinMutate, isPending: joinIsPending } = useJoinUserRoom({
    mutationConfig: {
      onSuccess: async () => {
        setOpen(false);
      },
      onError: (error) => {
        console.error("Error joining room:", error);
        setError(
          error.message || "Failed to join room. Please check the room number."
        );
      },
    },
  });

  const onSubmit: SubmitHandler<UserRoomSchemaTypeInput> = (
    data: UserRoomSchemaTypeInput
  ) => {
    if (createOrJoin === "create") {
      mutate(data);
    } else {
      joinMutate(data);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="min-w-full flex-1 max-h-[400px]">
        <DialogHeader>
          <DialogTitle>
            {createOrJoin === "create" ? "Create a New Room" : "Join a Room"}
          </DialogTitle>
          <DialogDescription>
            {createOrJoin === "create"
              ? "Create a new room to start chatting."
              : "Join an existing room by entering the room number."}
          </DialogDescription>
        </DialogHeader>
        <View className="grid gap-4">
          <View className=" gap-3">
            {createOrJoin == "create" && (
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
            )}
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
                    keyboardType="numeric"
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
        <DialogFooter className="mt-5">
          <DialogClose asChild>
            <Button variant="destructive">
              <Text>Cancel</Text>
            </Button>
          </DialogClose>
          <Button
            variant="outline"
            onPress={() => {
              setCreateOrJoin((prev) => {
                if (prev === "create") {
                  setValue("roomName", "default");
                } else {
                  setValue("roomName", "");
                }
                return prev === "create" ? "join" : "create";
              });
            }}
          >
            <Text>
              {createOrJoin === "create"
                ? "Join an Existing Room"
                : "Create a New Room"}
            </Text>
          </Button>
          <Button
            onPress={handleSubmit(onSubmit)}
            disabled={isPending || joinIsPending}
          >
            {isPending || joinIsPending ? (
              <ActivityIndicator size="small" />
            ) : (
              <Text>
                {createOrJoin === "create" ? "Create Room" : "Join Room"}
              </Text>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
