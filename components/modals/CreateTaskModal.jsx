import React, { useRef, useState } from "react";
import {
  View,
  Text,
  Modal,
  StyleSheet,
  Pressable,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Colors } from "../../constants";
import { Ionicons } from "@expo/vector-icons";
import { db } from "../../config/firebase";
import { collection, addDoc } from "firebase/firestore";
import * as Notifications from "expo-notifications";
import DatePicker from "../DatePicker";

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
      const taskRef = await addDoc(
        collection(db, "projects", projectId, "tasks"),
        {
          title: taskTitle,
          task: task,
          createdAt: new Date().toDateString(),
          deadline: new Date(deadline).toDateString(),
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
      resetForm();
      alert("Task created successfully");
    } catch (error) {
      alert("Failed to create task");
      console.log(error);
    }
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
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Create New Task</Text>
          <TextInput
            style={styles.input}
            ref={titleInputRef}
            placeholder="Title"
            onChangeText={setTaskTitle}
            value={taskTitle}
            onFocus={() => {
              if (!showDatePicker || !showReminderDatePicker) {
                setShowDatePicker(false);
                setShowReminderDatePicker(false);
              }
            }}
          />
          <TextInput
            style={styles.input}
            ref={taskInputRef}
            placeholder="Task"
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
            style={styles.buttonContainer}
            onPress={() => {
              setShowReminderDatePicker(false);
              setShowDatePicker(true);
              titleInputRef.current?.blur();
              taskInputRef.current?.blur();
            }}
          >
            <Ionicons name="calendar" size={25} color="black" />
            <Text style={styles.input}>
              {deadline ? deadline.toLocaleString() : "Deadline"}
            </Text>
          </Pressable>

          {showDatePicker && (
            <DatePicker date={deadline} onChange={deadlineChangeHandler} />
          )}

          <Pressable
            style={styles.buttonContainer}
            onPress={() => {
              setShowDatePicker(false);
              setShowReminderDatePicker(true);
              titleInputRef.current?.blur();
              taskInputRef.current?.blur();
            }}
          >
            <Ionicons name="calendar" size={25} color="black" />
            <Text style={styles.input}>
              {reminderDate ? reminderDate.toLocaleString() : "Remind At"}
            </Text>
          </Pressable>

          {showReminderDatePicker && (
            <DatePicker date={reminderDate} onChange={reminderChangeHandler} />
          )}

          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={addTaskHandler} style={styles.button}>
              <Text style={styles.buttonPrimary}>Create Task</Text>
            </TouchableOpacity>
            <View style={{ borderColor: "red", borderWidth: 1 }}>
              <TouchableOpacity onPress={resetForm} style={styles.button}>
                <Text style={styles.buttonSecondary}>Cancel</Text>
              </TouchableOpacity>
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
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 30,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    // width: "100%",
    marginTop: 20,
    gap: 5,
  },
  button: {
    flex: 1,
    alignItems: "center",
    padding: 10,
    borderRadius: 5,
  },
  buttonPrimary: {
    color: "black",
    backgroundColor: Colors.primary,
  },
  buttonSecondary: {
    color: Colors.primary,
  },
});
