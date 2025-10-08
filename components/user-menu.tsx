import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Text } from "@/components/ui/text";
import { cn } from "@/lib/utils";
import { useSignOutMutation, useUserData } from "@/server/auth";
import type { TriggerRef } from "@rn-primitives/popover";
import { useRouter } from "expo-router";
import { LogOutIcon, SettingsIcon } from "lucide-react-native";
import * as React from "react";
import { ActivityIndicator, ImageSourcePropType, View } from "react-native";

export function UserMenu() {
  const router = useRouter();
  const { data } = useUserData();
  const { mutate, isPending } = useSignOutMutation({
    mutationConfig: {
      onSuccess: () => {
        router.replace("/(auth)/sign-in");
      },
    },
  });

    console.log("User data in Home component:", data?.data);

  const popoverTriggerRef = React.useRef<TriggerRef>(null);

  async function onSignOut() {
    mutate(undefined);
  }

  const USER = {
    fullName: data?.data.name || "Zach Nugent",
    initials: data?.data?.name?.[0] || "A",
    imgSrc: { uri: data?.data.image ?? "" },
  };
  return (
    <Popover>
      <PopoverTrigger asChild ref={popoverTriggerRef}>
        <Button variant="ghost" size="icon" className="size-8 rounded-full">
          <UserAvatar
            image={USER.imgSrc ?? undefined}
            initials={USER.initials || "A"}
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="center" side="bottom" className="w-80 p-0">
        <View className="border-border gap-3 border-b p-3">
          <View className="flex-row items-center gap-3">
            <UserAvatar
              className="size-10"
              image={USER.imgSrc ?? undefined}
              initials={USER.initials || "A"}
            />
            <View className="flex-1">
              <Text className="font-medium leading-5">{USER.fullName}</Text>
            </View>
          </View>
          <View className="flex-row flex-wrap gap-3 py-0.5">
            <Button
              variant="outline"
              size="sm"
              onPress={() => {
                popoverTriggerRef.current?.close();
                router.push("/(tabs)/settings");
              }}
            >
              <Icon as={SettingsIcon} className="size-4" />
              <Text>Manage Account</Text>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="flex-1"
              onPress={onSignOut}
            >
              <Icon as={LogOutIcon} className="size-4" />
              <Text>{isPending ? <ActivityIndicator /> : "Sign Out"}</Text>
            </Button>
          </View>
        </View>
      </PopoverContent>
    </Popover>
  );
}

function UserAvatar({
  className,
  image,
  initials,
  ...props
}: Omit<React.ComponentProps<typeof Avatar>, "alt"> & {
  image?: ImageSourcePropType;
  initials?: string;
}) {
  return (
    <Avatar alt={`'avatar`} className={cn("size-8", className)} {...props}>
      <AvatarImage source={(image as ImageSourcePropType) ?? undefined} />
      <AvatarFallback>
        <Text>{initials}</Text>
      </AvatarFallback>
    </Avatar>
  );
}
