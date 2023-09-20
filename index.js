let nameInput = document.getElementById("nameInput")
let urlInput = document.getElementById("urlInput")

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
  library.push(bookData)
  localStorage.setItem("books",JSON.stringify(library))
  displayBook()
  clearInputs()
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