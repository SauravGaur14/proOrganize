import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  StyleSheet,
  Pressable,
  TextInput,
} from "react-native";
import { Colors } from "../../constants";
import { AntDesign } from "@expo/vector-icons";
import { db } from "../../config/firebase";
import { collection, addDoc } from "firebase/firestore";

export default function CreateNoteModal({ isVisible, onClose, projectId }) {
  const [noteText, setNoteText] = useState("");
  const [noteTitle, setNoteTitle] = useState("");

  const addNoteHandler = async () => {
    if (noteText.trim().length === 0) return;
    try {
      await addDoc(collection(db, "projects", projectId, "notes"), {
        title: noteTitle,
        note: noteText,
        createdAt: new Date().toLocaleDateString(),
      });
      setNoteText("");
      setNoteTitle("");
      onClose();
      alert("Note created succesfully");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal animationType="slide" transparent={true} visible={isVisible}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Create New Note</Text>
          <TextInput
            style={styles.input}
            placeholder="Title"
            onChangeText={setNoteTitle}
            value={noteTitle}
          />
          <TextInput
            style={styles.input}
            placeholder="Note"
            onChangeText={setNoteText}
            value={noteText}
          />

          <Pressable style={styles.closeButton} onPress={onClose}>
            <AntDesign name="close" size={20} color="black" />
          </Pressable>
          <View style={styles.buttonContainer}>
            <Pressable onPress={addNoteHandler} style={styles.button}>
              <Text style={styles.buttonPrimary}>Create Note</Text>
            </Pressable>
            <View style={{ borderColor: "red", borderWidth: 1 }}>
              <Pressable onPress={onClose} style={styles.button}>
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
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    elevation: 10,
    shadowOffset: { height: 3, width: 3 },
    shadowColor: Colors.blackTertiary,
    shadowOpacity: 0.5,
    shadowRadius: 10,
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
  closeButton: {
    padding: 5,
    borderRadius: 100,
    overflow: "hidden",
    position: "absolute",
    top: 10,
    right: 10,
    borderWidth: 1,
    borderColor: Colors.blackTertiary,
  },
  buttonText: {
    color: "#fff",
  },
  durationContainer: {
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
  },
  button: {
    width: 130,
    overflow: "hidden",
    borderRadius: 10,
  },
  buttonPrimary: {
    fontSize: 25,
    color: "#fff",
    backgroundColor: "green",
    paddingVertical: 10,
    paddingHorizontal: 25,
    textAlign: "center",
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
