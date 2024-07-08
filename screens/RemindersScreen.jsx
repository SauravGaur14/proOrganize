import { View, FlatList, StyleSheet } from "react-native";
import { db } from "../config/firebase";
import {
  collectionGroup,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import TaskItem from "../components/TaskItem";

const RemindersScreen = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const q = query(collectionGroup(db, "tasks"), orderBy("deadline", "asc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const updatedTasks = [];
      snapshot.forEach((doc) => {
        updatedTasks.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setTasks(updatedTasks);
    });

    // Clean up listener
    return () => unsubscribe();
  }, []);

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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  taskContainer: {
    padding: 10,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginBottom: 10,
  },
});

export default RemindersScreen;
