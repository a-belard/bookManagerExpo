# Lab 4: BookManager

In this lab, we will create an app that will serve as book manager/library. At the end of this lab, you will have a app that stores all your books, allows you to add books, and even see certain statistics!


## Setting up the project:
In a new folder, run the command to create a new project.
```
npx create-expo-app --template
```
Make sure to select the "Blank (Typescript)" template, title it `BookManager`, and open up the project! Now, make three folders - `Views`, `Models`, and `Controllers`.

The UI to select the "Blank (Typscript)" template looks like this:
<img width="437" src="https://github.com/user-attachments/assets/0a5ed83e-9017-401b-af21-25dc855ca1b3">


Before we do anything else, we will need to install some npm packages. Run the following command:
```
npm install @react-navigation/native @react-navigation/bottom-tabs @react-navigation/stack @react-navigation/native-stack react-native-vector-icons react-native-gesture-handler react-native-reanimated react-native-screens react-native-safe-area-context @react-native-community/masked-view react-native-swipe-list-view react-native-dropdown-picker react-native-chart-kit @types/react-native-vector-icons
```
What we have essentially done is install a bunch of npm packages that we will need later for navigation.

In the `Views` folder, create an `AppView.tsx`, `LibraryView.tsx`, `NewBookView.tsx`, `BookDetailsView.tsx` and `ChartsView.tsx`. For now, copy the code from `App.tsx` into these files but change the class name into the corresponding file name. You may have already noticed that `App.tsx` automatically exports itself as a component by using `export default function(App)` but let's define our new views/components as `const <filename>: React.FC = () => {...}` (this is more modern syntax)! This means you need to add an `export default <componentName>` at the bottom to make sure other files in our app can import these files.

For example, our AppView will not look like this: 
```
const AppView: React.FC = () => {...}
```

## Part 1: Create Bottom Tab Navigation
In your `AppView.tsx` file, import the following:
```
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
```
These imports depend on installing the previous npm packages and what we have imported are simply a bunch of components and functions that allow us to create a bottom tab navigator as well as setting up a navigation container that would later be used for navigation.

Let's also import the views we just created!
```
import LibraryView from './LibraryView';
import NewBookView from './NewBookView';
import ChartsView from './ChartsView';
```

Now, let's move onto building out the view! Because we focusing on navigation, we need to first wrap everything (put simply, this means to put everything into the subsequent component) we put into `AppView` in a `NavigationContainer` component. This will act as the root component and links the navigation structure (like tab navigators, stack navigators, etc.) to our app. Finally, create a Tab using the bottomTabNavigator package we just imported. We can define it as `const Tab = createBottomTabNavigator();` (define it outside of the view)!

We want to build out the bottom tab options now. If we look at the documentation for the `Tab.Navigator` component, it takes in a `screepOptions` prop. We can use the following code to build out our basic functionality:
```
screenOptions={({ route }) => ({
  tabBarIcon: ({ color, size }) => {
    let iconName: string = '';
    if (route.name === 'Library') {
      iconName = 'library-sharp';
    } else if (route.name === 'New Book') {
      iconName = 'book-outline';
    } else if (route.name === 'Charts') {
      iconName = 'bar-chart';
    }
    return <Icon name={iconName} size={size} color={color} />;
  },
  headerShown: false,
})}
```

What we are doing here is taking a route (each bottom tab) and casing on it to determine which icon should show up. The icon names we use come from the `Ionicons` package we installed. Finally, we render the icon with the `Icon` component and passing in the `size` and `color` props. These values are automatically provided by the `Tab.Navigator` component based on the current state of the tab (active or inactive).

The `headerShown` prop is set to false to make sure the the title of tab doesn't show up at the top (we will add it in later)!

We also want to pass in the `tabBarActiveTintColor` and `tabBarInactiveTintColor` props into `Tab.Navigator` to define the colors we want the tabs to be when they are active or inactive (do it after the `headerShown` prop).

Now, we can define our tabs. Make the following three tabs: Library, New Book, Charts. Define these tabs inside the `Tab.Navigator` component.
```
<Tab.Screen
    name="Library"
    component={LibraryView}
    options={{
      tabBarLabel: 'Library',
    }}
/>
```
Modify the code snippet above for the other tabs! 

To explain a bit more about what's happening, the `name` prop in each `Tab.Screen` will be the `route` that was defined in the `screenOptions` prop. This value will tell the `Tab.Navigator` component which icon to render.
The `component` prop tells React Navigation what view to render (we have already imported this) and the `tabBarLabel` prop controls what the users see for the bottom tabs.

One last thing! Every React Native Expo App will render whatever is inside the `App.tsx` file. To change this, let's take out everything in this file and just render the `AppView` component! This will make sure that the app will initially land on that page. The reason why we didn't do everything in the `App.tsx` file was to separate our view files cleanly into their respective folders.

Your code in `AppView.tsx` should look like this:
```
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

import LibraryView from './LibraryView';
import NewBookView from './NewBookView';
import ChartsView from './ChartsView';

const Tab = createBottomTabNavigator();

const AppView: React.FC = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator
              screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size }) => {
                let iconName: string = '';
                if (route.name === 'Library') {
                    iconName = 'library-sharp';
                } else if (route.name === 'New Book') {
                    iconName = 'book-outline';
                } else if (route.name === 'Charts') {
                    iconName = 'bar-chart';
                }
                return <Icon name={iconName} size={size} color={color} />;
                },
                headerShown: false,
                tabBarActiveTintColor: 'blue',
                tabBarInactiveTintColor: 'gray',
              })}
            >
            <Tab.Screen
                name="Library"
                component={LibraryView}
                options={{
                tabBarLabel: 'Library',
                }}
            />
            <Tab.Screen
                name="New Book"
                component={NewBookView}
                options={{
                tabBarLabel: 'New Book',
                }}
            />
            <Tab.Screen
                name="Charts"
                component={ChartsView}
                options={{
                tabBarLabel: 'Charts',
                }}
            />
            </Tab.Navigator>
        </NavigationContainer>
    )
}

export default AppView;
```

After completing this part, if you run `npx expo start`, you should be left with a screen like this: 

<img width="400" height="1000" src="https://github.com/user-attachments/assets/1b8e2b48-2fd0-455f-aef3-7259c8f01372">

## Part 2: Creating the Models

### Gender Model
Let's first create a `Gender.tsx` file in the `Models` folder.
We want to track gender of the authors of our books. We can do so using the following code:
```
export enum Gender = {
    MALE: 'Male',
    FEMALE: 'Female',
    OTHER: 'Other'
};
```
We only want Gender to be on the three options which is why we make it be an enum!

### Book Model
We also want to create a `Book.tsx` file in the `Models` folder.
Let's first declare `Book` as a class. It needs to have the following properties.
```
export class Book {
  id;
  title;
  author;
  gender;
  displayed;

  constructor(title, author, gender, displayed) {
    this.id = this.generateUUID();  
    this.title = title;
    this.author = author;
    this.gender = gender;
    this.displayed = displayed;
  }
```
For those with eagle eyes, you would have noticed that the `id` property is initialize using a `generateUUID` function. The purpose of this function is to ensure that all books will never have the same id (we need this to be satisfied when trying to delete books, more on this later)!

We will imitiate how Apple's `Identifiable` protocol implements its `UUID`. A simple Google search lets us know that Apple's UUID follows the version 4 UUID protocol. It's not important to know what this is since we will use ChatGPT to do this!

Copy and paste this prompt into ChatGPT:
`Write a React Native function called generateUUID that returns a 128 hexadecimal string that conforms to version 4 UUID for Apple's Identifiable Protocol.`

After implementing the `generateUUID` function, we also want some functions to allow React to compare two books (similar to Apple's `Comparable` protocol). We need two functions: `equals` and `compare`. For the `compare` function, use `localeCompare` for comparison (search it up if you are not sure how to use it)!

Your `Book` model should look like this:
```
export class Book {
  id;
  title;
  author;
  gender;
  displayed;

  constructor(title, author, gender, displayed) {
    this.id = this.generateUUID();  
    this.title = title;
    this.author = author;
    this.gender = gender;
    this.displayed = displayed;
  }

  generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = (Math.random() * 16) | 0,
        v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  static equals(book1: Book, book2: Book) {
    return book1.title === book2.title && book1.author === book2.author;
  }

  static compare(book1: Book, book2: Book) {
    return book1.title.localeCompare(book2.title);
  }
}
```

### Library Model
We have a Book model which describes a book object and adds some basic protocols to extend functionality, but now we need a class for a collection of books, which we will call Library! Create a `Library.tsx` file in the `Models` folder.

Declare the class and add some initial books to the library. Copy the following code into `Library.tsx`:
```
import { Book } from './Book';
import { Gender } from './Gender';

export class Library {
  private books: Book[];

  constructor() {
    this.books = [];

    const bookData: Record<string, [string, Gender]> = {
      "The Count of Monte Cristo": ["Alexandre Dumas", Gender.MALE],
      "The Man in the Iron Mask": ["Alexandre Dumas", Gender.MALE],
      "The Three Musketeers": ["Alexandre Dumas", Gender.MALE],
      "Black Beauty": ["Anna Sewell", Gender.FEMALE],
      "The Tenant of Wildfell Hall": ["Anne Bronte", Gender.FEMALE],
      "The Prisoner of Zenda": ["Anthony Hope", Gender.MALE],
      "Adventures of Sherlock Holmes": ["Arthur Conan Doyle", Gender.MALE],
      "The Hound of the Baskervilles": ["Arthur Conan Doyle", Gender.MALE],
      "Dracula": ["Bram Stoker", Gender.MALE],
      "A Christmas Carol": ["Charles Dickens", Gender.MALE],
      "A Tale of Two Cities": ["Charles Dickens", Gender.MALE],
      "David Copperfield": ["Charles Dickens", Gender.MALE],
      "Great Expectations": ["Charles Dickens", Gender.MALE],
      "Hard Times": ["Charles Dickens", Gender.MALE],
      "Nicholas Nickleby": ["Charles Dickens", Gender.MALE],
      "Oliver Twist": ["Charles Dickens", Gender.MALE],
      "The Pickwick Papers": ["Charles Dickens", Gender.MALE],
      "Jane Eyre": ["Charlotte Bronte", Gender.FEMALE],
      "Shirley": ["Charlotte Bronte", Gender.FEMALE],
      "The Professor": ["Charlotte Bronte", Gender.FEMALE],
      "Villette": ["Charlotte Bronte", Gender.FEMALE],
      "The Age of Innocence": ["Edith Wharton", Gender.FEMALE],
      "Wuthering Heights": ["Emily Bronte", Gender.FEMALE],
      "Crime and Punishment": ["Fyodor Dostoyevsky", Gender.MALE],
      "The Brothers Karamazov": ["Fyodor Dostoyevsky", Gender.MALE],
      "The Phantom of the Opera": ["Gaston Leroux", Gender.MALE],
      "1984": ["George Orwell", Gender.MALE],
      "Animal Farm": ["George Orwell", Gender.MALE],
      "To Kill A Mockingbird": ["Harper Lee", Gender.FEMALE],
      "Uncle Tom's Cabin": ["Harriet Beecher Stowe", Gender.FEMALE],
      "Walden": ["Henry David Thoreau", Gender.MALE],
      "Last of the Mohicans": ["James Fenimore Cooper", Gender.MALE],
      "The Deerslayer": ["James Fenimore Cooper", Gender.MALE],
      "Emma": ["Jane Austen", Gender.FEMALE],
      "Mansfield Park": ["Jane Austen", Gender.FEMALE],
      "Northanger Abbey": ["Jane Austen", Gender.FEMALE],
      "Persuasion": ["Jane Austen", Gender.FEMALE],
      "Pride and Prejudice": ["Jane Austen", Gender.FEMALE],
      "Sense and Sensibility": ["Jane Austen", Gender.FEMALE],
      "Pilgrim's Progress": ["John Bunyan", Gender.MALE],
      "Of Mice and Men": ["John Steinbeck", Gender.MALE],
      "Gulliver's Travels": ["Jonathan Swift", Gender.MALE],
      "Around the World in Eighty Days": ["Jules Verne", Gender.MALE],
      "Journey to the Center of the Earth": ["Jules Verne", Gender.MALE],
      "The Awakening": ["Kate Chopin", Gender.FEMALE],
      "Anna Karenina": ["Leo Tolstoy", Gender.MALE],
      "War and Peace": ["Leo Tolstoy", Gender.MALE],
      "Alice's Adventures in Wonderland": ["Lewis Carroll", Gender.MALE],
      "Through The Looking Glass": ["Lewis Carroll", Gender.MALE],
      "Little Women": ["Louisa May Alcott", Gender.FEMALE],
      "Frankenstein": ["Mary Shelley", Gender.FEMALE],
      "The Scarlet Letter": ["Nathaniel Hawthorne", Gender.MALE],
      "Fahrenheit 451": ["Ray Bradbury", Gender.MALE],
      "Kidnapped": ["Robert Louis Stevenson", Gender.MALE],
      "The Strange Case of Dr Jekyll and Mr Hyde": ["Robert Louis Stevenson", Gender.MALE],
      "Treasure Island": ["Robert Louis Stevenson", Gender.MALE],
      "The Red Badge of Courage": ["Stephen Crane", Gender.MALE],
      "Rights of Man": ["Thomas Paine", Gender.MALE],
      "Les Miserables": ["Victor Hugo", Gender.MALE],
      "A Midsummer Night's Dream": ["William Shakespeare", Gender.MALE],
      "Hamlet": ["William Shakespeare", Gender.MALE],
      "Henry V": ["William Shakespeare", Gender.MALE],
      "Julius Caesar": ["William Shakespeare", Gender.MALE],
      "King Lear": ["William Shakespeare", Gender.MALE],
      "Macbeth": ["William Shakespeare", Gender.MALE],
      "Much Ado About Nothing": ["William Shakespeare", Gender.MALE],
      "Othello": ["William Shakespeare", Gender.MALE],
      "Romeo and Juliet": ["William Shakespeare", Gender.MALE],
      "The Comedy of Errors": ["William Shakespeare", Gender.MALE],
      "The Merchant of Venice": ["William Shakespeare", Gender.MALE],
      "The Taming of the Shrew": ["William Shakespeare", Gender.MALE],
      "The Tempest": ["William Shakespeare", Gender.MALE],
      "Twelfth Night": ["William Shakespeare", Gender.MALE],
      "The Hobbit or There and Back Again": ["J.R.R. Tolkien", Gender.MALE],
      "The Fellowship of the Ring": ["J.R.R. Tolkien", Gender.MALE],
      "The Two Towers": ["J.R.R. Tolkien", Gender.MALE],
      "The Return of the King": ["J.R.R. Tolkien", Gender.MALE]
    };

    for (const title in bookData) {
      const [author, gender] = bookData[title]; 
      this.books.push(new Book(title, author, gender, true));
      this.books.sort(Book.compare);
    }
  }
} 
```

Our initial data consists of a book being mapped to a list of the book's author and their gender. To pass it into the `books` array, we can loop through `bookData`, extract the author and gender, make a new book with that information (we will asssume `displayed` is by default set to true), and push it into our arrays.

We want the `Library` class to have a method to add a new book to the library. The following method would accomplish this:
```
public addBookToLibrary(title: string, author: string, gender: Gender, displayed: boolean): void {
  this.books.push(new Book(title, author, gender, displayed));
  this.books.sort(Book.compare);
}
```

We also need some methods to extract subsets of our library. The following method would accomplish this:
```
public getBooksFor(author: string): Book[] {
  return this.books.filter((book) => book.author === author);
}
```

Now write two more methods, one called `getFemaleAuthoredBooks` which will return a list of books for all the books in the library written by women. After that, write a similar method called `getMaleAuthoredBooks`. We will need all three of these methods later in for our charts!

Your `Library` model should look like this:
```
import { Book } from './Book';
import { Gender } from './Gender';

export class Library {
  private books: Book[];

  constructor() {
    this.books = [];

    const bookData: Record<string, [string, Gender]> = {
      "The Count of Monte Cristo": ["Alexandre Dumas", Gender.MALE],
      "The Man in the Iron Mask": ["Alexandre Dumas", Gender.MALE],
      "The Three Musketeers": ["Alexandre Dumas", Gender.MALE],
      "Black Beauty": ["Anna Sewell", Gender.FEMALE],
      "The Tenant of Wildfell Hall": ["Anne Bronte", Gender.FEMALE],
      "The Prisoner of Zenda": ["Anthony Hope", Gender.MALE],
      "Adventures of Sherlock Holmes": ["Arthur Conan Doyle", Gender.MALE],
      "The Hound of the Baskervilles": ["Arthur Conan Doyle", Gender.MALE],
      "Dracula": ["Bram Stoker", Gender.MALE],
      "A Christmas Carol": ["Charles Dickens", Gender.MALE],
      "A Tale of Two Cities": ["Charles Dickens", Gender.MALE],
      "David Copperfield": ["Charles Dickens", Gender.MALE],
      "Great Expectations": ["Charles Dickens", Gender.MALE],
      "Hard Times": ["Charles Dickens", Gender.MALE],
      "Nicholas Nickleby": ["Charles Dickens", Gender.MALE],
      "Oliver Twist": ["Charles Dickens", Gender.MALE],
      "The Pickwick Papers": ["Charles Dickens", Gender.MALE],
      "Jane Eyre": ["Charlotte Bronte", Gender.FEMALE],
      "Shirley": ["Charlotte Bronte", Gender.FEMALE],
      "The Professor": ["Charlotte Bronte", Gender.FEMALE],
      "Villette": ["Charlotte Bronte", Gender.FEMALE],
      "The Age of Innocence": ["Edith Wharton", Gender.FEMALE],
      "Wuthering Heights": ["Emily Bronte", Gender.FEMALE],
      "Crime and Punishment": ["Fyodor Dostoyevsky", Gender.MALE],
      "The Brothers Karamazov": ["Fyodor Dostoyevsky", Gender.MALE],
      "The Phantom of the Opera": ["Gaston Leroux", Gender.MALE],
      "1984": ["George Orwell", Gender.MALE],
      "Animal Farm": ["George Orwell", Gender.MALE],
      "To Kill A Mockingbird": ["Harper Lee", Gender.FEMALE],
      "Uncle Tom's Cabin": ["Harriet Beecher Stowe", Gender.FEMALE],
      "Walden": ["Henry David Thoreau", Gender.MALE],
      "Last of the Mohicans": ["James Fenimore Cooper", Gender.MALE],
      "The Deerslayer": ["James Fenimore Cooper", Gender.MALE],
      "Emma": ["Jane Austen", Gender.FEMALE],
      "Mansfield Park": ["Jane Austen", Gender.FEMALE],
      "Northanger Abbey": ["Jane Austen", Gender.FEMALE],
      "Persuasion": ["Jane Austen", Gender.FEMALE],
      "Pride and Prejudice": ["Jane Austen", Gender.FEMALE],
      "Sense and Sensibility": ["Jane Austen", Gender.FEMALE],
      "Pilgrim's Progress": ["John Bunyan", Gender.MALE],
      "Of Mice and Men": ["John Steinbeck", Gender.MALE],
      "Gulliver's Travels": ["Jonathan Swift", Gender.MALE],
      "Around the World in Eighty Days": ["Jules Verne", Gender.MALE],
      "Journey to the Center of the Earth": ["Jules Verne", Gender.MALE],
      "The Awakening": ["Kate Chopin", Gender.FEMALE],
      "Anna Karenina": ["Leo Tolstoy", Gender.MALE],
      "War and Peace": ["Leo Tolstoy", Gender.MALE],
      "Alice's Adventures in Wonderland": ["Lewis Carroll", Gender.MALE],
      "Through The Looking Glass": ["Lewis Carroll", Gender.MALE],
      "Little Women": ["Louisa May Alcott", Gender.FEMALE],
      "Frankenstein": ["Mary Shelley", Gender.FEMALE],
      "The Scarlet Letter": ["Nathaniel Hawthorne", Gender.MALE],
      "Fahrenheit 451": ["Ray Bradbury", Gender.MALE],
      "Kidnapped": ["Robert Louis Stevenson", Gender.MALE],
      "The Strange Case of Dr Jekyll and Mr Hyde": ["Robert Louis Stevenson", Gender.MALE],
      "Treasure Island": ["Robert Louis Stevenson", Gender.MALE],
      "The Red Badge of Courage": ["Stephen Crane", Gender.MALE],
      "Rights of Man": ["Thomas Paine", Gender.MALE],
      "Les Miserables": ["Victor Hugo", Gender.MALE],
      "A Midsummer Night's Dream": ["William Shakespeare", Gender.MALE],
      "Hamlet": ["William Shakespeare", Gender.MALE],
      "Henry V": ["William Shakespeare", Gender.MALE],
      "Julius Caesar": ["William Shakespeare", Gender.MALE],
      "King Lear": ["William Shakespeare", Gender.MALE],
      "Macbeth": ["William Shakespeare", Gender.MALE],
      "Much Ado About Nothing": ["William Shakespeare", Gender.MALE],
      "Othello": ["William Shakespeare", Gender.MALE],
      "Romeo and Juliet": ["William Shakespeare", Gender.MALE],
      "The Comedy of Errors": ["William Shakespeare", Gender.MALE],
      "The Merchant of Venice": ["William Shakespeare", Gender.MALE],
      "The Taming of the Shrew": ["William Shakespeare", Gender.MALE],
      "The Tempest": ["William Shakespeare", Gender.MALE],
      "Twelfth Night": ["William Shakespeare", Gender.MALE],
      "The Hobbit or There and Back Again": ["J.R.R. Tolkien", Gender.MALE],
      "The Fellowship of the Ring": ["J.R.R. Tolkien", Gender.MALE],
      "The Two Towers": ["J.R.R. Tolkien", Gender.MALE],
      "The Return of the King": ["J.R.R. Tolkien", Gender.MALE]
    };

    for (const title in bookData) {
      const [author, gender] = bookData[title]; 
      this.books.push(new Book(title, author, gender, true));
      this.books.sort(Book.compare);
    }
  }

  public addBookToLibrary(title: string, author: string, gender: Gender, displayed: boolean): void {
    this.books.push(new Book(title, author, gender, displayed));
    this.books.sort(Book.compare); 
  }

  public getBooksFor(author: string): Book[] {
    return this.books.filter((book) => book.author === author);
  }

  public getMaleAuthoredBooks(): Book[] {
    return this.books.filter((book) => book.gender === Gender.MALE);
  }

  public getFemaleAuthoredBooks(): Book[] {
    return this.books.filter((book) => book.gender === Gender.FEMALE);
  }

  public getBooks(): Book[] {
    return this.books;
  }
}
```

### Part 3: Controllers and Contexts
We'd like to create an instance of this library and pass it between our various tabs/screens. In simple terms, we want all the tabs to be able to access the library object and use it. Swift made this easy using `@EnvironmentObject` but React Native does it a bit differently... 

Start off by making a `Controllers` folder and create a file called `LibraryContext.tsx` in it.

First, we need to create a `LibraryContext` which defines a `Context` object that can be used to pass data down through the component tree without having to manually pass props at every level. The purpose of LibraryContext is to create a shared state (like the list of books) that multiple components can access or modify.

Create the `LibraryContext` using the following code:
```
const LibraryContext = createContext<LibraryContextType | undefined>(undefined);
```

Wait, what is `LibraryContextType`? To put it simply, `LibraryContextType` is a TypeScript interface specifying what data and functions are available in the context, which allows TypeScript to provide type checking and autocompletion throughout the app when using the context.

To implement it, in the root directory, make a new file called `types.ts`. Copy and paste the following code into the file:
```
import { Book } from './Models/Book';

export interface LibraryContextType {
    books: Book[];
    setBooks: React.Dispatch<React.SetStateAction<Book[]>>; 
    addBookToLibrary: (title: string, author: string, gender: string, displayed: boolean) => void;
    getBooksFor: (author: string) => Book[];
    getMaleAuthoredBooks: () => Book[];
    getFemaleAuthoredBooks: () => Book[];
}
```

This type interface defines what variables and methods that the `LibraryContext` can fulfill. Feel free to talk to a TA if you don't understand something here!

Returning to `LibraryContext.tsx`, make sure you import the inferface by including `import { LibraryContextType } from '../types';` at the top of the file!

Next, we are going to make a component called `LibraryProvider`. This component uses `LibraryContext.Provider` to make the library data (state, functions, etc.) available to all child components. The LibraryProvider wraps around components that need access to the library data. This is where you would manage the state of the library (like the list of books), and provide methods to manipulate that state (like adding, removing, or fetching books).

To do this, import the `Library` and `Book` models we created before and define a `LibraryContext` using `createContext` (You will need to import `createContext`, `useState`, and `ReactNode` from `react`). 

Next, declare the `LibraryProvider` component and have it take in a `children` prop. Import your `Library` and `Book` models. 

The actual `LibraryProvider` component will have constants like this:
```
const LibraryProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [books, setBooks] = useState(new Library().getBooks());

  const addBookToLibrary = (title: string, author: string, gender: string, displayed: boolean) => {
    const newBook = new Book(title, author, gender, displayed);
    setBooks((prevBooks) => [...prevBooks, newBook]); 
  };

  const getBooksFor = (author: string) => {
    return new Library().getBooksFor(author);
  };
```

These methods are calling the `Library` model's methods and are named the same way so that other components can call the library object easily. Make sure to implement the `getMaleAuthoredBooks` and `getFemaleAuthoredBooks` methods too!

We want to render just the provider component and can do that by just returning the following code:
```
<LibraryContext.Provider value={{ books, setBooks, addBookToLibrary, getBooksFor, getMaleAuthoredBooks, getFemaleAuthoredBooks }}>
    {children} 
</LibraryContext.Provider>
```

Note: We put a list of constants in the value prop to make sure they can be accessed when other screens need to access the `Library` object.

The entire `LibraryContext.tsx` file should look like this:
```
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
    <LibraryContext.Provider value={{ books, setBooks, addBookToLibrary, getBooksFor, getMaleAuthoredBooks, getFemaleAuthoredBooks }}>
      {children} 
    </LibraryContext.Provider>
  );
};

export { LibraryContext, LibraryProvider };
```

### Part 4: Building out the Library View
Let's go ahead with building out the view for the library screen!

Inside `AppView.tsx`, we need to wrap everything in our `LibraryProvider` component. The reason why we do it here is that it guarantees all of our subseqeunt views will be able to access the `LibraryProvider` and thus the library object. 

Inside `LibraryView.tsx`, import the following:
```
import React, { useContext } from 'react';
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { LibraryContext } from '../Controllers/LibraryContext'; 
import { SwipeListView } from 'react-native-swipe-list-view';
import { LibraryContextType } from '../types';
```

The key thing to note here is that we import our `LibraryContext` which will allow us to access the library object.

First, start off by consuming the `LibraryContext` we imported and creating a new constant `displayedBooks` to only include the books that have `displayed` set as True. We also want to set up a navigation constant so that we can navigate to a different screen when on the `LibraryView`.
```
const navigation = useNavigation<NavigationProp<RootStackParamList>>();
const { books, setBooks } = useContext(LibraryContext) as LibraryContextType;
const displayedBooks = books.filter((book) => book.displayed);
```

Again, we need to define the type interface `RootStackParamList`! `RootStackParamlist` is used to map each route/screen in the navigation stack to the parameters it expects. This helps TypeScript check that you're using the correct parameters when navigating to a specific screen. We can implement it the following code (make sure you put this into `types.ts`):
```
export type RootStackParamList = {
    LibraryView: undefined;
    BookDetails: { book: Book };
};
```

The reason why we only have two screens here is that we have one view of the entire library and another view it can navigate to that includes the book details for the book the user clicked on. To make sure we only render the book details for the book selected, it makes sense to pass in a `book` param. Make sure to import the interface at the top of the file!

To start building the view, let's wrap everything in a `SafeAreaView` component. Right inside it, have a `Text` component that says "Library". Have these two components using the following CSS properties:
```
container: {
  flex: 1,
  backgroundColor: '#f8f8f8',  
},
header: {
  fontSize: 32,
  fontWeight: 'bold',
  marginLeft: 20,
  marginBottom: 20,
},
```

The actual rows of the library will be need to support swiping (we want users to be able to swipet left in order to delete a book in the library).
We can do this with the `SwipeListView` component we imported! 
```
<SwipeListView
  data={displayeBooks} 
  keyExtractor={(item) => item.id}
  ...
>
```

We pass in the `displayedBooks` array to the data prop and use the `keyExtractor` prop to help React Native uniquely identify each list item. Why? React needs a way to track each individual item, so it can detect changes and re-render only the items that changed. For each book/item, the id property is used as the key (we wrote a function generate the id).

To support swiping, we need to render two scenarios: users clicking on a book that redirects them to the book details and users swiping left to delete a book. Let's handle the first scenario!

#### renderItem
The `SwipeListView` component has a handy prop called `renderItem` that represents what the list view should look like when there is no swipe/hidden action. 
Have the `renderItem` prop to take in `data` (see above!) and put a `View` component inside it. Directly inside the `View` component, define a `Pressable` component. Within this `Pressable` component, define a `Text` and `Icon` component. The `Text` component should display just the book's title while the `Icon` component should use the `chevron-forward` icon to indicate to users that it is pressable.

To make the app feel better, let's also have the row flash when pressing a book row. The following code will do that:
```
<Pressable
   style={({ pressed }) => [
    styles.bookRow,
    pressed ? styles.pressedBookRow : null,  
  ]}
  onPress={() => navigation.navigate('BookDetails', { book: data.item })} 
>

// Styles (rowWrapper used for the View component)
rowWrapper: {
  marginLeft: 20,
  marginRight: 20,
  borderRadius: 5,   
  overflow: 'hidden', 
},
bookRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingVertical: 15,
  paddingHorizontal: 20,
  backgroundColor: 'white',
},
pressedBookRow: {
  backgroundColor: '#f8f8f8',  
},
```

The `pressed` prop in the `Pressable` component indicates whether the component is being actively pressed. We can use this in a simple ternary operation on line right below which means that if `pressed` is true have the `Pressable` component use the styles of `pressedBookRow`, otherwise do nothing.

We also define a navigation function with the `onPress` prop which will navigate us to our `BookDetails` view (more on this later)! The `SwipeListView component should look this right now:
```
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
        onPress={() => navigation.navigate('BookDetails', { book: item })} 
      >
        <Text style={styles.bookTitle}>{item.title}</Text>
        <Icon name="chevron-forward" size={20} color="gray" /> 
      </Pressable>
    </View>
  )}
  ...
>
```

Let's move on to the second scenario: users swiping to delete a book. The `Pressable` component also accounts for this with the `renderHiddenItem` prop. Have the prop take in `data` and `rowMap` and right inside the prop, define a `View` component with a `TouchableOpacity` component right inside it. Within the `TouchableOpacity` component, define a `Text` component that just says "Delete".

The code should look like this:
```
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

// Styles
rowBack: {
  flexDirection: 'row',
  justifyContent: 'flex-end',
  alignItems: 'center',
  backgroundColor: '#ff3b30',
  flex: 1,
  marginLeft: 20,
  marginRight: 20,
  borderRadius: 6,   
},
deleteButton: {
  width: 75,
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'red',
  height: '100%',
  borderRadius: 5,
},
deleteButtonText: {
  color: 'white',
  fontWeight: 'bold',
},
```

You may have already noticed that there is an undefined `deleteBook` functionin the `onPress` prop. Let's fix that and implement the function!

When deleting a book, we also want to close its row (something the `SwipeListView` can do programatically). 

Write a `closeRow` function right below the `useNavigation` that takes in `rowMap` and `rowKey`. Here, `rowMap` is an object where each key is the unique key of a row (as defined by the keyExtractor), and each value is a reference to that row. The function check whether `rowMap[rowKey]` exists and if it does, closes the row (`closeRow()`).

Write a `deleteBook` function that serves as a wrapper for `closeRow`. We also want the `deleteBook` function to update the list of books and make sure it is removed from the books arrays! 

```
const deleteBook = (rowMap, rowKey) => {
  closeRow(rowMap, rowKey);
  const updatedBooks = books.filter((item => item.id !== rowKey))
  setBooks(updatedBooks);  
};

const closeRow = (rowMap, rowKey) => {
  if (rowMap[rowKey]) {
    rowMap[rowKey].closeRow();
  }
};
```

Lastly, right after `SwipeListView` component but within `SafeAreaView`, add this:
```
leftOpenValue={0}
rightOpenValue={-75} 
disableRightSwipe
```
This determines how much the row scoots to the left when swiping.

Your final code in `LibraryView.tsx` should look like this:
```
import React, { useContext } from 'react';
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../types';
import { LibraryContext } from '../Controllers/LibraryContext'; 
import { SwipeListView } from 'react-native-swipe-list-view';
import { LibraryContextType } from '../types';

const LibraryView: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { books, setBooks } = useContext(LibraryContext) as LibraryContextType;  
  
  const displayedBooks = books.filter((book) => book.displayed);

  const deleteBook = (rowMap: { [key: string]: any }, rowKey: string) => {
    closeRow(rowMap, rowKey);
    const updatedBooks = books.filter((item => item.id !== rowKey))
    setBooks(updatedBooks);  
  };

  const closeRow = (rowMap: { [key: string]: any }, rowKey: string) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={ styles.header }>Library</Text>
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
              onPress={() => navigation.navigate('BookDetails', { book: item })} 
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
    backgroundColor: '#f8f8f8',  
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    marginLeft: 20,
    marginBottom: 20,
  },
  rowWrapper: {
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 5,   
    overflow: 'hidden', 
  },
  bookRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: 'white',
  },
  pressedBookRow: {
    backgroundColor: '#f8f8f8',  
  },
  bookTitle: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  rowBack: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#ff3b30',
    flex: 1,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 6,   
  },
  deleteButton: {
    width: 75,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red',
    height: '100%',
    borderRadius: 5,
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default LibraryView;
```

### Part 5: Building out the BookDetails View
We have already hinted at the mysterious `BookDetailsView` but have not implemented it! Now will be time to do that!

Because `BookDetailsView` can only be accessed through navigating from the `LibraryView`, it needs some extra work. Inside `types.ts`, we need to define a new type interface called `BookDetailsScreenProps`.

Why? Because when a screen component is used in React Navigation, it receives both route and navigation props automatically, and they both need to be included in the component's props type.

We can define the `BookDetailsScreenProps` type interface with the following code:
```
import { NativeStackScreenProps } from '@react-navigation/native-stack'; // Import this at the top of types.ts

export type BookDetailsScreenProps = NativeStackScreenProps<RootStackParamList, 'BookDetails'>;
```

Going back to `BookDetailsView`, let's declare the `book` constant using `route.params` (this extracts the book data from the route data). Render a `View` component with `Text` components inside listing the book's title, author, and gender.

TRY TO DO THIS YOURSELF before looking at the code snippet below!!!

Your code in `BookDetailsView` should look like this:
```
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
```

Before running the app, to make this work, we need to make a small adjustment to our `AppView` again.

Looking at `AppView`, you can see we don't have a tab that takes care of navigation to `BookDetailsView`. To get around this, we will set up a `LibraryStackScreen`. 

First, define a stack navigator called `LibraryStack` by using `createStackNavigator<RootStackParamList>()`. Next, define a component called `LibraryStackScreen`. This component will directly render the `LibraryStack.Navigator` component. Make sure to have import `RootStackParamList` from `types.ts`!

Inside the `LibraryStack.Navigator` component, render two `LibraryStack.Screen` components. Have their `name` prop be "LibraryView" and "BookDetails" respectively while passing the correct components into the `component` prop. Lastly, in the `options` prop, set `headerShown` to false for the `LibraryView`, set `title` to "Library" , and set `title` to "Book Details" for `BookDetailsView`.

The code should be placed right before the `AppView` component and look like this:
```
const LibraryStack = createStackNavigator<RootStackParamList>(); 

const LibraryStackScreen = () => {
  return (
    <LibraryStack.Navigator>
      <LibraryStack.Screen 
        name="LibraryView" 
        component={LibraryView} 
        options={{ headerShown: false, title: 'Library' }}
      />
      <LibraryStack.Screen 
        name="BookDetails" 
        component={BookDetailsView} 
        options={{ title: 'Book Details' }} 
      />
    </LibraryStack.Navigator>
  );
};
```

Also, change the library `Tab.Screen` component prop to be "LibraryStackScreen" (the component we just defined)! This will make the Library tab render the navigation stack, instead of just the `LibraryView`, allowing us to click on a book and be redirected to its details.

Your code in `AppView.tsx` should look like this:
```
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { RootStackParamList } from '../types';
import Icon from 'react-native-vector-icons/Ionicons'; 

import LibraryView from './LibraryView';
import NewBookView from './NewBookView';
import ChartsView from './ChartsView';

import BookDetailsView from './BookDetailsView'; 
import { LibraryProvider } from '../Controllers/LibraryContext';

const Tab = createBottomTabNavigator();
const LibraryStack = createStackNavigator<RootStackParamList>(); 

const LibraryStackScreen = () => {
  return (
    <LibraryStack.Navigator>
      <LibraryStack.Screen 
        name="Library View" 
        component={LibraryView} 
        options={{ headerShown: false, title: 'Library' }}
      />
      <LibraryStack.Screen 
        name="BookDetails" 
        component={BookDetailsView} 
        options={{ title: 'Book Details' }} 
      />
    </LibraryStack.Navigator>
  );
};

const AppView = () => {
  return (
    <LibraryProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
              let iconName: string = '';
              if (route.name === 'Library') {
                iconName = 'library-sharp';
              } else if (route.name === 'New Book') {
                iconName = 'book-outline';
              } else if (route.name === 'Charts') {
                iconName = 'bar-chart';
              }
              return <Icon name={iconName} size={size} color={color} />;
            },
            headerShown: false,
            tabBarActiveTintColor: 'blue',
            tabBarInactiveTintColor: 'gray',
          })}
        >
          <Tab.Screen
            name="Library"
            component={LibraryStackScreen}
            options={{
              tabBarLabel: 'Library',
            }}
          />
          <Tab.Screen
            name="New Book"
            component={NewBookView}
            options={{
              tabBarLabel: 'New Book',
            }}
          />
          <Tab.Screen
            name="Charts"
            component={ChartsView}
            options={{
              tabBarLabel: 'Charts',
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </LibraryProvider>
  );
};

export default AppView;
```

### Part 6: Adding New Books
Let's move onto the second tab, adding new books.

To start this, in `NewBookView.tsx`, add the following imports:
```
import React, { useContext, useState } from 'react';
import { SafeAreaView, View, Text, TextInput, Button, Switch, StyleSheet, Alert, Keyboard } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { LibraryContext } from '../Controllers/LibraryContext'; 
import { LibraryContextType } from '../types';
```

Inside a `NewBookView` component, immediately consume `LibraryContext` to only access the `addBookToLibrary` function we defined in the `LibrarContext.Provider`.

Create all of the constants (one for each field in the `Book` model as well as `open` constant (boolean) and a `items` constant representing the genders.

The code should look like this:
```
const { addBookToLibrary } = useContext(LibraryContext) as LibraryContextType; 

const [title, setTitle] = useState('');
const [author, setAuthor] = useState('');
const [gender, setGender] = useState('Male');
const [displayed, setDisplayed] = useState(false);

const [open, setOpen] = useState(false);

const [items, setItems] = useState([
  { label: 'Male', value: 'Male' },
  { label: 'Female', value: 'Female' },
  { label: 'Other', value: 'Other' }
]);
```

Let's build out the view now! Define a `SafeAreaView` as always and inside, use a `Text` component to put "New Book" as the header. Define another `View` (this will represent our new book form).

Here is the code snippet:
```
<SafeAreaView style={styles.container}>
  <Text style={styles.heading}>New Book</Text>
  <View style={styles.form}> //Book form
  ...
</SafeAreaView>

// Styles
container: {
  flex: 1,
  padding: 20,
  backgroundColor: '#f8f8f8',
},
heading: {
  fontSize: 24,
  fontWeight: 'bold',
  marginLeft: 20,
  marginBottom: 20,
},
form: {
  backgroundColor: '#fff',  
  borderRadius: 10,  
  padding: 15,  
  shadowOpacity: 0.2,
  shadowRadius: 10,
  shadowOffset: { width: 0, height: 2 },
  marginLeft: 20,
  marginRight: 20,
},
```

Use the `TextInput` component to create text input fields for both the title and author. 

This is what the `TextInput` for the title looks like:
```
<TextInput
  style={styles.input}
  placeholder="Title"
  value={title}
  onChangeText={setTitle}
/>
```

Make sure to create a `TextInput` componet for the author too!

Now we want users to be able to pick a gender out of ones we have defined in the `Gender` model. Define a `View` to represent the picker container and use the `DropDownPicker` component. 

The following code will do that for us:
```
<View style={styles.pickerContainer}>
  <Text style={styles.pickerText}>Author Gender:</Text>
  <DropDownPicker
    open={open}
    value={gender}
    items={items}
    setOpen={setOpen}
    setValue={setGender}
    setItems={setItems}
    containerStyle={ styles.picker }
  />
</View>

// Styles
pickerContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between', 
  marginBottom: 20,
  zIndex: 1,
},
pickerText: {
  fontSize: 16,
  color: '#333',
},
picker: {
  width: 100,
  height: 40,
  marginBottom: 10,
}
```

We also want to use a `Switch` component which toggles back and forth to determine whether the book we add will be displayed in the library.
```
<View style={styles.switchContainer}>
  <Text style={styles.switchLabel}>Display book in library</Text>
  <Switch
    value={displayed}
    onValueChange={setDisplayed}
  />
</View>

// Styles
switchContainer: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  zIndex: 0,
},
switchLabel: {
  fontSize: 16,
  color: '#333',
}
```

Finally, we need a button to actually add the book:
```
<View style={styles.buttonContainer}>
  <Button
    title="Add Book"
    onPress={handleAddBook}
    disabled={!title || !author} 
  />
</View>

// Styles
buttonContainer: {
  borderTopWidth: 1,
  borderTopColor: '#ccc',  
  paddingHorizontal: 10,
  marginTop: 40,
}
```
Note that the "Add Book" button is actually disabled if either the title or author fields are null.

Wait! What is `handleAddBook`? Well, this will serve as our handler for how we want to add books.

Define a function called `handleAddBook` that immediately dimisses the keyboard. It will then check if both the author and title are not null and use the `addBookTolibrary` function we defined. Remember to use React's useState to clear all the fields which are being used as placeholders below. Add an alert at the end depending on if adding a book is a success or we need to reminder the user to provide both an title and author.

The code for `NewBookView.tsx` should look like this:
```
import React, { useContext, useState } from 'react';
import { SafeAreaView, View, Text, TextInput, Button, Switch, StyleSheet, Alert, Keyboard } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { LibraryContext } from '../Controllers/LibraryContext'; 
import { LibraryContextType } from '../types';

const NewBookView = () => {
  const { addBookToLibrary } = useContext(LibraryContext) as LibraryContextType;

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [gender, setGender] = useState('Male');
  const [displayed, setDisplayed] = useState(false);

  const [open, setOpen] = useState(false);

  const [items, setItems] = useState([
    { label: 'Male', value: 'Male' },
    { label: 'Female', value: 'Female' },
    { label: 'Other', value: 'Other' }
  ]);

  const handleAddBook = () => {
    Keyboard.dismiss();
    if (title && author) {
      addBookToLibrary(title, author, gender, displayed);
      setTitle('');
      setAuthor('');
      setGender('Male');
      setDisplayed(false);
      Alert.alert('Success', 'Book added to the library!');
    } else {
      Alert.alert('Error', 'Please provide both title and author.');
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
            containerStyle={ styles.picker }
          />
        </View>

        <View style={styles.switchContainer}>
          <Text style={styles.switchLabel}>Display book in library</Text>
          <Switch
            value={displayed}
            onValueChange={setDisplayed}
          />
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 20,
    marginBottom: 20,
  },
  form: {
    backgroundColor: '#fff',  
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
    borderBottomColor: '#ccc', 
    paddingVertical: 8,
    paddingHorizontal: 10,
    fontSize: 16,
    marginBottom: 15, 
  },
  pickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', 
    marginBottom: 20,
    zIndex: 1,
  },
  pickerText: {
    fontSize: 16,
    color: '#333',
  },
  picker: {
    width: 100,
    height: 40,
    marginBottom: 10,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 0,
  },
  switchLabel: {
    fontSize: 16,
    color: '#333',
  },
  buttonContainer: {
    borderTopWidth: 1,
    borderTopColor: '#ccc',  
    paddingHorizontal: 10,
    marginTop: 40,
  },
  
});

export default NewBookView;
```

### Part 7: Charting Data
For the third and last tab, Charts, we want to chart some data about our library and display it as a bar graph!

To do this, in `ChartsView.tsx`, import the following:
```
import React, { useContext } from 'react';
import { SafeAreaView, ScrollView, Dimensions, Text, StyleSheet } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { LibraryContext } from '../Controllers/LibraryContext';
import { LibraryContextType } from '../types';
```

ChartKit is a third party package that we installed at the very beginning and provides us an easy to way to chart data. But first we need to get that data!

Inside `ChartsView`, immediately consume the `LibraryContext` and get the following functions: `getBooksFor`, `getMaleAuthoredBooks`, `getFemaleAuthoredBooks`. 

Define two constants called `maleBooks` and `femaleBooks` that get the length of the results returned by `getMaleAuthoredBooks` and `getFemaleAuthoredBooks`. 
```
const maleBooks = getMaleAuthoredBooks().length;
const femaleBooks = getFemaleAuthoredBooks().length;
```

For the gender data, the following code will do the trick:
```
const genderChartData = {
    labels: ['Male', 'Female'],  
    datasets: [
      {
        data: [
          maleBooks,  
          femaleBooks
        ],
      },
    ],
  };
```

We define two labels which will go on the x-axis and pass in the two constants we defined above as the data that will be charted.

For the author data, this code will be enough:
```
const authorChartData = {
  labels: ['Shakespeare', 'Tolkien', 'Austen', 'Dickens', 'Bronte'],  
  datasets: [
    {
      data: [
        getBooksFor('William Shakespeare').length,
        getBooksFor('J.R.R. Tolkien').length,
        getBooksFor('Jane Austen').length,
        getBooksFor('Charles Dickens').length,
        getBooksFor('Charlotte Bronte').length,
      ],
    },
  ]
}
```

Here, we use the `getBooksFor` method we have access to through the consumed `LibraryContext` to get the number of books written by an author.

Now, let's plot this data! As always, define everything inside an `SafeAreaView` and then put a `ScrollView` inside that. We are going to put two charts on one screen (one may cut off) so we want to be able to scroll to see both of them!

Use a `Text` component to label both charts and use the `BarChart` component to plot the data. Pass in the data constants we defined above into the `data` prop. For the `width` and `height` props, we can use `Dimensions.get('window').<width/height>` to get the screen height and width and pass those in to size the chart properly (have the height of the bar chart be a third of the screen's height)

The code in `ChartsView` should look like this:
```
import React, { useContext } from 'react';
import { SafeAreaView, ScrollView, Dimensions, Text, StyleSheet } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { LibraryContext } from '../Controllers/LibraryContext'; 
import { LibraryContextType } from '../types';

const ChartsView = () => {
  const { getBooksFor, getMaleAuthoredBooks, getFemaleAuthoredBooks } = useContext(LibraryContext) as LibraryContextType;

  const maleBooks = getMaleAuthoredBooks().length;
  const femaleBooks = getFemaleAuthoredBooks().length;

  const genderChartData = {
    labels: ['Male', 'Female'],  
    datasets: [
      {
        data: [
          maleBooks,  
          femaleBooks
        ],
      },
    ],
  };

  const authorChartData = {
    labels: ['Shakespeare', 'Tolkien', 'Austen', 'Dickens', 'Bronte'],  
    datasets: [
      {
        data: [
          getBooksFor('William Shakespeare').length,
          getBooksFor('J.R.R. Tolkien').length,
          getBooksFor('Jane Austen').length,
          getBooksFor('Charles Dickens').length,
          getBooksFor('Charlotte Bronte').length,
        ],
      },
    ]
  }

  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>Books by Author Gender</Text>
        <BarChart
          data={genderChartData}
          width={screenWidth}
          height={screenHeight / 3}
          chartConfig={chartGenderConfig}
          fromZero={true}
          style={styles.chartStyle}
          yAxisLabel=""
          yAxisSuffix=""
        />
        <BarChart
          data={authorChartData}
          width={screenWidth}
          height={screenHeight / 3}
          chartConfig={chartAuthorsConfig}
          fromZero={true}
          style={styles.chartStyle}
          yAxisLabel=""
          yAxisSuffix=""
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const chartGenderConfig = {
  backgroundGradientFrom: '#fff',
  backgroundGradientTo: '#fff',
  fillShadowGradient: '#3c78f6',  
  fillShadowGradientOpacity: 1,
  decimalPlaces: 0,
  color: () => '#3c78f6', 
  labelColor: () => '#000000',
  style: {
    borderRadius: 16,
  },
  propsForLabels: {
    fontSize: 12,
    opacity: 0.8,
  },
  propsForBackgroundLines: {
    strokeDasharray: '',
    strokeWidth: 1,    
    stroke: '#ccc', 
  },
};

const chartAuthorsConfig = {
  backgroundGradientFrom: '#fff',
  backgroundGradientTo: '#fff',
  fillShadowGradient: '#65c466',  
  fillShadowGradientOpacity: 1,
  decimalPlaces: 0,
  color: () => '#65c466', 
  labelColor: () => '#000000',
  style: {
    borderRadius: 16,
  },
  propsForLabels: {
    fontSize: 12,
    opacity: 0.8,
  },
  propsForBackgroundLines: {
    strokeDasharray: '',
    strokeWidth: 1,    
    stroke: '#ccc', 
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  chartStyle: { 
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
});

export default ChartsView;
```

There is a lot of styling involved with making these charts look pretty but we have given you the code to save you the hassle of reading ChartKit's documentation and playing around wtih values. If you are interested in how our code works, please look at this [link](https://www.npmjs.com/package/react-native-chart-kit).

Congrats, you now have a working BookManager App! Please demonstrate all the functionality in all three tabs to get checked off!













   


