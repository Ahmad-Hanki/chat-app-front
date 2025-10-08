import { useUserData } from "@/server/auth";
import { useUser } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator } from "react-native";

function Index() {
  const { isLoaded, isSignedIn, user } = useUser();
  const { isLoading, data } = useUserData({
    queryConfig: {
      enabled:
        !!user?.emailAddresses?.[0].emailAddress && isSignedIn && isLoaded,
    },
  });

  const router = useRouter();

  useEffect(() => {
    if (!isLoaded) return;

    if (!isSignedIn) {
      router.replace("/(auth)/sign-in");
      return;
    }

    if (isLoading) return; // wait until user data is fetched

    if (data?.data) {
      router.replace("/(tabs)/home");
    }
  }, [isLoaded, isSignedIn, isLoading, data]);

  return <ActivityIndicator size="large" />;
}

export default Index;
