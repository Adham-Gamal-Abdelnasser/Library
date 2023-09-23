let nameInput = document.getElementById("nameInput")
let urlInput = document.getElementById("urlInput")
let nameRequired = document.getElementById("nameRequired")
let urlRequired = document.getElementById("urlRequired")
let nameExist = document.getElementById("nameExist")

let library = []

if (localStorage.getItem("books")!=null) {
  library = JSON.parse(localStorage.getItem("books"))
  displayBook()
}

function addBook() {
  let bookData = {
    label: nameInput.value,
    url: urlInput.value
  }
  if (nameInput.value === "" || urlInput.value === "" || checkNameIsExist()!= 0) {
    if (nameInput.value === "") {
      getAlertName()
    }
    if (urlInput.value === "") {
      getAlertUrl()
    }
    if (checkNameIsExist()!= 0) {
      nameExist.classList.replace("d-none","d-block")
    }
  }
  else{
    checkAlertNameExistence(nameRequired)
    checkAlertNameExistence(nameExist)
    checkAlertUrlExistence()
    library.push(bookData)
    localStorage.setItem("books",JSON.stringify(library))
    displayBook()
    clearInputs()
  }
}

function displayBook() {
  let cartona=``
  for (let i = 0; i < library.length; i++) {
    cartona +=`
    <tr>
    <td>${i}</td>
    <td>${library[i].label}</td>
    <td><a class="btn btn-info" target="_blank" href="${library[i].url}">visit</a></td>
    <td><button class="btn btn-danger" onclick="deleteBook(${i})">delete</button></td>
</tr>  `
  }
  document.getElementById("tableBody").innerHTML = cartona
}

function clearInputs() {
  nameInput.value=""
  urlInput.value=""
}

function deleteBook(index) {
  library.splice(index,1)
  localStorage.setItem("books",JSON.stringify(library))
  displayBook()
}

function getAlertName() {
  nameRequired.classList.replace("d-none","d-block") ;     
}
function getAlertUrl() {
  urlRequired.classList.replace("d-none","d-block") ;     
}
function checkAlertNameExistence(nameId) {
  if (nameId.classList.contains("d-block")) {
    nameId.classList.replace("d-block","d-none")
  }
}
function checkAlertUrlExistence() {
  if (urlRequired.classList.contains("d-block")) {
    urlRequired.classList.replace("d-block","d-none")
  }
}
function checkNameIsExist() {
  let res = library.filter(ele=>ele.label == nameInput.value)
  return res.length
}
