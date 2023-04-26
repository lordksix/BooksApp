import BBClass from './BookBinding.js';

const add = document.getElementById('add');
const title = document.getElementById('title');
const author = document.getElementById('author');
const bookshelf = document.querySelector('.bookshelf');
const localStorageName = 'Books';
const bookDivName = 'book-row';

const navItem = document.querySelectorAll('.nav a');
const section = document.querySelectorAll('section');

const bookBinding = new BBClass.BookBinding(localStorageName);

bookshelf.addEventListener('click', (e) => {
  if (e.target.classList.contains('removeBtn')) {
    const index = parseInt(e.target.dataset.index, 10);
    const bookRemove = document.querySelector(`[data-book="${index}"]`);
    bookBinding.removeBook(index, bookRemove, bookshelf);
    bookshelf.innerHTML = '';
    BBClass.BookBinding.update(bookshelf, localStorageName, bookDivName);
  }
});

add.addEventListener('click', (e) => {
  e.preventDefault();
  bookBinding.add(title, author, bookshelf, bookDivName);
});

window.addEventListener('load', BBClass.BookBinding.update(bookshelf, localStorageName, bookDivName));

// single page application work

const sectionRender = (section) => {
  const { hash } = window.location;
  section.forEach((section) => {
    if (section.id === hash.substring(1)) section.style.display = 'flex';
    else section.style.display = 'none';
  });
  navItem.forEach((link) => {
    if (link.getAttribute('href') === hash.substring(1)) link.classList.add('active');
    else link.classList.remove('active');
  });
};

navItem.forEach((link) => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    link.classList.add('active');
    window.location.hash = link.getAttribute('href');
    sectionRender(section);
  });
});

document.querySelector('section').style.display = 'flex';
