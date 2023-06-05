import React, { useState, useContext, useEffect } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Modal, FlatList, StatusBar } from "react-native";
import { Avatar, ActivityIndicator, MD2Colors } from "react-native-paper";
import { AuthContext } from "../Context/AuthContext";
import { Swipeable } from "react-native-gesture-handler";
import axios from "axios";
import UnknownVerificationHeader from "../Components/UnknownVerificationHeader";


const UnknownVerification = () => {
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
      .get(`https://druk-ebirds.onrender.com/api/v1/notifications/${userId}`)
      .then((res) => {
        const reversedNotifications = res.data.data.reverse();
        setNotifications(reversedNotifications);
        console.log(res.data.data);
      })
      .catch((error) => {
        console.error("Error fetching notifications:", error);
      })
      .finally(() => setLoading(false));
  }, []);

  const deleteNotification = (notificationId) => {
    // Send a request to delete the notification from the database
    axios
      .delete(`https://druk-ebirds.onrender.com/api/v1/notifications/${notificationId}`)
      .then(() => {
        // Remove the deleted notification from the state
        setNotifications((prevNotifications) =>
          prevNotifications.filter((notification) => notification._id !== notificationId)
        );
      })
      .catch((error) => {
        console.error("Error deleting notification:", error);
      });
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator animating={true} color={MD2Colors.green800} size="large" />
      </View>
    );
  }

  const renderItem = ({ item }) => (
    <Swipeable
      renderRightActions={() => (
        <TouchableOpacity style={styles.deleteButton} onPress={() => deleteNotification(item._id)}>
          <Text style={styles.deleteButtonText}>Delete</Text>
        </TouchableOpacity>
      )}
    >
      <TouchableOpacity style={styles.content} onPress={() => openModal(item)}>
        <View>
          <Avatar.Image source={{ uri: item.photoUrl }} style={styles.image} />
          <Text style={styles.text}>The Unknown Bird has been verified by the Admin</Text>
        </View>
      </TouchableOpacity>
    </Swipeable>
  );

  return (
    <View style={styles.container}>
      <UnknownVerificationHeader title={"Unknown Verification"}/>
      
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
              <Text>The name of your bird is {selectedNotification.BirdName}</Text>
            )}
            <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <StatusBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    marginTop: 5,
    height: 100,
    width: "100%",
    borderRadius: 1,
    elevation: 1,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  image: {
    marginTop: 18,
    marginLeft: 15,
  },
  text: {
    marginTop: -50,
    marginLeft: 90,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
  },
  closeButton: {
    marginTop: 20,
    alignItems: "center",
  },
  closeButtonText: {
    color: "blue",
  },
  deleteButton: {
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    marginTop:5,
    width: 80,
    height: "100%",
  },
  deleteButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default UnknownVerification;
