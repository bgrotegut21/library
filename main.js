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
let hasBookRead = document.querySelector(".hasRead");

let books = [];
let editMode = false;
let bookHasBeenRead = false;

function Book(title,author,description,totalPages,bookRead){
    this.title = title;
    this.author = author;
    this.deleteBook = false;

    this.description = description;
    this.totalPages = totalPages;
    this.bookRead = bookRead;
    this.elements;
    this.readElement;
    this.trash;
    this.edit;

    this.titleElement;
    this.authorElement;
    this.descriptionElement;
    this.pageElement;
}

Book.prototype.addElements = function(elements,readElement,trash,edit){
    this.elements = elements;
    this.readElement = readElement;
    this.trash = trash;
    this.edit = edit;
    this.addKeyEvents(readElement,trash,edit)
}

Book.prototype.addTextElements = function(titleElement, authorELement,descriptionElement, pageElement){
    this.titleElement = titleElement;
    this.authorElement = authorELement;
    this.descriptionElement = descriptionElement;
    this.pageElement = pageElement;
}

Book.prototype.addKeyEvents = function (readElement,trash,edit){
    readElement.addEventListener("click", () => {this.checkBookRead()});
    trash.addEventListener("click", () => {this.trashBook()});
    edit.addEventListener("click", () => {this.editBook()});
}

Book.prototype.trashBook = function (){
    this.elements.remove();
    this.deleteBook = true;
    deleteBook();
}

Book.prototype.editBook = function () {
    console.log("editity")
    editMode = true;
    this.checkEditor()
    envokeEditor();
}





Book.prototype.checkEditor = function () {
    titleText.value = this.title;
    authorText.value  = this.author.replace("by","");
    descriptionText.value = this.description;

    pagesText.value = this.totalPages.match(/\d+/)[0];
    assignBookRead(this.bookRead)


    

}

Book.prototype.checkBookRead = function(){
    if (this.bookRead){
        this.bookRead = false;
        console.log(this.readElement, "read Element")
        this.readElement.setAttribute("src", "images/redFalse.svg")
    } else {
        this.bookRead = true;
        this.readElement.setAttribute("src","images/redTrue.svg")
    }
}


function assignBookRead (bookisRead){
    if(bookisRead) hasBookRead.setAttribute("src","images/redTrue.svg");
    else hasBookRead.setAttribute("src", "images/redFalse.svg")
    bookHasBeenRead = bookisRead;
}

function resetValues(){
    titleText.value = "";
    descriptionText.value = "";
    pagesText.value = "";
    authorText.value ="";


}

function deleteBook(){
    let tempBooks = books;
    books = [];    
    tempBooks.map(book => {
        if (!book.deleteBook) books.push(book); 

    })
}



function envokeEditor (){
    darkenPage.style.display = "block";
    addShelf.style.display = "block";
    bookHasBeenRead = false;
    bookRead.src = "images/redFalse.svg"

}


addBook.addEventListener("click", () => {
    darkenPage.style.display = "block";
    addShelf.style.display = "block";
    bookHasBeenRead = false;
    bookRead.src = "images/redFalse.svg"
    resetValues();
})

function exitPage(){
    darkenPage.style.display = "none";
    addShelf.style.display = "none";

    
}

exit.addEventListener("click", () => {
    exitPage();

})

bookRead.addEventListener("click", () => {
    if (bookHasBeenRead) {
        bookHasBeenRead = false;
        bookRead.setAttribute("src","images/redFalse.svg");
    } else {
        bookHasBeenRead = true;
        bookRead.setAttribute("src","images/redTrue.svg")
    }
})

function readElementEvent(book){
    if (book.readElement){
        book.bookRead = false;
        book.readElement.setAttribute("src","images/redFalse.svg");
    } else {
        book.bookRead = true;
        book.readElement.setAttribute("src", "images/redTrue.svg"); 
    }
}



doneButton.addEventListener("click", () => {
    let titleValue = titleText.value;
    let authorValue = authorText.value;
    let descriptionValue = descriptionText.value;
    let pagesValue = pagesText.value;

    if (authorValue.length != 0) authorValue = `by ${authorValue}`
    else authorValue = "by Author ";

    if (titleValue.length ==0) titleValue = "Title"


    if (String(pagesValue).length == 0) pagesValue = "0 total pages";
    else pagesValue = `${pageValue} total pages`
    let book = new Book(titleValue, authorValue, descriptionValue, pagesValue,bookHasBeenRead);
    createNewBook(book, bookHasBeenRead)
    books.push(book);
    exitPage()
})




function organizeBook (bookDiv,toolHolder, bookTools, deleteBook, editBook, textHolder
    ,bookTools, deleteBook, editBook, textHolder, bookTitle, author, bookDescription, bookStatsHolder, bookStats, totalPages, hasRead){
        bookShelf.appendChild(bookDiv);
        bookDiv.appendChild(toolHolder);
        bookDiv.appendChild(textHolder);
        bookDiv.appendChild(bookStatsHolder)

        toolHolder.appendChild(bookTools);
        bookTools.appendChild(deleteBook);
        bookTools.appendChild(editBook);
        
        textHolder.appendChild(bookTitle);
        textHolder.appendChild(author);
        textHolder.appendChild(bookDescription);

        bookStatsHolder.appendChild(bookStats);
        bookStats.appendChild(totalPages);
        bookStats.appendChild(hasRead);

    }




function createNewBook (book,bookRead){
    let bookDiv = document.createElement("div");
    bookDiv.setAttribute("class","book");

    let toolHolder = document.createElement("div");
    toolHolder.setAttribute("class", "toolHolder");

    let bookTools = document.createElement("div");
    bookTools.setAttribute("class", "bookTools");

    let deleteBook = document.createElement("img");
    deleteBook.setAttribute("class", "deleteBook");
    deleteBook.setAttribute("src","images/delete.svg");
    deleteBook.setAttribute("alt", "delete image");

    let editBook = document.createElement("img");
    editBook.setAttribute("class", "editBook");
    editBook.setAttribute("src","images/edit.svg")
    editBook.setAttribute("alt", "edit image")

    let textHolder = document.createElement("div");
    textHolder.setAttribute("class", "textHolder");

    let bookTitle = document.createElement("h2");
    bookTitle.setAttribute("class", "bookTitle");
    console.log(book.title, "current book title")
    bookTitle.textContent = book.title;

    let author = document.createElement("h3");
    author.setAttribute("class", "author");
    
    author.textContent = book.author;

    let bookDescription = document.createElement("p");
    bookDescription.setAttribute("class", "bookDescription");
    bookDescription.textContent = book.description;

    let bookStatsHolder = document.createElement("div");
    bookStatsHolder.setAttribute("class", "bookStatsHolder");
    
    let bookStats = document.createElement("div");
    bookStats.setAttribute("class", "bookStats");

    let totalPages = document.createElement("h3");
    totalPages.setAttribute("class", "totalPages");
    totalPages.textContent = book.totalPages;

    let hasRead = document.createElement("img");
    hasRead.setAttribute("class", "hasRead");
    if(bookRead) {
        hasRead.setAttribute("src","images/redTrue.svg");
    } else {
        hasRead.setAttribute("src","images/redFalse.svg")
    }
    hasRead.setAttribute("width","30px");
    hasRead.setAttribute("height","30")

    
    organizeBook(bookDiv,toolHolder,bookTools,deleteBook,editBook,textHolder,bookTools, deleteBook, editBook, textHolder, bookTitle, author, bookDescription, bookStatsHolder, bookStats, totalPages, hasRead,)
    book.addElements(bookDiv,hasRead,deleteBook,editBook)
    book.addTextElements(bookTitle,author.bookDescription,totalPages)
    console.log(book)

}