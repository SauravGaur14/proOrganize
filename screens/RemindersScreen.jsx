import { View, FlatList, StyleSheet } from "react-native";
import { auth, db } from "../config/firebase";
import {
  collectionGroup,
  onSnapshot,
  query,
  orderBy,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import TaskItem from "../components/TaskItem";

const RemindersScreen = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const user = auth.currentUser;
    const q = query(
      collectionGroup(db, "tasks"),
      where("uid", "==", user.uid),
      orderBy("deadline", "asc")
    );

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
    marginBottom: 15,
    borderRadius: 15,
    overflow: "hidden",
  },
});

export default RemindersScreen;
