import { db } from "../config/firebase";
import AddButton from "../components/AddButton";
import React, { useEffect, useState } from "react";
import ProjectItem from "../components/ProjectItem";
import CreateProjectModal from "../components/modals/CreateProjectModal";
import { View, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";

const HomeScreen = ({ navigation }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "projects"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const projectsData = [];
      querySnapshot.forEach((doc) => {
        projectsData.push({ ...doc.data(), id: doc.id });
      });
      setProjects(projectsData);
    });

    return () => unsubscribe();
  }, []);

  return (
    <View style={styles.rootContainer}>
      <FlatList
        style={{ padding: 5, paddingRight: 10 }}
        data={projects}
        keyExtractor={(project) => project.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.shadow, styles.projectContainer]}
            onPress={() =>
              navigation.navigate("ProjectInfo", { projectId: item.id })
            }
          >
            <ProjectItem
              name={item.name}
              duration={item.startDate + " to " + item.endDate}
              description={item.description}
              customStyles={styles.projectContainer}
            />
          </TouchableOpacity>
        )}
      />
      <AddButton onPress={() => setIsModalVisible(true)} />
      <CreateProjectModal
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    padding: 20,
    position: "relative",
  },
  projectContainer: {
    backgroundColor: "#a78bfa",
    borderRadius: 15,
    overflow: "hidden",
    borderColor: "#f6f6",
    borderWidth: 1,
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 10,
    marginBottom: 30,
  },
});

export default HomeScreen;
