import { MutationConfig } from "@/config/queryClient";
import apiClient from "@/lib/api";
import {
  SignInSchemaTypeInput,
  VerifyEmailSchemaTypeInput,
} from "@/schemas/auth-schemas";
import { useSignUp } from "@clerk/clerk-expo";
import { useMutation } from "@tanstack/react-query";

type UseSignUpOptions = {
  mutationConfig?: MutationConfig<
    (data: SignInSchemaTypeInput) => Promise<void>
  >;
};

export const useSignUpMutation = ({ mutationConfig }: UseSignUpOptions) => {
  const { isLoaded, signUp } = useSignUp();

  return useMutation({
    mutationFn: async (data: SignInSchemaTypeInput) => {
      console.log("Signing up user with data:", data);
      if (!isLoaded) return;

      try {
        await signUp.create({
          emailAddress: data.email,
          password: data.password,
        });

        await signUp.prepareEmailAddressVerification({
          strategy: "email_code",
        });
        console.log("Sign up initiated, verification email sent.");
      } catch (error) {
        console.error("Error during sign up:", error);
        throw error;
      }
    },
    onSuccess: (...args) => {
      mutationConfig?.onSuccess?.(...args);
    },
    ...mutationConfig,
  });
};

export const storeUserInDB = async (data: {
  email: string;
  clerkId: string;
  name: string;
}) => {
  try {
    console.log(data);
    const response = await apiClient.post("/user", data);
    return response.data;
  } catch (error) {
    console.error("Error storing user in DB:", error);
    throw error;
  }
};

type UseVerifyEmailOptions = {
  mutationConfig?: MutationConfig<
    (data: VerifyEmailSchemaTypeInput) => Promise<void>
  >;
};

export const useVerifyEmailMutation = ({
  mutationConfig,
}: UseVerifyEmailOptions) => {
  const { isLoaded, signUp, setActive } = useSignUp();

  return useMutation({
    mutationFn: async (
      data: VerifyEmailSchemaTypeInput & SignInSchemaTypeInput
    ) => {
      if (!isLoaded) return;

      try {
        const signUpAttempt = await signUp.attemptEmailAddressVerification({
          code: data.code,
        });

        if (signUpAttempt.status !== "complete") {
          throw new Error("Email verification failed");
        } else {
          const clerkUserId = signUpAttempt.createdUserId;

          if (!clerkUserId) {
            throw new Error("User ID not found after verification");
          }

          await storeUserInDB({
            email: data.email,
            clerkId: clerkUserId,
            name: data.name,
          });

          await setActive({ session: signUpAttempt.createdSessionId });
        }
      } catch (error) {
        console.error("Error during email verification:", error);
        throw error;
      }
    },
    onSuccess: async (...args) => {
      mutationConfig?.onSuccess?.(...args);
    },
    ...mutationConfig,
  });
};
