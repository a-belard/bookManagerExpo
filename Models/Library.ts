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
