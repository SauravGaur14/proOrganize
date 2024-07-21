import { Colors } from "../constants";
import { StyleSheet, Text, View } from "react-native";

export default function ProjectItem({
  name,
  endDate,
  startDate,
  description,
  customStyles,
}) {
  return (
    <View style={[styles.container, customStyles]}>
      <Text style={styles.title}>{name}</Text>
      <Text style={styles.duration}>{`${startDate} to ${endDate}`}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 15,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: Colors.textPrimary,
  },
  durationContainer: {
    gap: 15,
    flexDirection: "row",
  },
  duration: {
    fontSize: 17,
    fontWeight: "600",
    color: Colors.textSecondary,
  },
  description: {
    fontSize: 17,
    fontWeight: "500",
    color: Colors.textSecondary,
  },
});
