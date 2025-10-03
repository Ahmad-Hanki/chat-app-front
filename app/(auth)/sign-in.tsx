import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { SignInSchema, SignInSchemaTypeInput } from "@/schemas/auth-schemas";
import { useSignInMutation } from "@/server/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import React from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
} from "react-native";

const SignUpPage = () => {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInSchemaTypeInput>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate, isPending } = useSignInMutation({
    mutationConfig: {
      onSuccess: () => {
        router.replace("/(tabs)/home");
      },
    },
  });

  const onSubmit: SubmitHandler<SignInSchemaTypeInput> = (
    data: SignInSchemaTypeInput
  ) => {
    mutate(data);
  };
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0} // adjust if you have headers
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",

          padding: 20,
        }}
        keyboardShouldPersistTaps="handled"
      >
        <View className=" gap-3 ">
          <View className=" my-6">
            <Text className="text-2xl font-bold text-center">Sign In</Text>
            <Text className="text-center">Sign in to continue</Text>
          </View>

          <View>
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  placeholder="m@example.com"
                  value={value}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  className="w-full"
                />
              )}
            />
            {errors.email && (
              <Text className="text-sm text-red-500">
                {errors.email.message}
              </Text>
            )}
          </View>

          <View>
            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  placeholder="Password"
                  value={value}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  // keyboardType=""
                  autoCapitalize="none"
                  className="w-full"
                />
              )}
            />
            {errors.password && (
              <Text className="text-sm text-red-500">
                {errors.password.message}
              </Text>
            )}
          </View>

          <View className="mt-4">
            <Button onPress={handleSubmit(onSubmit)} className="w-full">
              {isPending ? <ActivityIndicator /> : <Text>Sign In</Text>}
            </Button>
          </View>
          <View className="mt-4">
            <Text>
              Dont have an account?{" "}
              <Text
                onPress={() => {
                  router.push("/(auth)/sign-up");
                }}
                className="text-blue-500"
              >
                Sign Up
              </Text>
            </Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignUpPage;
