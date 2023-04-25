const createBookInfo = (info, author) => {
  const pBook = document.createElement('p');
  pBook.textContent = `"${info}" by ${author}`;
  return pBook;
};

const createButton = (func, textContent, data, classes, index) => {
  const button = document.createElement('button');
  button.type = func;
  button.classList.add(`${classes}`);
  button.setAttribute(`data-${data}`, index);
  button.textContent = textContent;
  return button;
};

const createBookDiv = (title, author, index, classes) => {
  const div = document.createElement('div');
  div.classList.add(`${classes}`);
  div.setAttribute('data-book', `${index}`);
  div.appendChild(createBookInfo(title, author));
  div.appendChild(createButton('button', 'Remove', 'index', 'removeBtn', index));
  return div;
};

class Book {
  constructor(Title, Author) {
    this.Title = Title;
    this.Author = Author;
  }
}

export default {
  createBookDiv,
  createButton,
  createBookInfo,
  Book,
};