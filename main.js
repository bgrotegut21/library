let darkenPage = document.querySelector(".darkenPage");
let addShelf = document.querySelector(".addShelf");
let bookShelf = document.querySelector(".bookShelf");
let titleText = document.querySelector(".titleText");
let authorText = document.querySelector(".authorText");
let descriptionText = document.querySelector(".descriptionText");
let pagesText = document.querySelector(".pagesText");
let doneButton = document.querySelector(".doneButton");
let bookRead = document.querySelector(".bookRead");
let addBook = document.querySelector(".addBook");
let exit = document.querySelector(".exit");

let books = [];

let bookHasBeenRead = false;

function Book(title,author,description,totalPages,bookRead, element){
    this.title = title;
    this.author = author;
    this.description = description;
    this.totalPages = totalPages;
    this.bookRead = bookRead;

}

addBook.addEventListener("click", () => {
    darkenPage.style.display = "block";
    addShelf.style.display = "block";
    bookHasBeenRead = false;
    bookRead.src = "images/redFalse.svg"

})

exit.addEventListener("click", () => {
    darkenPage.style.display = "none";
    addShelf.style.display = "none";

})

bookRead.addEventListener("click", () => {
    console.log("has read")
    if (!bookHasBeenRead){
        bookHasBeenRead = true;
        bookRead.src = "images/redTrue.svg"
    } else {
        bookHasBeenRead = false;
        bookRead.src = "images/redFalse.svg"
    }
})




doneButton.addEventListener("click", () => {
    let titleValue = titleText.value;
    let authorValue = authorText.value;
    let descriptionValue = descriptionText.value;
    let pagesValue = pagesText.value;
    let book = new Book(titleValue, authorValue, descriptionValue, pagesValue);
    books.push(book);

    

    
})

function createNewBook (book,hasRead){
    let bookDiv = document.createElement("div");
    bookDiv.setAttribute("class","book");

    let toolHolder = document.createElement("div");
    toolHolder.setAttribute("class", "toolHolder");

    let bookTools = document.createElement("div");
    bookTools.setAttribute("class", "bookTools");

    let deleteBook = document.createElement("div");
    deleteBook.setAttribute("class", "deleteBook");

    let editBook = document.createElement("div");
    editBook.setAttribute("class", "editBook");

    let textHolder = document.createElement("div");
    textHolder.setAttribute("class", "textHolder");

    let bookTitle = document.createElement("div");
    bookTitle.setAttribute("class", "bookTitle");
    bookTitle.textContent = book.title;

    let author = document.createElement("div");
    author.setAttribute("class", "author");
    author.textContent = `by ${book.author}`

    let bookDescription = document.createElement("div");
    bookDescription.setAttribute("class", "bookDescription");
    bookDescription.textContent = book.description;

    let bookStatsHolder = document.createElement("div");
    bookStatsHolder.setAttribute("class", "bookStatsHolder");
    
    let bookStats = document.createElement("div");
    bookStats.setAttribute("class", "bookStats");

    let totalPages = document.createElement("div");
    totalPages.setAttribute("class", "totalPages");
    totalPages.textContent = `${book.totalPages} total pages`;




}