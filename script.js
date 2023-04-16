let myLibrary = [];


function Book(title, author, num_pages, read) {
    this.title = title;
    this.author = author;
    this.num_pages = num_pages;
    this.read = read;
    // this.printData = () => {
    //     console.log(this.title);
    // };
}

Book.prototype.printData = function () {
    console.log(this.title, this.author, this.num_pages, this.read);
};

function addBookToLibrary(book, library) {
    library.push(book);
}

function displayLibrary(library) {
    const tableBody = document.querySelector("tbody");
    for (let book of library) {
        const tableRow = document.createElement("tr");
        tableBody.appendChild(tableRow);

        let dataList = Object.values(book);

        for (let data of dataList) {
            const tableData = document.createElement("td");
            tableData.textContent = data;
            tableRow.appendChild(tableData);
        }
    }
}


// const title = window.prompt("Enter Title");
// const author = window.prompt("Enter Author");
// const num_pages = window.prompt("Enter Number of Pages");
// const read = window.prompt("Enter Whether read or not");

const book1 = new Book("hi", "hello", "tis", '232');
const book2 = new Book("ps", "sdf", "fsfd", "sfdfsd");
const book3 = new Book("ps", "sdf", "fsfd", "sfdfsd");


addBookToLibrary(book1, myLibrary);
addBookToLibrary(book2, myLibrary);
addBookToLibrary(book3, myLibrary);

// const user_book = new Book(title, author, num_pages, read);

// addBookToLibrary(user_book, myLibrary);
displayLibrary(myLibrary);
// console.log(myLibrary);
