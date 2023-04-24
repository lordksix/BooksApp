class Book {
  constructor(Title, Author) {
    this.Title = Title;
    this.Author = Author;
  }
}

const add = document.getElementById('add');
const title = document.getElementById('title');
const author = document.getElementById('author');
const bookshelf = document.querySelector('.bookshelf');

const awesomeBooks = localStorage.getItem('Books') ? JSON.parse(localStorage.getItem('Books')) : [];

function createBookInfo(info) {
  const pBook = document.createElement('p');
  pBook.textContent = info;
  return pBook;
}

function createButton(func, textContent, data, classes, index) {
  const button = document.createElement('button');
  button.type = func;
  button.classList.add(`${classes}`);
  button.setAttribute(`data-${data}`, index);
  button.textContent = textContent;
  return button;
}

function createBookDiv(title, author, index) {
  const div = document.createElement('div');
  div.setAttribute('data-book', `${index}`);
  div.append(createBookInfo(title), createBookInfo(author));
  div.appendChild(createButton('button', 'Remove', 'index', 'removeBtn', index));
  return div;
}

// Displaying awesome books
const displayBooks = () => {
  const bookshelfFrag = document.createDocumentFragment();
  awesomeBooks.forEach((book, i) => {
    bookshelfFrag.appendChild(createBookDiv(book.Title, book.Author, i));
  });
  bookshelf.appendChild(bookshelfFrag);
};

// addding to awesome books
const addBook = () => {
  const book = new Book(title.value.trim(), author.value.trim());
  const bookshelfArrLen = document.querySelectorAll('.bookshelf div').length;
  if (title.value.length && author.value.length) { awesomeBooks.push(book); }
  localStorage.setItem('Books', JSON.stringify(awesomeBooks));
  bookshelf.appendChild(createBookDiv(title.value, author.value, bookshelfArrLen));
  title.value = '';
  author.value = '';
};

window.addEventListener('load', displayBooks);

// even listener on add button
add.addEventListener('click', (e) => {
  e.preventDefault();
  addBook();
});

// removing from awesome books
bookshelf.addEventListener('click', (e) => {
  if (e.target.classList.contains('removeBtn')) {
    const index = parseInt(e.target.dataset.index, 10);
    const bookRemove = document.querySelector(`[data-book="${index}"]`);
    const newData = awesomeBooks.filter((_book, i) => i !== index);
    localStorage.setItem('Books', JSON.stringify(newData));
    bookshelf.removeChild(bookRemove);
  }
});