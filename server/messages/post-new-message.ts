import { MutationConfig } from "@/config/queryClient";
import apiClient from "@/lib/api";
import { useMutation } from "@tanstack/react-query";

type MessageData = {
  roomId: string;
  userId: string;
  message: string;
};

type UseCreateNewMessageOptions = {
  mutationConfig?: MutationConfig<(data: MessageData) => Promise<void>>;
};

export async function createNewMessage(data: MessageData) {
  try {
    await apiClient.post(`/messages`, data);
  } catch (error) {
    console.error("Failed to create room:", error);
  }
}

export const useCreateNewMessage = ({
  mutationConfig,
}: UseCreateNewMessageOptions) => {
  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    mutationFn: (data: MessageData) => createNewMessage(data),

    onSuccess: (result, variables, context, mutation) => {
      onSuccess?.(result, variables, context, mutation);
    },

    ...restConfig,
  });
};
