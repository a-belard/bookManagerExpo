import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BookDetailsScreenProps } from '../types';

const BookDetailsView: React.FC<BookDetailsScreenProps> = ({ route }) => {
  const { book } = route.params; 

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{book.title}</Text>
      <Text style={styles.author}>Author: {book.author} ({book.gender})</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',     
  },
  author: {
    fontSize: 20,
    marginBottom: 5,
    textAlign: 'center',
  }
});

export default BookDetailsView;
