// ProfileScreen.tsx
import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import FooterNav from "../components/FooterNav";
import { useNavigation } from "@react-navigation/native";

export default function ProfileScreen() {
    const avatarUrl = "https://api.dicebear.com/7.x/avataaars/png?seed=Andres";
    const navigation = useNavigation();

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#F7F8FA" }}>
            <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
                {/* Header */}
                <LinearGradient
                    colors={["#FF7B00", "#FF4E00"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.header}
                >
                    {/* Icono editar/config */}
                    <TouchableOpacity style={styles.editIcon}>
                        <Ionicons name="create-outline" size={22} color="#fff" />
                    </TouchableOpacity>

                    {/* Avatar (DiceBear) */}
                    <Image source={{ uri: avatarUrl }} style={styles.avatar} />

                    <Text style={styles.name}>Andres</Text>
                    <Text style={styles.username}>@socien_sfy</Text>

                    {/* Stats */}
                    <View style={styles.statsContainer}>
                        {[
                            { label: "Posts", value: 2 },
                            { label: "Orders", value: 6 },
                            { label: "Wish List", value: 5 },
                            { label: "Likes", value: 248 },
                        ].map((s, i) => (
                            <View key={i} style={styles.stat}>
                                <Text style={styles.statNumber}>{s.value}</Text>
                                <Text style={styles.statLabel}>{s.label}</Text>
                            </View>
                        ))}
                    </View>
                </LinearGradient>

                {/* Menú */}
                <View style={{ marginTop: 16, paddingHorizontal: 16 }}>
                    {menuItems.map((item, idx) => (
                        <TouchableOpacity
                            key={idx}
                            style={styles.menuItem}
                            onPress={() => {
                                if (item.route) {
                                    navigation.navigate(item.route as never); // 'as never' para TypeScript
                                }
                            }}
                        >
                            <View style={[styles.iconContainer, { backgroundColor: item.color }]}>
                                <Ionicons name={item.icon as any} size={20} color="#fff" />
                            </View>
                            <Text style={styles.menuText}>{item.title}</Text>
                            <Ionicons name="chevron-forward" size={20} color="#ccc" />
                        </TouchableOpacity>
                    ))}

                </View>
            </ScrollView>

            {/* FooterNav tal como en mainpage */}
            <View pointerEvents="auto">
                <FooterNav active="profile" />
            </View>
        </SafeAreaView>
    );
}

const menuItems = [
    { title: "Account Information", icon: "person-outline", color: "#FF6B00", route: "accountInfo" },
    { title: "My Order", icon: "cube-outline", color: "#2ECC71", route: "orders" },
    { title: "Payment Method", icon: "card-outline", color: "#F39C12" },
    { title: "Delivery Address", icon: "location-outline", color: "#8E44AD" },
    { title: "Settings", icon: "settings-outline", color: "#34495E" },
    { title: "Contact with Us", icon: "chatbubbles-outline", color: "#3498DB" },
    { title: "About Us", icon: "information-circle-outline", color: "#9B59B6" },
];

const styles = StyleSheet.create({
    header: {
        paddingTop: 48,
        paddingBottom: 20,
        alignItems: "center",
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
    },
    editIcon: {
        position: "absolute",
        top: 50,
        right: 18,
        backgroundColor: "rgba(255,255,255,0.2)",
        padding: 6,
        borderRadius: 999,
    },
    avatar: {
        width: 78,
        height: 78,
        borderRadius: 39,
        borderWidth: 2,
        borderColor: "#fff",
        marginBottom: 8,
        backgroundColor: "#fff",
    },
    name: { fontSize: 18, fontWeight: "bold", color: "#fff" },
    username: { fontSize: 12, color: "#ffe7d6", marginTop: 2 },
    statsContainer: {
        flexDirection: "row",
        gap: 24,
        marginTop: 14,
    },
    stat: { alignItems: "center" },
    statNumber: { color: "#fff", fontWeight: "bold", fontSize: 16 },
    statLabel: { color: "#ffe7d6", fontSize: 12 },
    menuItem: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        paddingVertical: 14,
        paddingHorizontal: 14,
        borderRadius: 14,
        marginBottom: 10,
        shadowColor: "#000",
        shadowOpacity: 0.06,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 3 },
        elevation: 2,
    },
    iconContainer: {
        width: 32,
        height: 32,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
        marginRight: 12,
    },
    menuText: { flex: 1, fontSize: 15, color: "#222", fontWeight: "500" },
});
