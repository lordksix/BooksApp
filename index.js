import renderModule from './indexModule.js';

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


// // Displaying awesome books
// const displayBooks = () => {
//   const bookshelfFrag = document.createDocumentFragment();
//   awesomeBooks.forEach((book, i) => {
//     bookshelfFrag.appendChild(renderModule.createBookDiv(book.Title, book.Author, i));
//   });
//   bookshelf.appendChild(bookshelfFrag);
// };

// // addding to awesome books
// const addBook = () => {
//   const book = new Book(title.value.trim(), author.value.trim());
//   const bookshelfArrLen = document.querySelectorAll('.bookshelf div').length;
//   if (title.value.length && author.value.length) awesomeBooks.push(book);
//   localStorage.setItem('Books', JSON.stringify(awesomeBooks));
//   bookshelf.appendChild(renderModule.createBookDiv(title.value, author.value, bookshelfArrLen));
//   title.value = '';
//   author.value = '';
// };

// window.addEventListener('load', displayBooks);

// // even listener on add button
// add.addEventListener('click', (e) => {
//   e.preventDefault();
//   addBook();
// });

// // removing from awesome books
// bookshelf.addEventListener('click', (e) => {
//   if (e.target.classList.contains('removeBtn')) {
//     const index = parseInt(e.target.dataset.index, 10);
//     const bookRemove = document.querySelector(`[data-book="${index}"]`);
//     const newData = awesomeBooks.filter((_book, i) => i !== index);
//     localStorage.setItem('Books', JSON.stringify(newData));
//     bookshelf.removeChild(bookRemove);
//   }
// });

class BookBinding {
    constructor() {
        this.awesomeBooks = localStorage.getItem('Books') ? JSON.parse(localStorage.getItem('Books')) : [];
    }

    add (title, author) {
        const book = new Book(title.value, author.value)
        if(title.value.length && author.value.length) {
            this.awesomeBooks.push(book)
        }
        localStorage.setItem('Books', JSON.stringify(this.awesomeBooks));
        title.value = '';
        author.value = '';
    }

    removeBook (index) {
        this.awesomeBooks.splice(index, 1)  
        localStorage.setItem('Books', JSON.stringify(this.awesomeBooks));
    }

    static update () {
        const awesomeBooks = JSON.parse(localStorage.getItem('Books'))
        const bookElement = document.createElement('bookElement')
        bookshelf.innerHTML = '';
        awesomeBooks.forEach((book, i) => {
            let color;
            if (i % 2 === 0) {
                color = 'bg-light'
            } else {
                color = '';
            }
            bookElement.innerHTML += `
            <div id="items" class="d-flex justify-content-between align-items-center ${color}">
                <p class="m-0">"${book.Title}" by ${book.Author}</p>
                <button type="button" class="removeBtn btn btn-outline-dark p-1" data-index="${i}">Remove</button>
            </div>
            `;
            bookshelf.appendChild(bookElement)
        })
    }
}


const bookBinding = new BookBinding()

bookshelf.addEventListener('click', (event) => {
    if(event.target.classList.contains('removeBtn')) {
        const index = parseInt(event.target.dataset.index, 10)
        bookBinding.removeBook(index)
        BookBinding.update()
    }
})

add.addEventListener('click', (e) => {
    e.preventDefault();
    bookBinding.add(title, author)
    BookBinding.update();
})

BookBinding.update()