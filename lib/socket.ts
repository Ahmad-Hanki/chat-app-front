// lib/socket.ts
import env from "@/secrets/env";
import { io } from "socket.io-client";

// Change this URL to your backend base URL
export const socket = io(env.socketUrl, {
  transports: ["websocket"],
});
