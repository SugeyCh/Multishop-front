import React from "react";
import { View, Modal, ActivityIndicator, StyleSheet } from "react-native";

const RuedaCarga = () => {
  return (
    <Modal transparent={true} visible={true}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <ActivityIndicator size="large" color="#02A0CA" />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  },
  modalContent: {
    backgroundColor: "white", // Fondo blanco
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
});

export default RuedaCarga;
