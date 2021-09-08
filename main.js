let darkenPage = document.querySelector(".darkenPage");
let addShelf = document.querySelector(".addShelf");
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

function Book(title,author,description,totalPages,bookRead){
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


    
})