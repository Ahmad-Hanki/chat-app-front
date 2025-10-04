import { QueryConfig } from "@/config/queryClient";
import apiClient from "@/lib/api";
import { Room } from "@/types/api";
import { queryOptions, useQuery } from "@tanstack/react-query";

export const getUsersRooms = async ({
  userId,
}: {
  userId: string;
}): Promise<{ data: Room[] } | null> => {
  const response = await apiClient.get(`/rooms/${userId}`);
  return response.data;
};

export const getUsersRoomsQueryOptions = ({ userId }: { userId: string }) => {
  return queryOptions({
    queryKey: ["rooms", userId],
    queryFn: () => getUsersRooms({ userId }),
  });
};

type UseUsersRoomsOptions = {
  queryConfig?: QueryConfig<typeof getUsersRoomsQueryOptions>;
  userId: string;
};

export const useUsersRooms = ({
  queryConfig,
  userId,
}: UseUsersRoomsOptions) => {
  return useQuery({
    ...getUsersRoomsQueryOptions({ userId }),
    ...queryConfig,
  });
};
