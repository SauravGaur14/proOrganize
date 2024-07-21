import React, { useState } from "react";
import { View, Text, Modal } from "react-native";
import {
  ButtonContainer,
  ModalContainer,
  ModalOverlay,
  ModalTitle,
} from "../../constants";
import { db } from "../../config/firebase";
import { collection, addDoc } from "firebase/firestore";
import { showToast } from "../../util/showToast";
import Input from "../TextInput";
import Button from "../Button";

export default function CreateNoteModal({ isVisible, onClose, projectId }) {
  const [noteText, setNoteText] = useState("");
  const [noteTitle, setNoteTitle] = useState("");

  const addNoteHandler = async () => {
    if (noteTitle.trim().length === 0) {
      alert("Note must have a title");
      return;
    }
    try {
      await addDoc(collection(db, "projects", projectId, "notes"), {
        title: noteTitle,
        note: noteText,
        createdAt: new Date().toLocaleDateString(),
      });

      showToast("success", "Note created succesfully");
    } catch (error) {
      showToast("error", "Failed to create note");
    } finally {
      resetForm();
    }
  };

  function resetForm() {
    setNoteText("");
    setNoteTitle("");
    onClose();
  }

  return (
    <Modal animationType="slide" transparent={true} visible={isVisible}>
      <View style={ModalOverlay}>
        <View style={ModalContainer}>
          <Text style={ModalTitle}>Create New Note</Text>
          <Input label="Title" onChangeText={setNoteTitle} value={noteTitle} />
          <Input label="Note" onChangeText={setNoteText} value={noteText} />

          <View style={ButtonContainer}>
            <Button label="Add" type="primary" onPress={addNoteHandler} />
            <Button label="Cancel" type="secondary" onPress={onClose} />
          </View>
        </View>
      </View>
    </Modal>
  );
}
