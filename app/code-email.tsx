import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function EmailVerification() {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [timer, setTimer] = useState(35);
  const navigation = useNavigation();
  useEffect(() => {
    let interval: any;
    if (timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleResend = () => {
    setTimer(35);
    console.log("Código reenviado");
  };

  const handleChange = (value: string, index: number) => {
    if (/^[0-9]?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
    }
  };


  return (
    <View style={styles.container}>
      {/* Flecha de retroceso */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

      <Text style={styles.title}>Email Verification</Text>
      <Text style={styles.subtitle}>Please type OTP code that we given you</Text>

      {/* Inputs OTP */}
      <View style={styles.otpContainer}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            style={styles.otpInput}
            keyboardType="numeric"
            maxLength={1}
            value={digit}
            onChangeText={(value) => handleChange(value, index)}
          />
        ))}
      </View>

      {/* Contador / Reenviar */}
      {timer > 0 ? (
        <Text style={styles.timer}>Reenviar en 00:{timer < 10 ? `0${timer}` : timer}</Text>
      ) : (
        <TouchableOpacity onPress={handleResend}>
          <Text style={styles.resend}>Reenviar código</Text>
        </TouchableOpacity>
      )}

      {/* Botón submit */}
      <TouchableOpacity style={styles.submitButton} onPress={() => navigation.navigate("new-pass")}>
        <Text style={styles.submitText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 20 },
  backButton: { position: "absolute", top: 20, left: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginTop: 60, marginBottom: 10 },
  subtitle: { fontSize: 14, color: "#666", marginBottom: 30 },
  otpContainer: { flexDirection: "row", justifyContent: "space-between", marginBottom: 20 },
  otpInput: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    fontSize: 18,
    textAlign: "center",
  },
  timer: { fontSize: 14, color: "red", marginBottom: 20 },
  resend: { fontSize: 14, color: "#007bff", marginBottom: 20 },
  submitButton: {
    backgroundColor: "orange",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  submitText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});
