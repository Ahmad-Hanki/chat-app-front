import { VerificationCodeDialog } from "@/components/auth/verification-code";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { SignUpSchema, SignUpSchemaTypeInput } from "@/schemas/auth-schemas";
import { useSignUpMutation } from "@/server/auth";
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
  const [verificationCodeOpen, setVerificationCodeOpen] = React.useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<SignUpSchemaTypeInput>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const { mutate, isPending } = useSignUpMutation({
    mutationConfig: {
      onSuccess: () => {
        console.log("Sign up successful, please verify your email.");
        setVerificationCodeOpen(true);
      },
    },
  });

  const onSubmit: SubmitHandler<SignUpSchemaTypeInput> = (
    data: SignUpSchemaTypeInput
  ) => {
    mutate(data);
  };
  return (
    <>
      {/* {verificationCodeOpen ? ( */}
      <VerificationCodeDialog
        email={watch("email")}
        open={verificationCodeOpen}
        setOpen={setVerificationCodeOpen}
        name={watch("name")}
      />
      {/* ) : ( */}
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
              <Text className="text-2xl font-bold text-center">Sign Up</Text>
              <Text className="text-center">Sign up to continue</Text>
            </View>

            <View>
              <Controller
                control={control}
                name="name"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    placeholder="Ahmad"
                    value={value}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    keyboardType="default"
                    autoCapitalize="words"
                    className="w-full"
                  />
                )}
              />
              {errors.name && (
                <Text className="text-sm text-red-500">
                  {errors.name.message}
                </Text>
              )}
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
            <View>
              <Controller
                control={control}
                name="confirmPassword"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    value={value}
                    placeholder="Confirm Password"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    // keyboardType=""
                    autoCapitalize="none"
                    className="w-full"
                  />
                )}
              />
              {errors.confirmPassword && (
                <Text className="text-sm text-red-500">
                  {errors.confirmPassword.message}
                </Text>
              )}
            </View>

            <View className="mt-4">
              <Button onPress={handleSubmit(onSubmit)} className="w-full">
                {isPending ? <ActivityIndicator /> : <Text>Sign Up</Text>}
              </Button>
            </View>
            <View className="mt-4">
              <Text>
                Already have an account?{" "}
                <Text
                  onPress={() => {
                    router.push("/(auth)/sign-in");
                  }}
                  className="text-blue-500"
                >
                  Sign In
                </Text>
              </Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      {/* )} */}
    </>
  );
};

export default SignUpPage;
