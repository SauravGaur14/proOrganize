import React, { useRef, useState } from "react";
import { View, Text, Modal, Pressable, Alert } from "react-native";
import DatePicker from "../DatePicker";
import Input from "../TextInput";

import {
  ButtonContainer,
  ModalContainer,
  ModalOverlay,
  ModalTitle,
} from "../../constants";
import { auth, db } from "../../config/firebase";
import { collection, addDoc } from "firebase/firestore";
import { showToast } from "../../util/showToast";
import Button from "../Button";

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
    const user = auth.currentUser;
    const newProject = {
      name,
      description,
      startDate: new Date(startDate).toLocaleDateString(),
      endDate: new Date(endDate).toLocaleDateString(),
      createdAt: new Date(),
      userId: user.uid,
    };

    try {
      await addDoc(collection(db, "projects"), newProject);
      showToast("success", "Task Created Successfully");
    } catch (error) {
      showToast("error", "Failed to create task");
    } finally {
      resetForm();
    }
  }

  return (
    <Modal animationType="slide" transparent={true} visible={isVisible}>
      <View style={ModalOverlay}>
        <View style={ModalContainer}>
          <Text style={ModalTitle}>Create New Project</Text>
          <Input
            ref={nameInputRef}
            label="Project Name"
            onChangeText={setName}
            value={name}
            onFocus={() => {
              setShowStartDatePicker(false);
              setShowEndDatePicker(false);
            }}
          />
          <Input
            ref={descriptionInputRef}
            label="Description"
            onChangeText={setDescription}
            value={description}
            onFocus={() => {
              setShowStartDatePicker(false);
              setShowEndDatePicker(false);
            }}
          />

          <Pressable
            style={ButtonContainer}
            onPress={() => {
              setShowStartDatePicker(true);
              setShowEndDatePicker(false);
              nameInputRef.current?.blur();
              descriptionInputRef.current?.blur();
            }}
          >
            <View style={{ width: "100%" }} pointerEvents="none">
              <Input
                label="Start Date"
                editable={false}
                value={startDate ? startDate.toLocaleString() : ""}
              />
            </View>
          </Pressable>

          {showStartDatePicker && (
            <DatePicker date={startDate} onChange={startDateChangeHandler} />
          )}

          <Pressable
            style={ButtonContainer}
            onPress={() => {
              setShowStartDatePicker(false);
              setShowEndDatePicker(true);
              nameInputRef.current?.blur();
              descriptionInputRef.current?.blur();
            }}
          >
            <View style={{ width: "100%" }} pointerEvents="none">
              <Input
                label="End Date"
                editable={false}
                value={endDate ? endDate.toLocaleString() : ""}
              />
            </View>
          </Pressable>

          {showEndDatePicker && (
            <DatePicker date={endDate} onChange={endDateChangeHandler} />
          )}

          <View style={ButtonContainer}>
            <Button label="Add" type="primary" onPress={handleAddProject} />
            <Button label="Cancel" type="secondary" onPress={resetForm} />
          </View>
        </View>
      </View>
    </Modal>
  );
}
