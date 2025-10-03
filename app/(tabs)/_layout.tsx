import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        // tabBarActiveTintColor: COLORS.primary,
        // tabBarInactiveTintColor: COLORS.textLight,
        tabBarStyle: {
          // backgroundColor: COLORS.white,
          // borderTopColor: COLORS.border,
          borderWidth: 1,
          paddingBottom: 7,
          paddingTop: 7,
          height: 70,
        },
      }}
    >
      <Tabs.Screen
        options={{
          title: "Explore",
          tabBarIcon: ({ focused, size, color }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={size}
              color={color}
            />
          ),
        }}
        name="home"
      />
    </Tabs>
  );
};

export default TabsLayout;
