import { StyleSheet, Text, View } from "react-native";
import { Colors } from "../constants";

export default function NoteItem({ note }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{note.title}</Text>
      <View style={styles.itemContainer}>
        <View style={styles.labelContainer}>
          <Text style={styles.text}>Created At</Text>
        </View>
        <View style={styles.valueContainer}>
          <Text style={styles.text}>{note.createdAt}</Text>
        </View>
      </View>
      <Text style={styles.text}>{note.note}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    rowGap: 10,
    padding: 20,
    backgroundColor: Colors.cardBackground,
  },
  itemContainer: {
    columnGap: 25,
    flexDirection: "row",
    alignItems: "center",
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
    lineHeight: 25,
    color: Colors.textTertiary,
  },
});
