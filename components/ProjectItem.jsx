import { StyleSheet, Text, View } from "react-native";
import { Colors } from "../constants";

export default function ProjectItem({
  customStyles,
  name,
  duration,
  description,
}) {
  return (
    <View style={[styles.container, customStyles]}>
      <View>
        <Text style={styles.title}>{name}</Text>
      </View>
      <View>
        <Text style={styles.duration}>{duration}</Text>
      </View>
      <View>
        <Text style={styles.description}>{description}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    borderRadius: 10,
    gap: 10,
  },
  title: {
    fontSize: 30,
    color: Colors.blackPrimary,
  },
  duration: {
    fontSize: 20,
    color: Colors.blackSecondary,
  },
  description: {
    fontSize: 15,
    color: Colors.blackTertiary,
  },
});
