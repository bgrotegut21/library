const main = () => {
  let darkenPage = document.querySelector('.darkenPage');
  let addShelf = document.querySelector('.addShelf');
  let bookShelf = document.querySelector('.bookShelf');
  let titleText = document.querySelector('.titleText');
  let authorText = document.querySelector('.authorText');
  let descriptionText = document.querySelector('.descriptionText');
  let pagesText = document.querySelector('.pagesText');
  let doneButton = document.querySelector('.doneButton');
  let bookRead = document.querySelector('.bookRead');
  let addBook = document.querySelector('.addBook');
  let exit = document.querySelector('.exit');
  let hasBookRead = document.querySelector('.hasRead');
  let errorMessage = document.querySelector('.errorMessage');

  const texts = [
    {
      title: 'author',
      element: authorText,
      holder: document.querySelector('.authorTextHolder'),
      isValid: true,
    },
    {
      title: 'description',
      element: descriptionText,
      holder: document.querySelector('.descriptionTextHolder'),
      isValid: true,
    },
    {
      title: 'title',
      element: titleText,
      holder: document.querySelector('.titleTextHolder'),
      isValid: true,
    },
    {
      title: 'totalPages',
      element: pagesText,
      holder: document.querySelector('.textPageHolder'),
      isValid: true,
    },
  ];

  const errors = {
    authorErrorMessage: {
      element: document.querySelector('.authorErrorMessage'),
      message: 'Author text cannot be longer than 22 characters',
    },
    titleErrorMessage: {
      element: document.querySelector('.titleErrorMessage'),
      message: 'Title text cannot be longer than 26 characters',
    },
    descriptionErrorMessage: {
      element: document.querySelector('.descriptionErrorMessage'),
      message: 'Description text cannot be longer than 390 characters',
    },
    totalPagesErrorMessage: {
      element: document.querySelector('.totalPagesErrorMessage'),
      message: 'Total pages must be greater than or equal to 0',
      message2: 'Total pages must be equal or less to 999,999',
    },
  };

  let books = [];
  let editBook = {
    editMode: false,
    book: '',
  };
  let bookHasBeenRead = false;

  class Book {
    constructor(title, author, description, totalPages, bookRead) {
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
      this.inValid = false;
    }

    addElements(elements, readElement, trash, edit) {
      this.elements = elements;
      this.readElement = readElement;
      this.trash = trash;
      this.edit = edit;
      this.addKeyEvents(readElement, trash, edit);
    }

    addTextElements(
      titleElement,
      authorElement,
      descriptionElement,
      pageElement
    ) {
      this.titleElement = titleElement;
      this.authorElement = authorElement;
      this.descriptionElement = descriptionElement;
      this.pageElement = pageElement;
    }

    addKeyEvents(readElement, trash, edit) {
      readElement.addEventListener('click', () => {
        this.checkBookRead();
      });
      trash.addEventListener('click', () => {
        this.trashBook();
      });
      edit.addEventListener('click', () => {
        this.editBook();
      });
    }

    trashBook() {
      this.elements.remove();
      this.deleteBook = true;
      deleteBook();
    }

    editBook() {
      editBook.editMode = true;
      editBook.book = this;
      this.checkEditor();
      envokeEditor();
    }

    updateValues(title, author, description, pagesValue, bookRead) {
      this.title = title;
      this.author = author;
      this.description = description;
      this.totalPages = pagesValue;
      this.bookRead = bookRead;
    }

    updateText() {
      this.titleElement.textContent = this.title;
      this.authorElement.textContent = this.author;
      this.descriptionElement.textContent = this.description;
      this.pageElement.textContent = this.totalPages;
      this.updateBookRead();
    }

    checkEditor() {
      titleText.value = this.title;
      authorText.value = this.author.replace('by', '').trim();
      descriptionText.value = this.description;
      pagesText.value = this.totalPages.match(/\d+/)[0];
      assignBookRead(this.bookRead);
    }

    updateBookRead() {
      if (this.bookRead)
        this.readElement.setAttribute('src', 'images/redTrue.svg');
      else this.readElement.setAttribute('src', 'images/redFalse.svg');
    }

    checkBookRead() {
      if (this.bookRead) {
        this.bookRead = false;
        this.readElement.setAttribute('src', 'images/redFalse.svg');
      } else {
        this.bookRead = true;
        this.readElement.setAttribute('src', 'images/redTrue.svg');
      }
    }
  }

  function assignBookRead(bookisRead) {
    if (bookisRead) bookRead.setAttribute('src', 'images/redTrue.svg');
    else bookRead.setAttribute('src', 'images/redFalse.svg');
    bookHasBeenRead = bookisRead;
  }

  function resetValues() {
    titleText.value = '';
    descriptionText.value = '';
    pagesText.value = '';
    authorText.value = '';
  }

  function deleteBook() {
    let tempBooks = books;
    books = [];
    tempBooks.map((book) => {
      if (!book.deleteBook) books.push(book);
    });
    storeData(books);
  }

  function envokeEditor() {
    darkenPage.style.display = 'block';
    addShelf.style.display = 'block';
  }

  addBook.addEventListener('click', () => {
    darkenPage.style.display = 'block';
    addShelf.style.display = 'block';
    bookHasBeenRead = false;
    bookRead.src = 'images/redFalse.svg';
    resetValues();
  });

  function removeErrors() {
    texts.forEach((item) => {
      item.isValid = true;
      item.holder.classList.remove('invalidHolder');
    });

    const errorKeys = Object.keys(errors);
    console.log(errorKeys, 'the error keys');

    errorKeys.forEach((key) => {
      const error = errors[key];
      error.element.textContent = '';
    });
  }

  function exitPage() {
    darkenPage.style.display = 'none';
    addShelf.style.display = 'none';
  }

  exit.addEventListener('click', () => {
    exitPage();
    removeErrors();
  });

  function checkWordLength(title, author, description) {
    if (title.length > 26) return { bool: true, text: 'title', length: '26' };
    if (author.length > 22) return { bool: true, text: 'author', length: '22' };
    if (description.length > 390)
      return { bool: true, text: 'descripton', length: '390' };
    return { bool: false };
  }

  function readElementEvent(book) {
    if (book.readElement) {
      book.bookRead = false;
      book.readElement.setAttribute('src', 'images/redFalse.svg');
    } else {
      book.bookRead = true;
      book.readElement.setAttribute('src', 'images/redTrue.svg');
    }
  }

  bookRead.addEventListener('click', () => {
    if (bookHasBeenRead) {
      bookHasBeenRead = false;
      bookRead.setAttribute('src', 'images/redFalse.svg');
    } else {
      bookHasBeenRead = true;
      bookRead.setAttribute('src', 'images/redTrue.svg');
    }
  });

  function editBookContents(
    book,
    titleValue,
    authorValue,
    decriptionValue,
    pagesValue,
    bookHasBeenRead
  ) {
    book.updateValues(
      titleValue,
      authorValue,
      decriptionValue,
      pagesValue,
      bookHasBeenRead
    );
    book.updateText();
    editBook.editMode = false;
    editBook.book = '';
  }

  function checkShortLength(textValue) {
    console.log(textValue, 'the current text value');
    if (textValue.length > 0) {
      return false;
    } else {
      return true;
    }
  }

  function checkLongLength(item) {
    const maxlength = item.element.getAttribute('maxlength');
    let maxlengthNumber = Number(maxlength);

    if (item.element.value.length > maxlengthNumber) {
      return true;
    } else {
      return false;
    }
  }

  function checkBookError(item) {
    console.log(item.title + 'ErrorMessage', 'item title error message');

    const errorElement = errors[item.title + 'ErrorMessage'];

    console.log(errorElement, 'the error element');

    if (item.element.validity.rangeUnderflow) {
      errorElement.element.textContent = errorElement.message;

      item.holder.classList.add('invalidHolder');
      item.isValid = false;
    } else if (item.element.validity.rangeOverflow) {
      console.log(errorElement, 'the errror element');
      errorElement.element.textContent = errorElement.message2;

      item.holder.classList.add('invalidHolder');
      item.isValid = false;
    } else if (item.title != 'totalPages' && checkLongLength(item)) {
      errorElement.element.textContent = errorElement.message;
      item.holder.classList.add('invalidHolder');
      item.isValid = false;
    } else if (
      item.title != 'totalPages' &&
      checkShortLength(item.element.value)
    ) {
      errorElement.element.textContent = 'Input must be filled out';

      item.holder.classList.add('invalidHolder');
      item.isValid = false;
    } else if (!item.element.validity.valid) {
      errorElement.element.textContent = 'Input not valid';

      item.holder.classList.add('invalidHolder');
      item.isValid = false;
    } else {
      errorElement.element.textContent = '';
      item.holder.classList.remove('invalidHolder');
      item.isValid = true;
    }
  }

  function validateAllInputs() {
    texts.forEach((item) => {
      checkBookError(item);
    });
  }

  function checkInputValidation() {
    let isVerfied = true;
    texts.forEach((item) => {
      if (!item.isValid) {
        isVerfied = false;
        return;
      }
    });

    return isVerfied;
  }

  function validBook(event) {
    let currentItem;

    texts.forEach((item) => {
      if (item.element.className === event.target.className) {
        currentItem = item;
        return;
      }
    });
    checkBookError(currentItem);
  }

  function addValidBindings() {
    texts.forEach((item) => {
      item.element.addEventListener('input', validBook);
    });
  }

  doneButton.addEventListener('click', (event) => {
    event.preventDefault();

    const titleValue = titleText.value;
    const authorValue = 'by ' + authorText.value;
    const descriptionValue = descriptionText.value;
    const pagesValue = pagesText.value + ' total pages';

    validateAllInputs();

    if (checkInputValidation()) {
      if (editBook.editMode) {
        editBookContents(
          editBook.book,
          titleValue,
          authorValue,
          descriptionValue,
          pagesValue,
          bookHasBeenRead
        );
      } else {
        let book = new Book(
          titleValue,
          authorValue,
          descriptionValue,
          pagesValue,
          bookHasBeenRead
        );
        createNewBook(book, bookHasBeenRead);
        books.push(book);
      }
      exitPage();
    }
    storeData(books);
  });

  window.addEventListener('load', () => {
    retrieveData();
  });

  function storeData(group) {
    let storageGroup = [];
    let bookObject = {};

    group.forEach((book) => {
      bookObject.title = book.title;
      bookObject.author = book.author;
      bookObject.description = book.description;
      bookObject.totalPages = book.totalPages;
      bookObject.bookRead = book.bookRead;
      storageGroup.push(bookObject);
      bookObject = {};
    });
    addData(storageGroup);
  }

  function retrieveData() {
    let bookJsonObjects = localStorage.getItem('bookGroup');
    let bookObjects = JSON.parse(bookJsonObjects);
    bookObjects.map((book) => {
      let newBook = new Book(
        book.title,
        book.author,
        book.description,
        book.totalPages,
        book.bookRead
      );
      createNewBook(newBook, book.bookRead);
      books.push(newBook);
    });
  }

  function addData(storageGroup) {
    if (typeof Storage !== 'undefined') {
      localStorage.setItem('bookGroup', JSON.stringify(storageGroup));
    } else {
      return;
    }
  }

  function organizeBook(
    bookDiv,
    toolHolder,
    bookTools,
    deleteBook,
    editBook,
    textHolder,
    bookTools,
    deleteBook,
    editBook,
    textHolder,
    bookTitle,
    author,
    bookDescription,
    bookStatsHolder,
    bookStats,
    totalPages,
    hasRead
  ) {
    bookShelf.appendChild(bookDiv);
    bookDiv.appendChild(toolHolder);
    bookDiv.appendChild(textHolder);
    bookDiv.appendChild(bookStatsHolder);

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

  function createNewBook(book, bookRead) {
    let bookDiv = document.createElement('div');
    bookDiv.setAttribute('class', 'book');

    let toolHolder = document.createElement('div');
    toolHolder.setAttribute('class', 'toolHolder');

    let bookTools = document.createElement('div');
    bookTools.setAttribute('class', 'bookTools');

    let deleteBook = document.createElement('img');
    deleteBook.setAttribute('class', 'deleteBook');
    deleteBook.setAttribute('src', 'images/delete.svg');
    deleteBook.setAttribute('alt', 'delete image');

    let editBook = document.createElement('img');
    editBook.setAttribute('class', 'editBook');
    editBook.setAttribute('src', 'images/edit.svg');
    editBook.setAttribute('alt', 'edit image');

    let textHolder = document.createElement('div');
    textHolder.setAttribute('class', 'textHolder');

    let bookTitle = document.createElement('h2');
    bookTitle.setAttribute('class', 'bookTitle');
    bookTitle.textContent = book.title;

    let author = document.createElement('h3');
    author.setAttribute('class', 'author');

    author.textContent = book.author;

    let bookDescription = document.createElement('p');
    bookDescription.setAttribute('class', 'bookDescription');
    bookDescription.textContent = book.description;

    let bookStatsHolder = document.createElement('div');
    bookStatsHolder.setAttribute('class', 'bookStatsHolder');

    let bookStats = document.createElement('div');
    bookStats.setAttribute('class', 'bookStats');

    let totalPages = document.createElement('h3');
    totalPages.setAttribute('class', 'totalPages');
    totalPages.textContent = book.totalPages;

    let hasRead = document.createElement('img');
    hasRead.setAttribute('class', 'hasRead');
    if (bookRead) {
      hasRead.setAttribute('src', 'images/redTrue.svg');
    } else {
      hasRead.setAttribute('src', 'images/redFalse.svg');
    }
    hasRead.setAttribute('width', '30px');
    hasRead.setAttribute('height', '30');

    organizeBook(
      bookDiv,
      toolHolder,
      bookTools,
      deleteBook,
      editBook,
      textHolder,
      bookTools,
      deleteBook,
      editBook,
      textHolder,
      bookTitle,
      author,
      bookDescription,
      bookStatsHolder,
      bookStats,
      totalPages,
      hasRead
    );
    book.addElements(bookDiv, hasRead, deleteBook, editBook);
    book.addTextElements(bookTitle, author, bookDescription, totalPages);
  }

  addValidBindings();
};

main();
