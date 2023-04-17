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
    console.log(tableBody);
    // if the second child of tableBody is not empty, 
    // dump everything starting from secondchild.

    // Or create function that would just display 
    // last child of tableBody 

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

const book1 = new Book("Harry Potter", "J.K Rolling", "1932", "Yes");
const book2 = new Book("To Kill a Mockingbird", "Harper Lee", "302", "Yes");
const book3 = new Book("The Fellowship of the Ring", "J.R.R. Tolkien", "1222", "No");


// addBookToLibrary(book1, myLibrary);
// addBookToLibrary(book2, myLibrary);
// addBookToLibrary(book3, myLibrary);

// displayLibrary(myLibrary);

const submitForm = document.querySelector("form");

submitForm.addEventListener("submit", event => {
    event.preventDefault();

    const submitTitle = event.target["submitTitle"].value;
    const submitAuthor = event.target["submitAuthor"].value;
    const submitNumpages = event.target["submitPages"].value;
    const submitStatus = event.target["submitStatus"].value;

    let newBook = new Book(submitTitle, submitAuthor, submitNumpages, submitStatus);

    addBookToLibrary(newBook, myLibrary);

    // console.log(newBook);
    displayLibrary(myLibrary);
    // console.log(myLibrary);
});
