import { useUserData } from "@/server/auth";
import { useUser } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator } from "react-native";

function Index() {
  const { isLoaded, isSignedIn, user } = useUser();
  const { isLoading } = useUserData({
    queryConfig: {
      enabled:
        !!user?.emailAddresses?.[0].emailAddress && isSignedIn && isLoaded,
    },
  });

  const router = useRouter();

  useEffect(() => {
    if (!isLoaded) return;
    if (isSignedIn) {
      if (isLoading) return;
      router.replace("/(tabs)/home");
    } else router.replace("/(auth)/sign-in");
  }, [isLoaded, isSignedIn, isLoading]);

  return <ActivityIndicator size="large" />;
}

export default Index;
