import React, { useRef, useState } from "react";
import {
  View,
  Text,
  Modal,
  Pressable,
} from "react-native";
import {
  ButtonContainer,
  ModalContainer,
  ModalOverlay,
  ModalTitle,
} from "../../constants";
import { auth, db } from "../../config/firebase";
import { collection, addDoc } from "firebase/firestore";
import * as Notifications from "expo-notifications";
import DatePicker from "../DatePicker";
import { showToast } from "../../util/showToast";
import Input from "../TextInput";
import Button from "../Button";

export default function CreateTaskModal({ isVisible, onClose, projectId }) {
  const [task, setTask] = useState("");
  const [taskTitle, setTaskTitle] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showReminderDatePicker, setShowReminderDatePicker] = useState(false);
  const [deadline, setDeadline] = useState(null);
  const [reminderDate, setReminderDate] = useState(null);

  const titleInputRef = useRef(null);
  const taskInputRef = useRef(null);

  const addTaskHandler = async () => {
    if (
      task.trim().length === 0 ||
      taskTitle.trim().length === 0 ||
      !deadline ||
      !reminderDate
    ) {
      alert("Fill all the fields");
      return;
    }
    try {
      const user = auth.currentUser;
      const taskRef = await addDoc(
        collection(db, "projects", projectId, "tasks"),
        {
          title: taskTitle,
          task: task,
          createdAt: new Date().toDateString(),
          deadline: new Date(deadline).toDateString(),
          uid: user.uid,
        }
      );

      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Task Reminder",
          body: `Deadline approaching for task: ${taskTitle}`,
          data: { projectId },
        },
        trigger: reminderDate,
      });
      showToast("success", "Task added successfully");
    } catch (error) {
      showToast("error", "Failed to create task");
    }
    resetForm();
  };

  function resetForm() {
    setTask("");
    setTaskTitle("");
    setDeadline("");
    setReminderDate("");

    setShowDatePicker(false);
    setShowReminderDatePicker(false);

    onClose();
  }

  function deadlineChangeHandler({ date }) {
    const newDate = new Date(date);
    setDeadline(newDate);
  }
  function reminderChangeHandler({ date }) {
    const newDate = new Date(date);
    setReminderDate(newDate);
  }

  return (
    <Modal animationType="slide" transparent={true} visible={isVisible}>
      <View style={ModalOverlay}>
        <View style={ModalContainer}>
          <Text style={ModalTitle}>Create New Task</Text>
          <Input
            ref={titleInputRef}
            label="Title"
            onChangeText={setTaskTitle}
            value={taskTitle}
            onFocus={() => {
              if (!showDatePicker || !showReminderDatePicker) {
                setShowDatePicker(false);
                setShowReminderDatePicker(false);
              }
            }}
          />
          <Input
            ref={taskInputRef}
            label="Task"
            onChangeText={setTask}
            value={task}
            onFocus={() => {
              if (!showDatePicker || !showReminderDatePicker) {
                setShowDatePicker(false);
                setShowReminderDatePicker(false);
              }
            }}
          />

          <Pressable
            style={ButtonContainer}
            onPress={() => {
              setShowReminderDatePicker(false);
              setShowDatePicker(true);
              titleInputRef.current?.blur();
              taskInputRef.current?.blur();
            }}
          >
            <View style={{ width: "100%" }} pointerEvents="none">
              <Input
                label="Deadline"
                editable={false}
                value={deadline ? deadline.toDateString() : ""}
              />
            </View>
          </Pressable>

          {showDatePicker && (
            <DatePicker date={deadline} onChange={deadlineChangeHandler} />
          )}

          <Pressable
            style={ButtonContainer}
            onPress={() => {
              setShowDatePicker(false);
              setShowReminderDatePicker(true);
              titleInputRef.current?.blur();
              taskInputRef.current?.blur();
            }}
          >
            <View style={{ width: "100%" }} pointerEvents="none">
              <Input
                label="Remind At"
                editable={false}
                value={reminderDate ? reminderDate.toDateString() : ""}
              />
            </View>
          </Pressable>

          {showReminderDatePicker && (
            <DatePicker date={reminderDate} onChange={reminderChangeHandler} />
          )}

          <View style={ButtonContainer}>
            <Button label="Add" type="primary" onPress={addTaskHandler} />
            <Button label="Cancel" type="secondary" onPress={resetForm} />
          </View>
        </View>
      </View>
    </Modal>
  );
}
