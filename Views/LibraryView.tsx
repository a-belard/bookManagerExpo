import React, { useContext } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../types";
import { LibraryContext } from "../Controllers/LibraryContext";
import { SwipeListView } from "react-native-swipe-list-view";
import { LibraryContextType } from "../types";

const LibraryView: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { books, setBooks } = useContext(LibraryContext) as LibraryContextType;

  const displayedBooks = books.filter((book) => book.displayed);

  const deleteBook = (rowMap: { [key: string]: any }, rowKey: string) => {
    closeRow(rowMap, rowKey);
    const updatedBooks = books.filter((item) => item.id !== rowKey);
    setBooks(updatedBooks);
  };

  const closeRow = (rowMap: { [key: string]: any }, rowKey: string) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Library</Text>
      <SwipeListView
        data={displayedBooks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.rowWrapper}>
            <Pressable
              style={({ pressed }) => [
                styles.bookRow,
                pressed ? styles.pressedBookRow : null,
              ]}
              onPress={() => navigation.navigate("BookDetails", { book: item })}
            >
              <Text style={styles.bookTitle}>{item.title}</Text>
              <Icon name="chevron-forward" size={20} color="gray" />
            </Pressable>
          </View>
        )}
        renderHiddenItem={(data, rowMap) => (
          <View style={styles.rowBack}>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => deleteBook(rowMap, data.item.id)}
            >
              <Text style={styles.deleteButtonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
        leftOpenValue={0}
        rightOpenValue={-75}
        disableRightSwipe
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  header: {
    fontSize: 32,
    fontWeight: "bold",
    marginLeft: 20,
    marginBottom: 20,
  },
  rowWrapper: {
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 5,
    overflow: "hidden",
  },
  bookRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: "white",
  },
  pressedBookRow: {
    backgroundColor: "#f8f8f8",
  },
  bookTitle: {
    fontWeight: "bold",
    fontSize: 18,
  },
  rowBack: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "#ff3b30",
    flex: 1,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 6,
  },
  deleteButton: {
    width: 75,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "red",
    height: "100%",
    borderRadius: 5,
  },
  deleteButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default LibraryView;
