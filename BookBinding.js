import renderModule from './indexModule.js';

class BookBinding {
  constructor(localName) {
    this.awesomeBooks = localStorage.getItem(`${localName}`) ? JSON.parse(localStorage.getItem(`${localName}`)) : [];
    this.localName = localName;
  }

  add(title, author, bookshelf, classes) {
    const book = new renderModule.Book(title.value.trim(), author.value.trim());
    if (title.value.length && author.value.length) {
      this.awesomeBooks.push(book);
    }
    localStorage.setItem(this.localName, JSON.stringify(this.awesomeBooks));
    const index = this.awesomeBooks.length - 1;
    bookshelf.appendChild(renderModule.createBookDiv(title.value, author.value, index, classes));
    title.value = '';
    author.value = '';
  }

  removeBook(index, bookRemove, bookshelf) {
    this.awesomeBooks.splice(index, 1);
    localStorage.setItem(this.localName, JSON.stringify(this.awesomeBooks));
    bookshelf.removeChild(bookRemove);
  }

  static update(bookshelf, localName, bookDivName) {
    const awesomeBooks = localStorage.getItem(`${localName}`) ? JSON.parse(localStorage.getItem(`${localName}`)) : [];
    const bookshelfFrag = document.createDocumentFragment();
    awesomeBooks.forEach((book, i) => {
      bookshelfFrag.append(
        renderModule.createBookDiv(book.Title, book.Author, i, bookDivName),
      );
    });
    bookshelf.innerHTML = '';
    bookshelf.appendChild(bookshelfFrag);
  }
}

export default {
  BookBinding,
};