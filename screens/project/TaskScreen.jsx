import { db, auth } from "../../config/firebase";
import { collection, query, onSnapshot, orderBy } from "firebase/firestore";

import React, { useState, useEffect } from "react";
import { View, FlatList, StyleSheet, Text } from "react-native";

import CreateTaskModal from "../../components/modals/CreateTaskModal";
import AddButton from "../../components/AddButton";
import TaskItem from "../../components/TaskItem";
import { Colors } from "../../constants";

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
      {!tasks.length ? (
        <View
          style={{
            flex: 1,
            padding: 25,
            marginTop: 20,
            borderRadius: 20,
            backgroundColor: Colors.cardBackground,
          }}
        >
          <Text
            style={{
              color: Colors.textSecondary,
              textAlign: "center",
              fontSize: 24,
            }}
          >
            Start by adding a Task
          </Text>
        </View>
      ) : (
        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.taskContainer}>
              <TaskItem task={item} />
            </View>
          )}
        />
      )}
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
  taskContainer: {
    marginBottom: 20,
    borderRadius: 15,
    overflow: "hidden",
  },
});
