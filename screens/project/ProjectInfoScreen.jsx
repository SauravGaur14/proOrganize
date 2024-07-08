import React, { useState, useEffect } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import TaskScreen from "./TaskScreen";
import FilesScreen from "./FilesScreen";
import NotesScreen from "./NotesScreen";
import KanbanBoardScreen from "./KanbanBoardScreen";
import ProjectItem from "../../components/ProjectItem";

const Tab = createMaterialTopTabNavigator();

const ProjectInfoScreen = ({ route }) => {
  const { projectId } = route.params;
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const projectRef = doc(db, "projects", projectId);
        const projectDoc = await getDoc(projectRef);
        if (projectDoc.exists()) {
          setProject(projectDoc.data());
        }
      } catch (error) {
        alert("Error fetching project");
        console.error("Error fetching project:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [projectId]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (!project) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Project not found.</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={{ padding: 20 }}>
        <ProjectItem
          name={project.name}
          duration={project.startDate + " - " + project.endDate}
          description={project.description}
        />
      </View>
      <Tab.Navigator>
        <Tab.Screen name="Tasks">
          {() => <TaskScreen projectId={projectId} />}
        </Tab.Screen>
        <Tab.Screen name="Files" component={FilesScreen} />
        <Tab.Screen name="Notes">
          {() => <NotesScreen projectId={projectId} />}
        </Tab.Screen>
        <Tab.Screen name="Kanban" component={KanbanBoardScreen} />
      </Tab.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontSize: 18,
    color: "red",
  },
});

export default ProjectInfoScreen;
