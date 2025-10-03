interface EnvType {
  apiUrl: string;
  socketUrl: string;
}

const env: EnvType = {
  apiUrl: process.env.EXPO_PUBLIC_API_URL || "",
  socketUrl: process.env.EXPO_PUBLIC_SOCKET_URL || "",
};

export default env;
