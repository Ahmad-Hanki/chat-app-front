import React from "react";
import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";

const SignUpPage = () => {
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
        
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignUpPage;
