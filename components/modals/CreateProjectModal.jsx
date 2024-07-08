import React, { useRef, useState } from "react";
import {
  View,
  Text,
  Modal,
  StyleSheet,
  Pressable,
  TextInput,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import DatePicker from "../DatePicker";

import { Colors } from "../../constants";
import { db } from "../../config/firebase";
import { collection, addDoc } from "firebase/firestore";

export default function CreateProjectModal({ isVisible, onClose }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);

  const nameInputRef = useRef();
  const descriptionInputRef = useRef();

  function resetForm() {
    setName("");
    setDescription("");
    setStartDate(null);
    setEndDate(null);
    setShowStartDatePicker(false);
    setShowEndDatePicker(false);
    onClose();
  }

  function startDateChangeHandler({ date }) {
    const newDate = new Date(date);
    setStartDate(newDate);
  }

  function endDateChangeHandler({ date }) {
    const newDate = new Date(date);
    setEndDate(newDate);
  }

  async function handleAddProject() {
    if (!name || !description || !startDate || !endDate) {
      Alert.alert("Error", "Please fill out all fields");
      return;
    }

    const newProject = {
      name,
      description,
      startDate: new Date(startDate).toDateString(),
      endDate: new Date(endDate).toDateString(),
      createdAt: new Date(),
    };

    try {
      await addDoc(collection(db, "projects"), newProject);
      resetForm();
    } catch (error) {
      alert("Error", "Could not add project");
      console.error("Error adding project: ", error);
    }
  }

  return (
    <Modal animationType="slide" transparent={true} visible={isVisible}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Create New Project</Text>
          <TextInput
            ref={nameInputRef}
            style={styles.input}
            placeholder="Project Name"
            onChangeText={setName}
            value={name}
            onFocus={() => {
              setShowStartDatePicker(false);
              setShowEndDatePicker(false);
            }}
          />
          <TextInput
            ref={descriptionInputRef}
            style={styles.input}
            placeholder="Description"
            onChangeText={setDescription}
            value={description}
            onFocus={() => {
              setShowStartDatePicker(false);
              setShowEndDatePicker(false);
            }}
          />

          <Pressable
            style={styles.buttonContainer}
            onPress={() => {
              setShowStartDatePicker(true);
              setShowEndDatePicker(false);
              nameInputRef.current?.blur();
              descriptionInputRef.current?.blur();
            }}
          >
            <Ionicons name="calendar" size={25} color="black" />
            <Text style={styles.input}>
              {startDate ? startDate.toLocaleString() : "Start Date"}
            </Text>
          </Pressable>

          {showStartDatePicker && (
            <DatePicker date={startDate} onChange={startDateChangeHandler} />
          )}

          <Pressable
            style={styles.buttonContainer}
            onPress={() => {
              setShowStartDatePicker(false);
              setShowEndDatePicker(true);
              nameInputRef.current?.blur();
              descriptionInputRef.current?.blur();
            }}
          >
            <Ionicons name="calendar" size={25} color="black" />
            <Text style={styles.input}>
              {endDate ? endDate.toLocaleString() : "Deadline"}
            </Text>
          </Pressable>

          {showEndDatePicker && (
            <DatePicker date={endDate} onChange={endDateChangeHandler} />
          )}

          <View style={styles.buttonContainer}>
            <Pressable onPress={handleAddProject} style={styles.button}>
              <Text style={styles.buttonPrimary}>Add</Text>
            </Pressable>
            <View style={{ borderColor: "red", borderWidth: 1 }}>
              <Pressable onPress={resetForm} style={styles.button}>
                <Text style={styles.buttonSecondary}>Cancel</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    position: "relative",
  },
  modalContainer: {
    width: "90%",
    // height: "80%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    elevation: 10,
    shadowOffset: { height: 3, width: 3 },
    shadowColor: Colors.blackTertiary,
    shadowOpacity: 0.5,
    shadowRadius: 10,
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 20,
  },
  input: {
    width: "100%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff",
  },
  durationContainer: {
    // flexDirection: "row",
    // columnGap:10
    marginVertical: 20,
    borderWidth: 0.4,
    borderColor: Colors.blackTertiary,
    borderRadius: 10,
    width: "100%",
    padding: 20,
  },
  buttonContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginVertical: 10,
    padding: 10,
    borderColor: "black",
    borderWidth: 1,
  },
  button: {
    overflow: "hidden",
    borderRadius: 10,
    width: 130,
    // elevation: 10,
    // borderColor: "black",
  },
  buttonPrimary: {
    fontSize: 25,
    color: "#fff",
    backgroundColor: "green",
    paddingVertical: 10,
    paddingHorizontal: 25,
    textAlign: "center",
    borderColor: "black",
    borderWidth: 1,
  },
  buttonSecondary: {
    fontSize: 25,
    color: "#010",
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 25,
    textAlign: "center",
  },
});
