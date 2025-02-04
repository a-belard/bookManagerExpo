import React, { createContext, useState, ReactNode } from 'react';
import { Library } from '../Models/Library';  
import { Book } from '../Models/Book'; 
import { LibraryContextType } from '../types';

const LibraryContext = createContext<LibraryContextType | undefined>(undefined);

const LibraryProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [books, setBooks] = useState(new Library().getBooks());

  const addBookToLibrary = (title: string, author: string, gender: string, displayed: boolean) => {
    const newBook = new Book(title, author, gender, displayed);
    setBooks((prevBooks) => [...prevBooks, newBook]); 
  };

  const getBooksFor = (author: string) => {
    return new Library().getBooksFor(author);
  };
  
  const getMaleAuthoredBooks = () => {
    return new Library().getMaleAuthoredBooks();
  };

  const getFemaleAuthoredBooks = () => {
    return new Library().getFemaleAuthoredBooks();
  };


  return (
    // Children represents all the nested components. In AppView.tsx, we wrap the entire app in the LibraryProvider component
    <LibraryContext.Provider value={{ books, setBooks, addBookToLibrary, getBooksFor, getMaleAuthoredBooks, getFemaleAuthoredBooks }}>
      {children} 
    </LibraryContext.Provider>
  );
};

export { LibraryContext, LibraryProvider };
