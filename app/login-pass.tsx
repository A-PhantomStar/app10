// App.tsx
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, SafeAreaView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberedUser, setRememberedUser] = useState("Andres"); // cambia a "" para la primera versión
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      {/* Logo */}
      <Image source={require("../assets/images/logo.png")} style={styles.logo} />
      <Text style={styles.brand}>blossom</Text>
      <Text style={styles.subtitle}>Beauty brand</Text>

      {/* Texto superior */}
      {rememberedUser ? (
        <Text style={styles.welcomeText}>
          Welcome back, <Text style={styles.bold}>{rememberedUser}</Text>.
        </Text>
      ) : (
        <Text style={styles.welcomeText}>Please login to use the app</Text>
      )}

      {/* Campo email solo si no hay usuario recordado */}
      {!rememberedUser && (
        <TextInput
          placeholder="Email or user name"
          style={styles.input}
          value={username}
          onChangeText={setUsername}
        />
      )}

      {/* Campo password */}
      <View style={styles.passwordContainer}>
        <TextInput
          placeholder="Type password"
          secureTextEntry={!showPassword}
          style={styles.passwordInput}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Ionicons name={showPassword ? "eye" : "eye-off"} size={20} color="#999" />
        </TouchableOpacity>
      </View>

      {/* Forgot password */}
      <TouchableOpacity onPress={() => navigation.navigate("forgot-pass")}>
        <Text style={styles.forgotText}>Forgot password?</Text>
      </TouchableOpacity>

      {/* Botón Sign In */}
      <TouchableOpacity style={styles.signInButton} onPress={() => navigation.navigate("mainpage")}>
        <Text style={styles.signInText}>Sign In</Text>
      </TouchableOpacity>

      {/* Or connect with */}
      <Text style={styles.orText}>Or connect with</Text>
      <View style={styles.socialContainer}>
        <TouchableOpacity style={styles.socialButton}>
          <Image source={require("../assets/images/apple.png")} style={styles.socialIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton}>
          <Image source={require("../assets/images/facebook.png")} style={styles.socialIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton}>
          <Image source={require("../assets/images/google.png")} style={styles.socialIcon} />
        </TouchableOpacity>
      </View>

      {/* Sign Up */}
      <Text style={styles.signupText} onPress={() => navigation.navigate("signup")}>
        Don’t have an account? <Text style={styles.signupLink}>Sign Up</Text>
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
  },
  logo: {
    width: 60,
    height: 60,
    marginTop: 40,
    borderRadius: 12,
  },
  brand: {
    fontSize: 28,
    fontWeight: "400",
    marginTop: 10,
  },
  subtitle: {
    fontSize: 14,
    color: "#888",
    marginBottom: 30,
  },
  welcomeText: {
    fontSize: 16,
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
  },
  bold: {
    fontWeight: "bold",
  },
  input: {
    width: "100%",
    height: 50,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 30,
    backgroundColor: "#fff",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    height: 50,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    backgroundColor: "#fff",
    marginBottom: 10,
  },
  passwordInput: {
    flex: 1,
  },
  forgotText: {
    alignSelf: "flex-end",
    color: "#888",
    fontSize: 14,
    marginBottom: 20,
  },
  signInButton: {
    width: "100%",
    backgroundColor: "#f56600",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 25,
  },
  signInText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  orText: {
    color: "#888",
    marginBottom: 10,
  },
  socialContainer: {
    flexDirection: "row",
    gap: 20,
    marginBottom: 25,
  },
  socialButton: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 50,
    elevation: 2,
  },
  socialIcon: {
    width: 30,
    height: 30,
    resizeMode: "contain",
  },
  signupText: {
    color: "#555",
  },
  signupLink: {
    color: "#f56600",
    fontWeight: "bold",
  },
});
