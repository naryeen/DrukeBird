import React, { useState, useContext, useEffect } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Modal, FlatList, StatusBar } from "react-native";
import { Avatar, ActivityIndicator, MD2Colors } from "react-native-paper";
import { AuthContext } from "../Context/AuthContext";
import { Swipeable } from "react-native-gesture-handler";
import axios from "axios";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Toast from "react-native-root-toast";

import UnknownVerificationHeader from "../Components/UnknownVerificationHeader";


const UnknownVerification = () => {
  const { userInfo } = useContext(AuthContext);
  const userId = userInfo.user._id;
  const [notifications, setNotifications] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [loading, setLoading] = useState(true);
  const [pollingInterval, setPollingInterval] = useState(null);

  const openModal = (item) => {
    setSelectedNotification(item);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const fetchData = () => {
    axios
      .get(`https://chekilhamo.serv00.net/api/v1/notifications/${userId}`)
      .then((res) => {
        const reversedNotifications = res.data.data.reverse();
        setNotifications(reversedNotifications);
      })
      .catch((error) => {
        Toast.show(error, {
          duration: Toast.durations.SHORT,
        });
      })
      .finally(() => setLoading(false));
  };

  const deleteNotification = (notificationId) => {
    axios
      .delete(`https://chekilhamo.serv00.net/api/v1/notifications/${notificationId}`)
      .then(() => {
        setNotifications((prevNotifications) =>
          prevNotifications.filter((notification) => notification._id !== notificationId)
        );
      })
      .catch((error) => {
        Toast.show(error, {
          duration: Toast.durations.SHORT,
        });
      });
  };

  const startPolling = () => {
    const interval = setInterval(fetchData, 5000); // Fetch data every 5 seconds
    setPollingInterval(interval);
  };

  const stopPolling = () => {
    clearInterval(pollingInterval);
    setPollingInterval(null);
  };

  useEffect(() => {
    fetchData();
    startPolling();
    return () => {
      stopPolling();
    };
  }, []); // Empty dependency array ensures this effect runs only once

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

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator animating={true} color={MD2Colors.green800} size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <UnknownVerificationHeader title={"Unknown Verification"} />

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
    marginTop: hp('2%'),
    height: hp('12%'),
    width: wp('92%'),
    borderRadius: 1,
    alignSelf:"center",
    elevation: 1,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  image: {
    marginTop: hp('2%'),
    marginLeft: wp('3%'),
  },
  text: {
    marginTop: hp('-6%'),
    marginLeft: wp('25%'),
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: wp('6%'),
    borderRadius: 5,
  },
  closeButton: {
    marginTop: hp('3%'),
    alignItems: "center",
  },
  closeButtonText: {
    color: "blue",
  },
  deleteButton: {
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    marginTop: hp('2%'),
    width: wp('50%'),
    height: "100%",
  },
  deleteButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default UnknownVerification;
