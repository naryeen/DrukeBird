import React, { useState, useContext, useEffect } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Modal, FlatList } from "react-native";
import { Avatar, ActivityIndicator, MD2Colors } from "react-native-paper"
import { AuthContext } from "../Context/AuthContext";
import axios from "axios";

const NotificationScreen = () => {
  const { userInfo } = useContext(AuthContext);
  const userId = userInfo.user._id;
  const [notifications, setNotifications] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [loading, setLoading] = useState(true);

  const openModal = (item) => {
    setSelectedNotification(item);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  useEffect(() => {
    axios
      .get(`https://drukebird.onrender.com/api/v1/notifications/${userId}`)
      .then((res) => {
        setNotifications(res.data.data);
        console.log(res.data.data);
      })
      .catch((error) => {
        console.error("Error fetching notifications:", error);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <View>
        <ActivityIndicator style={{marginTop:250}} animating={true} color={MD2Colors.green800} size="large" />
      </View>
    );
  }

  const renderItem = ({ item }) => (
    <View style={styles.content}>
      <TouchableOpacity onPress={() => openModal(item)}>
        <Avatar.Image source={{ uri: item.avatar }} style={styles.image} />
        <Text style={styles.text}>{item.message}</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={notifications}
        renderItem={renderItem}
        keyExtractor={(item) => item._id.toString()}
      />

      <Modal
        animationType="slide"
        transparent
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {selectedNotification && (
              <Text>Bird name is {selectedNotification.BirdName}</Text>
            )}
            <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    marginTop: 5,
    height: 80,
    width: "100%",
    borderRadius: 1,
    elevation: 1,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  image: {
    marginTop: 6,
    marginLeft: 6,
  },
  text: {
    marginTop: -50,
    marginLeft: 80,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
  },
  closeButton: {
    marginTop: 10,
    alignItems: "center",
  },
  closeButtonText: {
    color: "blue",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default NotificationScreen;
