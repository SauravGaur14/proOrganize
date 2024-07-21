import { db } from "../../config/firebase";
import { collection, query, onSnapshot, orderBy } from "firebase/firestore";

import React, { useState, useEffect } from "react";
import { View, FlatList, StyleSheet, Text } from "react-native";

import { Colors } from "../../constants";

import NoteItem from "../../components/NoteItem";
import AddButton from "../../components/AddButton";
import CreateNoteModal from "../../components/modals/CreateNoteModal";

const NotesScreen = ({ projectId }) => {
  const [notes, setNotes] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    const q = query(
      collection(db, "projects", projectId, "notes"),
      orderBy("createdAt", "desc")
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const notesData = [];
      querySnapshot.forEach((doc) => {
        notesData.push({ id: doc.id, ...doc.data() });
      });
      setNotes(notesData);
    });
    return unsubscribe;
  }, [projectId]);

  return (
    <View style={styles.container}>
      {!notes.length ? (
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
            Start by adding a Note
          </Text>
        </View>
      ) : (
        <FlatList
          data={notes}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.noteContainer}>
              <NoteItem note={item} />
            </View>
          )}
        />
      )}
      <AddButton onPress={() => setIsModalVisible(true)} />
      <CreateNoteModal
        projectId={projectId}
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    position: "relative",
  },
  noteContainer: {
    marginBottom: 20,
    borderRadius: 15,
    overflow: "hidden",
  },
});

export default NotesScreen;
