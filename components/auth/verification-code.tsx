import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Text } from "@/components/ui/text";
import {
  VerifyEmailSchema,
  VerifyEmailSchemaTypeInput,
} from "@/schemas/auth-schemas";
import { useVerifyEmailMutation } from "@/server/auth";
import { useUser } from "@clerk/clerk-expo";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { ActivityIndicator, View } from "react-native";
import { Input } from "../ui/input";

export function VerificationCodeDialog({
  open,
  setOpen,
  name,
  email,
}: Readonly<{
  open: boolean;
  setOpen: (open: boolean) => void;
  name: string;
  email: string;
}>) {
  const router = useRouter();
  const { user } = useUser();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<VerifyEmailSchemaTypeInput>({
    resolver: zodResolver(VerifyEmailSchema),
    defaultValues: {
      code: "",
    },
  });

  const { mutate, isPending } = useVerifyEmailMutation({
    mutationConfig: {
      onSuccess: async () => {
        //   router.replace("/(main)/chats");
        console.log("User stored in DB successfully");
        setOpen(false);
      },
    },
  });

  const onSubmit: SubmitHandler<VerifyEmailSchemaTypeInput> = (
    data: VerifyEmailSchemaTypeInput
  ) => {
    mutate({
      code: data.code,
      email: email,
      password: "",
      confirmPassword: "",
      name: name,
    });
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Verify {email}</DialogTitle>
          <DialogDescription>
            Please enter the verification code sent to your email address.
          </DialogDescription>
        </DialogHeader>
        <View className="grid gap-4">
          <View className="flex-1 gap-3">
            <View className="gap-2">
              <Controller
                control={control}
                name="code"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    placeholder="Code"
                    value={value}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    autoCapitalize="none"
                    className="w-full"
                  />
                )}
              />
              {errors.code && (
                <Text className="text-sm text-red-500">
                  {errors.code.message}
                </Text>
              )}
            </View>
          </View>
        </View>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">
              <Text>Cancel</Text>
            </Button>
          </DialogClose>
          <Button onPress={handleSubmit(onSubmit)} disabled={false}>
            <Text>
              {isPending ? <ActivityIndicator size="small" /> : "Verify"}
            </Text>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
