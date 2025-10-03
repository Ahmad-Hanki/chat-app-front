import { View } from "react-native";
import { Button } from "./ui/button";
import { Text } from "./ui/text";

export const MainErrorFallback = () => {
  return (
    <View
      className="flex h-screen w-screen flex-col items-center justify-center text-red-500"
      role="alert"
    >
      <Text className="text-lg font-semibold">
        Ooops, something went wrong :({" "}
      </Text>
      <Button
        className="mt-4"
        onPress={() => window.location.assign(window.location.origin)}
      >
        Refresh
      </Button>
    </View>
  );
};
