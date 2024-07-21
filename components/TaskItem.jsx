import { StyleSheet, Text, View } from "react-native";
import { Colors } from "../constants";

export default function TaskItem({ task }) {
  return (
    <View style={styles.rootContainer}>
      <Text style={styles.title}>{task.title}</Text>
      <View style={styles.itemContainer}>
        <View style={styles.labelContainer}>
          <Text style={styles.label}>Created</Text>
          <Text style={styles.label}>Deadline</Text>
          <Text style={styles.label}>Task</Text>
        </View>
        <View style={styles.valueContainer}>
          <Text style={styles.text}>{task.createdAt}</Text>
          <Text style={styles.text}>{task.deadline}</Text>
          <Text style={styles.text}>{task.task}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    rowGap: 10,
    padding: 20,
    backgroundColor: Colors.cardBackground,
  },
  labelContainer: { gap: 10 },
  valueContainer: { gap: 10 },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.textSecondary,
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 10,
    color: Colors.textPrimary,
  },
  text: {
    fontSize: 16,
    color: Colors.textTertiary,
  },
  itemContainer: {
    columnGap: 25,
    flexDirection: "row",
    alignItems: "center",
  },
});
