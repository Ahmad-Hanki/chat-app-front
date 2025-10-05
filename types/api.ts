export type User = {
  id: string;
  email: string;
  image?: string;
  name?: string;
  clerkId: string;
  createdAt: string;
  updatedAt: string;
};
export type Message = {
  id: string;
  message: string;
  userId: string;
  roomId: string;
  createdAt: string; // serialized to string if sending via JSON
  user: User;
};

export type Room = {
  id: string;
  name: string;
  roomNumber: number;
  createdAt: string; // serialized to string
  message: Message[]; // array of messages (in your query, it's last message with take:1)
};

export type UsersRooms = {
  id: string; // id of the UserRooms relation
  userId: string;
  roomId: string;
  room: Room;
};
