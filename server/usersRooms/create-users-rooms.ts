import { MutationConfig } from "@/config/queryClient";
import apiClient from "@/lib/api";
import { UserRoomSchemaTypeInput } from "@/schemas/user-room-scheme";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getUsersRoomsQueryOptions } from "./get-users-rooms";

type UseCreateUserRoomOptions = {
  mutationConfig?: MutationConfig<
    (data: UserRoomSchemaTypeInput) => Promise<void>
  >;
};

export async function createUserRoom(data: UserRoomSchemaTypeInput) {
  try {
    await apiClient.post(`/rooms/${data.userId}`, data);
  } catch (error) {
    console.error("Failed to create room:", error);
  }
}

export const useCreateUserRoom = ({
  mutationConfig,
}: UseCreateUserRoomOptions) => {
  const queryClient = useQueryClient();
  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    mutationFn: (data: UserRoomSchemaTypeInput) => createUserRoom(data),

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
