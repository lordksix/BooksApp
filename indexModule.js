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

export default {
  createBookDiv,
  createButton,
  createBookInfo,
};