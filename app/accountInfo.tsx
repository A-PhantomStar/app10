import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import { Alert, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";


export default function AccountInfoScreen() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [dob, setDob] = useState(new Date(2004, 6, 20));
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [interest, setInterest] = useState<"women" | "men">("women");

    const [changePassword, setChangePassword] = useState(false);
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showNewPass, setShowNewPass] = useState(false);
    const [showConfirmPass, setShowConfirmPass] = useState(false);

    const navigation = useNavigation();

    const isPasswordValid = () =>
    newPassword.length >= 6 && newPassword === confirmPassword;

    const handleSave = () => {
    if (changePassword && !isPasswordValid()) {
        Alert.alert("");
        return;
    }

    Alert.alert("Changes Saved", "Your information has been updated.");
    navigation.navigate('mainpage');    
};

    

    return (
    <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.select({ ios: "padding", android: undefined })}
    >
        {/* Header */}
        <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>
            <Text style={styles.headerText}>Account Information</Text>
        </View>

        {/* Full Name */}
        <Text style={styles.label}>Full Name</Text>
        <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        />

        {/* Email */}
        <Text style={styles.label}>Email</Text>
        <TextInput
        style={styles.input}
        value={email}
        keyboardType="email-address"
        onChangeText={setEmail}
        />

        {/* Date of Birth */}
        <Text style={styles.label}>Date of Birth</Text>
        <TouchableOpacity
        onPress={() => setShowDatePicker(true)}
        style={styles.dateInput}
        >
        <Text>{dob.toDateString()}</Text>
        <Ionicons name="calendar" size={20} color="#999" />
        </TouchableOpacity>

        {showDatePicker && (
        <DateTimePicker
            value={dob}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => {
            setShowDatePicker(false);
            if (selectedDate) setDob(selectedDate);
            }}
        />
        )}

        {/* Change password button */}
        <Text style={styles.label}>Password</Text>
        {!changePassword ? (
        <>
            <View style={styles.passwordInput}>
            <TextInput value="**********" editable={false} style={{ flex: 1 }} />
            </View>
            <TouchableOpacity onPress={() => setChangePassword(true)}>
            <Text style={styles.changePassword}>Change password</Text>
            </TouchableOpacity>
        </>
        ) : (
        <>
            {/* New Password */}
            <TextInput
            style={styles.input}
            placeholder="New Password"
            secureTextEntry={!showNewPass}
            value={newPassword}
            onChangeText={setNewPassword}
            />
            <TouchableOpacity
            style={styles.eyeButton}
            onPress={() => setShowNewPass(!showNewPass)}
            >
            <Ionicons
                name={showNewPass ? "eye-off" : "eye"}
                size={20}
                color="#999"
            />
            </TouchableOpacity>

            {/* Confirm Password */}
            <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            secureTextEntry={!showConfirmPass}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            />
            <TouchableOpacity
            style={styles.eyeButton}
            onPress={() => setShowConfirmPass(!showConfirmPass)}
            >
            <Ionicons
                name={showConfirmPass ? "eye-off" : "eye"}
                size={20}
                color="#999"
            />
            </TouchableOpacity>
        </>
        )}

        {/* Interests */}
        <Text style={[styles.label, { marginTop: 20 }]}>Mostly Interested:</Text>
        <TouchableOpacity
        style={styles.radioOption}
        onPress={() => setInterest("women")}
        >
        <MaterialIcons
            name={
            interest === "women"
                ? "radio-button-checked"
                : "radio-button-unchecked"
            }
            size={20}
            color={interest === "women" ? "#FF6B00" : "#ccc"}
        />
        <Text style={styles.radioText}>Product for Womens</Text>
        </TouchableOpacity>

        <TouchableOpacity
        style={styles.radioOption}
        onPress={() => setInterest("men")}
        >
        <MaterialIcons
            name={
            interest === "men"
                ? "radio-button-checked"
                : "radio-button-unchecked"
            }
            size={20}
            color={interest === "men" ? "#FF6B00" : "#ccc"}
        />
        <Text style={styles.radioText}>Product for Mens</Text>
        </TouchableOpacity>

        {/* Save Button */}
        <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Save Changes</Text>
        </TouchableOpacity>
    </KeyboardAvoidingView>
    );
    }

    const styles = StyleSheet.create({
    container: {
    padding: 20,
    backgroundColor: "#fff",
    flex: 1,
    },
    header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 25,
    },
    headerText: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
    },
    label: {
    marginTop: 15,
    fontSize: 14,
    color: "#888",
    },
    input: {
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 10,
    padding: 12,
    marginTop: 5,
    fontSize: 14,
    },
    dateInput: {
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 10,
    padding: 12,
    marginTop: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    },
    passwordInput: {
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginTop: 5,
    flexDirection: "row",
    alignItems: "center",
    },
    changePassword: {
    color: "#FF6B00",
    fontSize: 14,
    alignSelf: "flex-end",
    marginTop: 5,
    },
    eyeButton: {
    position: "absolute",
    right: 20,
    top: 12,
    },
    radioOption: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
    },
    radioText: {
    marginLeft: 10,
    fontSize: 14,
    },
    button: {
    backgroundColor: "#FF6B00",
    paddingVertical: 15,
    alignItems: "center",
    borderRadius: 10,
    marginTop: 30,
    },
    buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    },
});
