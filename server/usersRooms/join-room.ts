import { MutationConfig } from "@/config/queryClient";
import apiClient from "@/lib/api";
import { UserRoomSchemaTypeInput } from "@/schemas/user-room-scheme";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getUsersRoomsQueryOptions } from "./get-users-rooms";

type UseJoinUserRoomOptions = {
  mutationConfig?: MutationConfig<
    (data: UserRoomSchemaTypeInput) => Promise<void>
  >;
};

export async function joinUserRoom(data: UserRoomSchemaTypeInput) {
  try {
    await apiClient.post(`/rooms/${data.userId}/${data.roomNumber}`);
  } catch (error) {
    console.error("Failed to create room:", error);
  }
}

export const useJoinUserRoom = ({ mutationConfig }: UseJoinUserRoomOptions) => {
  const queryClient = useQueryClient();
  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    mutationFn: (data: UserRoomSchemaTypeInput) => joinUserRoom(data),

    onSuccess: (result, variables, context, mutation) => {
      queryClient.invalidateQueries({
        queryKey: getUsersRoomsQueryOptions({ userId: variables.userId })
          .queryKey,
      });

      onSuccess?.(result, variables, context, mutation);
    },

    ...restConfig,
  });
};
