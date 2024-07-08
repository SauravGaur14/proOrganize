import { StyleSheet, Text, View } from "react-native";

export default function NoteItem({ note }) {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text>{note.title}</Text>
        <Text>{note.createdAt}</Text>
        <Text>{note.deadline}</Text>
      </View>
      <Text>{note.note}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderColor: "#000",
    borderRadius: 20,
    overflow: "hidden",
    borderWidth: 1,
    backgroundColor: "pink",
    marginBottom: 10,
    padding: 15,
    paddingLeft: 25,
    rowGap: 10,
  },
  title: {
    fontSize: 25,
  },
  row: {
    flexDirection: "row",
    columnGap: 15,
  },
  description: {},
});
