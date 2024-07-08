import React, { useState, useEffect } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { db } from "../../config/firebase";
import {
  collection,
  query,
  onSnapshot,
  orderBy,
} from "firebase/firestore";
import NoteItem from "../../components/NoteItem";
import AddButton from "../../components/AddButton";
import CreateNoteModal from "../../components/modals/CreateNoteModal";

const NotesScreen = ({ projectId }) => {
  const [notes, setNotes] = useState([]);
  const [noteText, setNoteText] = useState("");
  const [noteTitle, setNoteTitle] = useState("");
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
      <FlatList
        data={notes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.noteContainer}>
            <NoteItem note={item} />
          </View>
        )}
      />
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
    padding: 20,
    position: "relative",
    flex: 1,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  noteContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginVertical: 15,
  },
  addButton: {
    position: "absolute",
    padding: 5,
    bottom: 50,
    right: 30,
    borderRadius: 20,
    borderWidth: 0,
    backgroundColor: "#0A0A0A",
    overflow: "hidden",
    elevation: 10,
  },
});

export default NotesScreen;
