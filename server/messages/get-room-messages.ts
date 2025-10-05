import { QueryConfig } from "@/config/queryClient";
import apiClient from "@/lib/api";
import { Message } from "@/types/api";
import { queryOptions, useQuery } from "@tanstack/react-query";

export const getRoomMessages = async ({
  roomId,
}: {
  roomId: string;
}): Promise<{ data: Message[] } | null> => {
  const response = await apiClient.get(`/messages/${roomId}`);
  return response.data ?? null;
};

export const getRoomMessagesQueryOptions = ({ roomId }: { roomId: string }) => {
  return queryOptions({
    queryKey: ["rooms", roomId],
    queryFn: () => getRoomMessages({ roomId }),
  });
};

type UseRoomMessagesOptions = {
  queryConfig?: QueryConfig<typeof getRoomMessagesQueryOptions>;
  roomId: string;
};

export const useRoomsMessages = ({
  queryConfig,
  roomId,
}: UseRoomMessagesOptions) => {
  return useQuery({
    ...getRoomMessagesQueryOptions({ roomId }),
    ...queryConfig,
  });
};
