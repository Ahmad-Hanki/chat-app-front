import z from "zod";

export const userRoomSchema = z.object({
  userId: z.string().min(1),

  roomNumber: z.number().min(1).max(10),
  roomName: z.string().min(1).max(100),
});

export type UserRoomSchemaTypeInput = z.infer<typeof userRoomSchema>;
