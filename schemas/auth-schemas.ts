import * as z from "zod";

export const SignInSchema = z
  .object({
    email: z.string().email("Invalid email address"),
    name: z.string().min(2, "Name must be at least 2 characters long"),
    password: z.string().min(8, "Password must be at least 8 characters long"),
    confirmPassword: z
      .string()
      .min(8, "Confirm Password must be at least 8 characters long"),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: "custom",
        path: ["confirmPassword"],
        message: "Passwords do not match",
      });
    }
  });

export type SignInSchemaTypeInput = z.infer<typeof SignInSchema>;

export const VerifyEmailSchema = z.object({
  code: z.string().min(1, "Verification code is required"),
});
export type VerifyEmailSchemaTypeInput = z.infer<typeof VerifyEmailSchema>;
