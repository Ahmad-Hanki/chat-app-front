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
import { useDeleteRoom } from "@/server/usersRooms/delete-room";
import { UsersRooms } from "@/types/api";
import { ActivityIndicator } from "react-native";

export function DeleteRoomDialog({
  open,
  setOpen,
  currentRoom,
}: Readonly<{
  open: boolean;
  setOpen: (open: boolean) => void;
  currentRoom: UsersRooms | undefined;
}>) {
  const { mutate, isPending } = useDeleteRoom({
    mutationConfig: {
      onSuccess: () => {
        setOpen(false);
      },
    },
  });
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="min-w-full ">
        <DialogHeader>
          <DialogTitle>Delete Chat Room</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this chat room? This action cannot
            be undone.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="space-x-2">
          <DialogClose asChild>
            <Button variant="outline" onPress={() => setOpen(false)}>
              <Text>Cancel</Text>
            </Button>
          </DialogClose>
          <Button
            variant="destructive"
            onPress={() => {
              mutate({
                roomId: currentRoom?.roomId || "",
                userId: currentRoom?.userId || "",
              });
            }}
          >
            {isPending ? <ActivityIndicator /> : <Text>Delete</Text>}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
