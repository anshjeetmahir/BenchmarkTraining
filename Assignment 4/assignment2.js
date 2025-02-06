

const bookLibrary = {
    books: [
        {
            title: 'Rich Dad Poor Dad',
            author: 'Robert Kiyosaki and Sharon Lechter',
            yearPublished: 1997
        },
        {
            title: 'To Kill a Mockingbird',
            author: 'Harper Lee',
            yearPublished: 1960
        },
        {
            title: 'Adventures of Huckleberry Finn',
            author: 'Mark Twain',
            yearPublished: 1884
        },
        {
            title: 'A Passage to India',
            author: 'E.M. Forster',
            yearPublished: 1924
        },
        {
            title: 'The Worst Journey in the World',
            author: 'Apsley Cherry-Garrard',
            yearPublished: 1922
        },
        {
            title: 'Harry Potter and the Sorcerer',
            author: 'J. K. Rowling',
            yearPublished: 1997
        },
    ],
    addBook: function (book) {
        if (!book.title || !book.author || !book.yearPublished) {
            console.error('Book must have title, author, and yearPublished');
        } else {
            this.books.push(book);
            console.log(`Book Added: \nBook Name: ${book.title}\nBook's Author: ${book.author}\nYear of Publish: ${book.yearPublished}`);
        }
    },

    getBooksByAuthor: function (author) {
        const authorBooks = this.books.filter(book =>
            book.author.toLowerCase() === author.toLowerCase()

        );
        if (authorBooks.length === 0) {
            console.log(`No books found by author: ${author}`);
        }
        console.log(`Books by ${author}:`, ...authorBooks);

    },
    removeBook: function (title) {
        let flag = 0;
        for (let i = 0; i < this.books.length; i++) {
            if (this.books[i].title.toLowerCase() === title.toLowerCase()) {
                this.books.splice(i, 1);
                console.log(`Successfully removed: ${title}`);
                ++flag;
            }
        }
        if (flag === 0)
            console.log(`Book not found: ${title}`);
        else {
            console.log('Updated data: ', ...this.books);

        }
    },
    getAllBooks: function () {
        const titles = [];


        console.log('All books in the Library are:\n ');
        for (let i = 0; i < this.books.length; i++) {
            console.log(this.books[i].title)
        }


    }
};


console.log(bookLibrary.books);

// (6) [{…}, {…}, {…}, {…}, {…}, {…}]
// 0
// : 
// {title: 'Rich Dad Poor Dad', author: 'Robert Kiyosaki and Sharon Lechter', yearPublished: 1997}
// 1
// : 
// {title: 'To Kill a Mockingbird', author: 'Harper Lee', yearPublished: 1960}
// 2
// : 
// {title: 'A Passage to India', author: 'E.M. Forster', yearPublished: 1924}
// 3
// : 
// {title: 'The Worst Journey in the World', author: 'Apsley Cherry-Garrard', yearPublished: 1922}
// 4
// : 
// {title: 'Harry Potter and the Sorcerer', author: 'J. K. Rowling', yearPublished: 1997}
// 5
// : 
// {title: 'The Running Grave', author: 'J. K. Rowling', yearPublished: 2023}
// length
// : 
// 6
// [[Prototype]]
// : 
// Array(0)

bookLibrary.addBook({ title: "The Running Grave", author: "J. K. Rowling", yearPublished: 2023 });

// Book Added: 
// Book Name: The Running Grave
// Book's Author: J. K. Rowling
// Year of Publish: 2023

bookLibrary.getBooksByAuthor('J. K. Rowling');

// Books by J. K. Rowling: 
// {title: 'Harry Potter and the Sorcerer', author: 'J. K. Rowling', yearPublished: 1997} 
// {title: 'The Running Grave', author: 'J. K. Rowling', yearPublished: 2023}

bookLibrary.removeBook('Adventures of Huckleberry Finn')

// Successfully removed: Adventures of Huckleberry Finn 
// Updated data:  
// {title: 'Rich Dad Poor Dad', author: 'Robert Kiyosaki and Sharon Lechter', yearPublished: 1997} 
// {title: 'To Kill a Mockingbird', author: 'Harper Lee', yearPublished: 1960} 
// {title: 'A Passage to India', author: 'E.M. Forster', yearPublished: 1924} 
// {title: 'The Worst Journey in the World', author: 'Apsley Cherry-Garrard', yearPublished: 1922} 
// {title: 'Harry Potter and the Sorcerer', author: 'J. K. Rowling', yearPublished: 1997} 
// {title: 'The Running Grave', author: 'J. K. Rowling', yearPublished: 2023}

bookLibrary.getAllBooks();

// All books in the Library are:

//  Rich Dad Poor Dad
//  To Kill a Mockingbird
//  A Passage to India
//  The Worst Journey in the World
//  Harry Potter and the Sorcerer
//  The Running Grave
