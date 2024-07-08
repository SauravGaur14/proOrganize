import { StyleSheet, Text, View } from "react-native";

export default function TaskItem({ task }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{task.title}</Text>
      <View style={styles.duration}>
        <Text>Created</Text>
        <Text>{task.createdAt}</Text>
      </View>
      <View style={styles.duration}>
        <Text>Deadline</Text>
        <Text>{task.deadline}</Text>
      </View>
      <Text>{task.task}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    backgroundColor: "#38bdf8",
    padding: 20,
    rowGap: 10,
    elevation: 10,
    marginBottom: 10,
    // borderColor: "#f6f6",
    // borderWidth: 2,
    // width:"90%",
    // overflow: "hidden",
    // borderColor: "#000",
    // borderWidth: 1,
    // marginHorizontal: 15,
  },
  title: {
    fontSize: 25,
  },
  duration: {
    flexDirection: "row",
    columnGap: 15,
    alignItems: "center",
  },
  description: {},
});
