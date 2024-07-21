import { auth, db } from "../config/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  where,
} from "firebase/firestore";

import React, { useEffect, useState } from "react";
import { View, FlatList, StyleSheet, Text, Pressable } from "react-native";

import { Colors } from "../constants";
import { LinearGradient } from "expo-linear-gradient";

import AddButton from "../components/AddButton";
import ProjectItem from "../components/ProjectItem";
import CreateProjectModal from "../components/modals/CreateProjectModal";

const HomeScreen = ({ navigation }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [projects, setProjects] = useState([]);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserName(user.displayName);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const user = auth.currentUser;
    const q = query(
      collection(db, "projects"),
      where("userId", "==", user.uid),
      orderBy("createdAt", "desc")
    );
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
      <LinearGradient
        colors={["#693380", "#491A95"]}
        start={[(x = 0.5), (y = 0)]}
        style={styles.textContainer}
      >
        <View
          style={{
            gap: 5,
            marginBottom: 5,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text style={styles.welcomeText}>Welcome </Text>
          <Text style={styles.welcomeText}>{userName}!</Text>
        </View>
        <Text style={[styles.welcomeText, { fontSize: 18 }]}>
          {new Date(Date.now()).toDateString()}
        </Text>
      </LinearGradient>
      {!projects.length ? (
        <View
          style={{
            flex: 1,
            padding: 25,
            marginTop: 20,
            borderRadius: 20,
            backgroundColor: Colors.cardBackground,
          }}
        >
          <Text
            style={{
              color: Colors.textSecondary,
              textAlign: "center",
              fontSize: 24,
            }}
          >
            Start by adding a project
          </Text>
        </View>
      ) : (
        <FlatList
          style={{ margin: 20 }}
          data={projects}
          keyExtractor={(project) => project.id}
          renderItem={({ item }) => (
            <View style={styles.projectContainer}>
              <Pressable
                onPress={() =>
                  navigation.navigate("ProjectInfo", { projectId: item.id })
                }
              >
                <ProjectItem
                  name={item.name}
                  startDate={item.startDate}
                  endDate={item.endDate}
                  description={item.description}
                  customStyles={styles.projectContainer}
                />
              </Pressable>
            </View>
          )}
        />
      )}
      <AddButton onPress={() => setIsModalVisible(true)} />
      <CreateProjectModal
        isVisible={isModalVisible}
        onClose={() => {
          setIsModalVisible(false);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    padding: 10,
    position: "relative",
  },
  textContainer: {
    padding: 20,
    width: "100%",
    borderWidth: 1,
    marginBottom: 20,
    borderRadius: 15,
    overflow: "hidden",
  },
  welcomeText: {
    fontSize: 22,
    fontWeight: "bold",
    color: Colors.textTertiary,
  },
  projectContainer: {
    padding: 12,
    borderRadius: 15,
    marginBottom: 20,
    overflow: "hidden",
    backgroundColor: Colors.cardBackground,
  },
  shadow: {
    elevation: 5,
    shadowColor: "#fff",
    shadowOpacity: 1,
    shadowRadius: 10,
    marginBottom: 30,
    shadowOffset: { width: 5, height: 5 },
  },
});

export default HomeScreen;
