import SafeScreen from "@/components/safe-screen";
import "@/global.css";
import { NAV_THEME } from "@/lib/theme";
import { AppProvider } from "@/providers/app-provider";
import { useUser } from "@clerk/clerk-expo";
import { ThemeProvider } from "@react-navigation/native";
import { PortalHost } from "@rn-primitives/portal";
import { Slot, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "nativewind";
import { useEffect } from "react";
import { ActivityIndicator } from "react-native";

function AuthGate() {
  const { isSignedIn, isLoaded } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isLoaded) return; // wait for auth to resolve
    if (isSignedIn) router.replace("/(tabs)/home");
    else router.replace("/(auth)/sign-in");
  }, [isSignedIn, isLoaded]);

  if (!isLoaded) return <ActivityIndicator size="large" />;

  return <Slot />;
}

export default function RootLayout() {
  const { colorScheme } = useColorScheme();

  return (
    <AppProvider>
      <SafeScreen>
        <ThemeProvider value={NAV_THEME[colorScheme ?? "light"]}>
          <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
          <AuthGate />
          <PortalHost />
        </ThemeProvider>
      </SafeScreen>
    </AppProvider>
  );
}
