import BBClass from './BookBinding.js';

const add = document.getElementById('add');
const title = document.getElementById('title');
const author = document.getElementById('author');
const bookshelf = document.querySelector('.bookshelf');
const localStorageName = 'Books';
const bookDivName = 'book-row';

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

const a = document.querySelectorAll('a')
const section = document.querySelectorAll('section')

a.forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault()
        
        window.location.hash = link.getAttribute('href')

        section.forEach(section => {
            if (section.id === link.getAttribute('href').substring(1)) {
                section.style.display = 'block'
            } else {
                section.style.display = 'none'
            }
        })
    })
})

document.querySelector('section').style.display = 'block'

window.addEventListener('hashchange', e => {
    e.preventDefault()
    const hash = window.location.hash
    
    section.forEach(section => {
        if (section.id === hash.substring(1)) {
            section.style.display = 'block'
        } else {
            section.style.display = 'none'
        }
    })

})