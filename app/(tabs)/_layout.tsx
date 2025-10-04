import { Stack } from "expo-router";
import React from "react";

const TabsLayout = () => {
  return (
    <Stack>
      {/* Home - no header */}
      <Stack.Screen
        name="home/index"
        options={{
          headerShown: false,
        }}
      />
      {/* Dynamic Room */}
      <Stack.Screen
        name="home/[roomId]" // reference the dynamic route
        options={{
          headerShown: false,
        }}
      />
      {/* Settings - shows header */}
      <Stack.Screen
        name="settings"
        options={{
          headerShown: true,
          title: "Settings", // Optional: custom title
        }}
      />
    </Stack>
  );
};

export default TabsLayout;
