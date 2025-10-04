import { NAV_THEME } from "@/lib/theme";
import { useColorScheme } from "nativewind";
import React from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const SafeScreen = ({ children }: { children: React.ReactNode }) => {
  const insets = useSafeAreaInsets();
  const { colorScheme } = useColorScheme();

  return (
    <View
      style={{
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        backgroundColor: NAV_THEME[colorScheme ?? "light"].colors.background,
        flex: 1,
      }}
    >
      {children}
    </View>
  );
};

export default SafeScreen;
