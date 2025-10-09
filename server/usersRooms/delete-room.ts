import { MutationConfig } from "@/config/queryClient";
import apiClient from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getUsersRoomsQueryOptions } from "./get-users-rooms";

type UseDeleteRoomOptions = {
  mutationConfig?: MutationConfig<
    (data: { roomId: string; userId: string }) => Promise<void>
  >;
};

export async function deleteRoom(data: { roomId: string; userId: string }) {
  try {
    await apiClient.delete(`/rooms/${data.roomId}`);
  } catch (error) {
    console.error("Failed to delete room:", error);
  }
}

export const useDeleteRoom = ({ mutationConfig }: UseDeleteRoomOptions) => {
  const queryClient = useQueryClient();
  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    mutationFn: (data: { roomId: string; userId: string }) => deleteRoom(data),

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
