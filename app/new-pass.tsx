import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function CreatePassword() {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            {/* Flecha volver */}
            <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.goBack()}
            >
                <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>

            {/* Títulos */}
            <Text style={styles.title}>Create new{"\n"}Password</Text>
            <Text style={styles.subtitle}>
                And now, you can create new password and confirm it below
            </Text>

            {/* Campo contraseña */}
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder="New password"
                    style={styles.input}
                    secureTextEntry={!showPassword}
                    value={password}
                    onChangeText={setPassword}
                />
                <TouchableOpacity
                    onPress={() => setShowPassword(!showPassword)}
                    style={styles.iconButton}
                >
                    <Ionicons
                        name={showPassword ? "eye-off-outline" : "eye-outline"}
                        size={22}
                        color="#888"
                    />
                </TouchableOpacity>
            </View>

            {/* Campo confirmar contraseña */}
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder="Confirm password"
                    style={styles.input}
                    secureTextEntry={!showConfirmPassword}
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                />
                <TouchableOpacity
                    onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                    style={styles.iconButton}
                >
                    <Ionicons
                        name={showConfirmPassword ? "eye-off-outline" : "eye-outline"}
                        size={22}
                        color="#888"
                    />
                </TouchableOpacity>
            </View>

            {/* Botón siguiente */}
            <TouchableOpacity
                style={styles.nextButton}
                onPress={() => navigation.navigate("mainpage")}
            >
                <Text style={styles.nextButtonText}>Next</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 50,
        backgroundColor: "#fff",
    },
    backButton: {
        marginBottom: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#000",
    },
    subtitle: {
        fontSize: 14,
        color: "#666",
        marginTop: 8,
        marginBottom: 30,
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 15,
    },
    input: {
        flex: 1,
        height: 50,
    },
    iconButton: {
        padding: 5,
    },
    nextButton: {
        backgroundColor: "#FF6B3C",
        paddingVertical: 14,
        borderRadius: 8,
        alignItems: "center",
        marginTop: 10,
    },
    nextButtonText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16,
    },
});
