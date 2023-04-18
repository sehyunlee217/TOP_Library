let myLibrary = [];

// ----- Declare Book Object ------- 

function Book(title, author, num_pages, read) {
    this.title = title;
    this.author = author;
    this.num_pages = num_pages;
    this.read = read;
}

Book.prototype.printData = function () {
    console.log(this.title, this.author, this.num_pages, this.read);
};

function addBookToLibrary(book, library) {
    // make adjustments in library
    library.push(book);
}

function displayLibrary(library) {
    // select the table in HTML
    const tableBody = document.querySelector("tbody");

    // access data from myLibrary and convert it to td
    for (let book of library) {

        // ------ Add Data to Table -----------

        // add new row to table & link to data to the row
        const tableRow = document.createElement("tr");
        tableBody.appendChild(tableRow);

        tableRow.classList.add("newRow");

        const titleData = document.createElement("td");
        titleData.textContent = book.title;
        tableRow.appendChild(titleData);

        const authorData = document.createElement("td");
        authorData.textContent = book.author;
        tableRow.appendChild(authorData);

        const pageData = document.createElement("td");
        pageData.textContent = book.num_pages;
        tableRow.appendChild(pageData);

        // add status button to the tableRow
        const statusTd = document.createElement("td");
        statusTd.classList.add("statusBtn");
        const statusBtn = document.createElement("button");

        statusTd.appendChild(statusBtn);
        statusBtn.textContent = book.read;
        tableRow.appendChild(statusTd);

        statusTd.setAttribute("data-title", book.title);


        // ------ Status Functionality ----------

        // on click event of status button,
        statusTd.addEventListener("click", (e) => {
            for (let book of myLibrary) {
                if (book["title"] == statusTd.dataset["title"]) {
                    if (book.read == "Read") {
                        book.read = "Not Read";
                    }
                    else {
                        book.read = "Read";
                    }
                }
            }
            clearDisplay();
            displayLibrary(myLibrary);
        });

        // ------ Delete Functionality ----------

        // add delete button to the tableRow 
        const deleteTd = document.createElement("td");

        // create delete button with className = "deleteBtn"
        const deleteBtn = document.createElement("button");
        deleteTd.appendChild(deleteBtn);

        deleteTd.classList.add("deleteBtn");
        deleteBtn.textContent = "Delete";
        // link deleteTd to tableRow
        tableRow.appendChild(deleteTd);


        // link the delete button with data attribute of the title of book
        deleteTd.setAttribute("data-title", book.title);

        // on click event of delete button, 
        deleteBtn.addEventListener("click", (e) => {
            let newLibrary = myLibrary.filter(book => book.title != deleteTd.dataset["title"]);
            myLibrary = newLibrary;
            clearDisplay();
            displayLibrary(myLibrary);
        });
    }
}

function clearDisplay() {
    const tableBody = document.querySelector("tbody");
    const allNewrows = document.querySelectorAll(".newRow");
    for (let row of allNewrows) {
        tableBody.removeChild(row);
    }
}

// ----- When Form is submitted(Main Action) ----- 

const submitForm = document.querySelector("form");

submitForm.addEventListener("submit", event => {

    event.preventDefault();

    const submitTitle = event.target["submitTitle"].value;
    const submitAuthor = event.target["submitAuthor"].value;
    const submitNumpages = event.target["submitPages"].value;
    const submitStatus = event.target["submitStatus"].value;

    let newBook = new Book(submitTitle, submitAuthor, submitNumpages, submitStatus);

    addBookToLibrary(newBook, myLibrary);

    event.target["submitTitle"].value = "";
    event.target["submitAuthor"].value = "";
    event.target["submitPages"].value = "";

    clearDisplay();
    displayLibrary(myLibrary);
});

// const newBook2 = new Book("Title", "Author", 343, "Not Read");
// addBookToLibrary(newBook2, myLibrary);
// displayLibrary(myLibrary);


// ------ Additional Form validation using Constraint Validation API ----

const title = document.getElementById("title");
const author = document.getElementById("author");

title.addEventListener("input", (e) => {
    if (title.validity.tooShort) {
        title.setCustomValidity("Enter more than 3 characters");
    }
    else {
        title.setCustomValidity("");
    }
});

author.addEventListener("input", (e) => {
    if (author.validity.tooShort) {
        author.setCustomValidity("Enter more than 3 characters");
    }
    else {
        author.setCustomValidity("");
    }
});

