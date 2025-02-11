import React, { useContext, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  Button,
  Switch,
  StyleSheet,
  Alert,
  Keyboard,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { LibraryContext } from "../Controllers/LibraryContext";
import { LibraryContextType } from "../types";

const NewBookView: React.FC = () => {
  const { addBookToLibrary } = useContext(LibraryContext) as LibraryContextType;

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [gender, setGender] = useState("Male");
  const [displayed, setDisplayed] = useState(false);

  const [open, setOpen] = useState(false);

  const [items, setItems] = useState([
    { label: "Male", value: "Male" },
    { label: "Female", value: "Female" },
    { label: "Other", value: "Other" },
  ]);

  const handleAddBook = () => {
    Keyboard.dismiss();
    if (title && author) {
      addBookToLibrary(title, author, gender, displayed);
      setTitle("");
      setAuthor("");
      setGender("Male");
      setDisplayed(false);
      Alert.alert("Success", "Book added to the library!");
    } else {
      Alert.alert("Error", "Please provide both title and author.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>New Book</Text>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Title"
          value={title}
          onChangeText={setTitle}
        />

        <TextInput
          style={styles.input}
          placeholder="Author"
          value={author}
          onChangeText={setAuthor}
        />

        <View style={styles.pickerContainer}>
          <Text style={styles.pickerText}>Author Gender:</Text>
          <DropDownPicker
            open={open}
            value={gender}
            items={items}
            setOpen={setOpen}
            setValue={setGender}
            setItems={setItems}
            containerStyle={styles.picker}
          />
        </View>

        <View style={styles.switchContainer}>
          <Text style={styles.switchLabel}>Display book in library</Text>
          <Switch value={displayed} onValueChange={setDisplayed} />
        </View>

        <View style={styles.buttonContainer}>
          <Button
            title="Add Book"
            onPress={handleAddBook}
            disabled={!title || !author}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f8f8f8",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 20,
    marginBottom: 20,
  },
  form: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 2 },
    marginLeft: 20,
    marginRight: 20,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingVertical: 8,
    paddingHorizontal: 10,
    fontSize: 16,
    marginBottom: 15,
  },
  pickerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    zIndex: 1,
  },
  pickerText: {
    fontSize: 16,
    color: "#333",
  },
  picker: {
    width: 100,
    height: 40,
    marginBottom: 10,
  },
  switchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: 0,
  },
  switchLabel: {
    fontSize: 16,
    color: "#333",
  },
  buttonContainer: {
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    paddingHorizontal: 10,
    marginTop: 40,
  },
});

export default NewBookView;
