import React, { useState, useEffect } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { db, auth } from "../../config/firebase";
import { collection, query, onSnapshot, orderBy } from "firebase/firestore";
import CreateTaskModal from "../../components/modals/CreateTaskModal";
import AddButton from "../../components/AddButton";
import TaskItem from "../../components/TaskItem";

export default function TaskScreen({ projectId }) {
  const [tasks, setTasks] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    const q = query(
      collection(db, "projects", projectId, "tasks"),
      orderBy("createdAt", "desc")
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const tasksData = [];
      querySnapshot.forEach((doc) => {
        tasksData.push({ id: doc.id, ...doc.data() });
      });
      setTasks(tasksData);
    });
    return unsubscribe;
  }, [projectId]);

  return (
    <View style={styles.container}>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.taskContainer}>
            <TaskItem task={item} />
          </View>
        )}
      />
      <CreateTaskModal
        projectId={projectId}
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
      />
      <AddButton onPress={() => setIsModalVisible(true)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    position: "relative",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  taskContainer: {
    padding: 10,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginBottom: 10,
  },
});
