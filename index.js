class Book {
    constructor(Title, Author) {
        this.Title = Title
        this.Author = Author
    }
}

const add = document.getElementById('add')
const title = document.getElementById('title')
const author = document.getElementById('author')
const bookshelf = document.querySelector('.bookshelf')

const awesomeBooks = localStorage.getItem('Books') ? JSON.parse(localStorage.getItem('Books')) : []; 


// Displaying awesome books
const displayBooks = () => {
    bookshelf.innerHTML = '';
     awesomeBooks.forEach((book, i) => {
     bookshelf.innerHTML += `
         <div>
             <p>${book.Title}</p>
             <p>${book.Author}</p>
             <button type="button" class="removeBtn" data-index="${i}">Remove</button>
             <hr>   
         </div>
     `;
     bookshelf.value = '';
    })
}

displayBooks()

// addding to awesome books
const addBook = () => {
    const book = new Book(title.value.trim(), author.value.trim())
    if (title.value.length && author.value.length) { awesomeBooks.push(book); }
    localStorage.setItem('Books', JSON.stringify(awesomeBooks));
    title.value = '';
    author.value = '';
}

// even listener on add button
add.addEventListener('click', (e) => {
    e.preventDefault();
    addBook()
    displayBooks()
})

// removing from awesome books
bookshelf.addEventListener('click', (event) => {
    if (event.target.classList.contains('removeBtn')) {
        const index = parseInt(event.target.dataset.index, 10)
        const newData = awesomeBooks.filter((_book, i) => i!==index)
        localStorage.setItem('Books', JSON.stringify(newData));
        window.location.reload()
    }
})