import { FontAwesome, Ionicons, MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from '@react-navigation/native';



export default function Index() {
  const [selectedCard, setSelectedCard] = useState<"visa" | "mastercard">("visa");

  const navigation = useNavigation();

  const completeButton = () => {
    Alert.alert("Purchase Successful", "Your order has been placed!", [{ text: "OK" }]);
    navigation.navigate('mainpage'); 
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate("mainpage")}>
           <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Confirm Bill</Text>
      </View>

      {/* Delivery Address */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Delivery Address</Text>
          <Text style={styles.changeText}>Change</Text>
        </View>
        <View style={styles.addressDetails}>
          <View style={styles.row}>
            <Ionicons name="location-sharp" size={20} color="#FF6B00" />
            <Text style={styles.infoText}>680 Mowe Court, New York, US</Text>
          </View>
          <View style={styles.row}>
            <Ionicons name="person" size={20} color="#FF6B00" />
            <Text style={styles.infoText}>Sophia Benson</Text>
          </View>
          <View style={styles.row}>
            <Ionicons name="call" size={20} color="#FF6B00" />
            <Text style={styles.infoText}>+1(368)68 000 068</Text>
          </View>
        </View>
      </View>

      {/* Order Bill */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Order Bill</Text>
        <View style={styles.billRow}>
          <Text>Product</Text>
          <Text>3 items</Text>
        </View>
        <View style={styles.billRow}>
          <Text>Price</Text>
          <Text>$72.00</Text>
        </View>
        <View style={styles.billRow}>
          <Text>Shipping Fee</Text>
          <Text>$12.00</Text>
        </View>
        <View style={styles.billRow}>
          <Text>Have a promo code?</Text>
          <Text style={{ color: "#FF6B00" }}>- $10.00</Text>
        </View>
        <View style={styles.billRow}>
          <Text style={styles.totalText}>Total Bill</Text>
          <Text style={styles.totalText}>$74.00</Text>
        </View>
      </View>

      {/* Payment Method */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Payment Method</Text>
          <Text style={styles.addNewText}>Add new</Text>
        </View>

        {/* Card 1 - VISA */}
        <TouchableOpacity
          style={styles.cardRow}
          onPress={() => setSelectedCard("visa")}
        >
          <FontAwesome name="cc-visa" size={32} color="#1A1F71" />
          <Text style={styles.cardText}>•••• •••• •••• 4321 </Text>
          <MaterialIcons
            name={selectedCard === "visa" ? "radio-button-checked" : "radio-button-unchecked"}
            size={20}
            color={selectedCard === "visa" ? "#FF6B00" : "#ccc"}
            style={{ marginLeft: "auto" }}
          />
        </TouchableOpacity>

        {/* Card 2 - MASTERCARD */}
        <TouchableOpacity
          style={styles.cardRow}
          onPress={() => setSelectedCard("mastercard")}
        >
          <FontAwesome name="cc-mastercard" size={32} color="#EB001B" />
          <Text style={styles.cardText}>•••• •••• •••• 1234</Text>
          <MaterialIcons
            name={selectedCard === "mastercard" ? "radio-button-checked" : "radio-button-unchecked"}
            size={20}
            color={selectedCard === "mastercard" ? "#FF6B00" : "#ccc"}
            style={{ marginLeft: "auto" }}
          />
        </TouchableOpacity>
      </View>

      {/* Complete Button */}
      <TouchableOpacity style={styles.button} onPress={completeButton}>
        <Text style={styles.buttonText}>Complete</Text>
      </TouchableOpacity>
    </ScrollView>
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
  section: {
    marginBottom: 25,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  changeText: {
    color: "#FF6B00",
  },
  addNewText: {
    color: "#FF6B00",
    fontSize: 14,
  },
  addressDetails: {
    paddingLeft: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 4,
  },
  infoText: {
    marginLeft: 10,
    fontSize: 14,
  },
  billRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 6,
  },
  totalText: {
    fontWeight: "bold",
    fontSize: 16,
  },
  cardRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
  },
  cardText: {
    marginLeft: 10,
    fontSize: 14,
  },
  button: {
    backgroundColor: "#FF6B00",
    paddingVertical: 15,
    alignItems: "center",
    borderRadius: 10,
    marginBottom: 30,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
