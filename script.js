//  ----- Declare Empty Library --------- 
let myLibrary = [];

// ----- Declare Book Object ------- 

function Book(title, author, num_pages, read) {
    this.title = title;
    this.author = author;
    this.num_pages = num_pages;
    this.read = read;
};

// ----- function that changes status of Book ------- 
Book.prototype.changeReadstatus = function () {
    if (this.read == "Read") {
        this.read = "Not Read";
    }
    else {
        this.read = "Read";
    }
};

function addBookToLibrary(book, library) {
    // make adjustments in library
    library.push(book);
}

function displayLibrary(library) {
    clearDisplay();
    // select the table in HTML
    const tableBody = document.querySelector("tbody");
    // access data from myLibrary and convert it to td
    for (let book of library) {
        // ------ Add Data to Table -----------
        // create new row with class="newRow"
        const tableRow = document.createElement("tr");

        tableRow.classList.add("newRow");
        // add new row to table
        tableBody.appendChild(tableRow);

        // add title as a table data to new row
        const titleData = document.createElement("td");
        titleData.textContent = book.title;
        tableRow.appendChild(titleData);
        // add author as a table data to new row
        const authorData = document.createElement("td");
        authorData.textContent = book.author;
        tableRow.appendChild(authorData);
        // add page numbers as a table data to new row
        const pageData = document.createElement("td");
        pageData.textContent = book.num_pages;
        tableRow.appendChild(pageData);

        // add status button to the tableRow
        const statusTd = document.createElement("td");
        statusTd.classList.add("statusBtn");
        const statusBtn = document.createElement("button");
        statusBtn.textContent = book.read;

        // change color of book depending on status of book being read
        if (book.read == "Not Read") {
            statusBtn.setAttribute("class", "red");
        }
        else {  // when book.read == "Read"
            statusBtn.setAttribute("class", "green");
        }

        // Add status button element to the new row
        statusTd.appendChild(statusBtn);
        tableRow.appendChild(statusTd);

        // using data attribute to access myLibrary
        statusTd.setAttribute("data-title", book.title);
        // ------ Status Functionality ----------

        // on click event of status button,
        statusTd.addEventListener("click", function () {
            // change status of book being read
            book.changeReadstatus();
            // display new table with new status of book
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

// ----- remove all table rows from display ------- 

function clearDisplay() {
    const tableBody = document.querySelector("tbody");
    const allNewrows = document.querySelectorAll(".newRow");
    for (let row of allNewrows) {
        tableBody.removeChild(row);
    }
}

// ----- When + button is clicked ------ 

const addBookbtn = document.getElementById("add_book");

// show the form 
addBookbtn.addEventListener("click", () => {
    const form = document.getElementById("submitForm");

    if (form.style.visibility == "hidden") {
        form.style.visibility = "visible";
    }
    else {
        form.style.visibility = "hidden";
    }

});

// ----- form is submitted(Main Action) ----- 

const submitForm = document.querySelector("form");

submitForm.addEventListener("submit", event => {

    event.preventDefault();

    const submitTitle = event.target["submitTitle"].value;
    const submitAuthor = event.target["submitAuthor"].value;
    const submitNumpages = event.target["submitPages"].value;
    const submitStatus = event.target["submitStatus"].value;

    let newBook = new Book(submitTitle, submitAuthor, submitNumpages, submitStatus);

    addBookToLibrary(newBook, myLibrary);

    // clear previous items after pressing submit btn
    event.target["submitTitle"].value = "";
    event.target["submitAuthor"].value = "";
    event.target["submitPages"].value = "";

    displayLibrary(myLibrary);
});

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

