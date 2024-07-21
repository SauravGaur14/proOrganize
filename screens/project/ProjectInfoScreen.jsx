import { db } from "../../config/firebase";
import { doc, getDoc } from "firebase/firestore";

import React, { useState, useEffect } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import TaskScreen from "./TaskScreen";
import NotesScreen from "./NotesScreen";
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
          startDate={project.startDate}
          endDate={project.endDate}
          description={project.description}
        />
      </View>
      <Tab.Navigator>
        <Tab.Screen name="Tasks">
          {() => <TaskScreen projectId={projectId} />}
        </Tab.Screen>
        <Tab.Screen name="Notes">
          {() => <NotesScreen projectId={projectId} />}
        </Tab.Screen>
      </Tab.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  projectInfoContainer: {
    gap: 15,
    padding: 25,
    minHeight: 220,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    color: "#fff",
  },
  errorText: {
    fontSize: 18,
    color: "red",
  },
});

export default ProjectInfoScreen;
