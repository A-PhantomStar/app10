// ForgotPasswordScreen.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function ForgotPasswordScreen() {
  const navigation = useNavigation();
  const [isEmailMode, setIsEmailMode] = useState(true);
  const [inputValue, setInputValue] = useState("");

  const toggleMode = () => {
    setIsEmailMode((prev) => !prev);
    setInputValue(""); // Limpia el campo al cambiar
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      {/* Botón de atrás */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backArrow}>←</Text>
      </TouchableOpacity>

      {/* Título */}
      <Text style={styles.title}>Forgot</Text>
      <Text style={styles.title}>Password</Text>

      {/* Subtítulo */}
      <Text style={styles.subtitle}>
        Please type your {isEmailMode ? "email" : "phone number"} below and we will give you a OTP code
      </Text>

      {/* Campo de entrada */}
      <TextInput
        placeholder={isEmailMode ? "Type your Email" : "Type your Phone Number"}
        placeholderTextColor="#B0B0B0"
        value={inputValue}
        onChangeText={setInputValue}
        keyboardType={isEmailMode ? "email-address" : "phone-pad"}
        autoCapitalize="none"
        style={styles.input}
      />

      {/* Enlace para alternar */}
      <TouchableOpacity style={styles.linkWrapper} onPress={toggleMode}>
        <Text style={styles.linkText}>
          {isEmailMode ? "Use phone number?" : "Use email?"}
        </Text>
      </TouchableOpacity>

      {/* Botón Next */}
      <TouchableOpacity style={styles.nextButton}>
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 24,
    paddingTop: 50,
  },
  backButton: {
    marginBottom: 20,
  },
  backArrow: {
    fontSize: 22,
    color: "#000",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#1A1A1A",
  },
  subtitle: {
    fontSize: 14,
    color: "#6B6B6B",
    marginTop: 10,
    marginBottom: 30,
  },
  input: {
    borderWidth: 1,
    borderColor: "#E5E5E5",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: "#000",
  },
  linkWrapper: {
    marginTop: 10,
    marginBottom: 20,
  },
  linkText: {
    fontSize: 14,
    color: "#6B6B6B",
  },
  nextButton: {
    backgroundColor: "#FF6B00",
    paddingVertical: 14,
    borderRadius: 8,
  },
  nextButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },
});
