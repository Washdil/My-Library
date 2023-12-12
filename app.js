const myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(title, author, pages, read) {
    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
    displayLibrary();
}

function displayLibrary() {
    const libraryContainer = document.getElementById('library-container');
    libraryContainer.innerHTML = ''; // Clear previous content

    const table = document.createElement('table');
    const headerRow = table.insertRow(0);

    // Create table headers
    const headers = ['Title', 'Author', 'Pages', 'Read', 'Actions'];
    headers.forEach(headerText => {
        const th = document.createElement('th');
        th.textContent = headerText;
        headerRow.appendChild(th);
    });

    // Create table rows
    myLibrary.forEach((book, index) => {
        const row = table.insertRow(-1);
        row.insertCell(0).textContent = book.title;
        row.insertCell(1).textContent = book.author;
        row.insertCell(2).textContent = book.pages;
        row.insertCell(3).textContent = book.read ? 'Yes' : 'No';

        // Add buttons for actions
        const actionsCell = row.insertCell(4);
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.addEventListener('click', () => removeBook(index));
        actionsCell.appendChild(removeBtn);

        const toggleReadBtn = document.createElement('button');
        toggleReadBtn.textContent = 'Toggle Read';
        toggleReadBtn.addEventListener('click', () => toggleReadStatus(index));
        actionsCell.appendChild(toggleReadBtn);
    });

    libraryContainer.appendChild(table);
}

function removeBook(index) {
    myLibrary.splice(index, 1);
    displayLibrary();
}

function toggleReadStatus(index) {
    myLibrary[index].read = !myLibrary[index].read;
    displayLibrary();
}

// Event listeners
document.getElementById('new-book-btn').addEventListener('click', toggleFormVisibility);

const bookForm = document.getElementById('book-form');
bookForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const read = document.getElementById('read').checked;
    addBookToLibrary(title, author, pages, read);
    toggleFormVisibility();
    resetForm();
});

function toggleFormVisibility() {
    const formContainer = document.getElementById('form-container');
    formContainer.classList.toggle('hidden');
}

function resetForm() {
    bookForm.reset();
}
