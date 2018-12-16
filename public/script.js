window.onload = function(){

  addAddButton()
  loadList().then( () => {

      const submitButton = document.getElementById("submit-button")
      const addButton = document.getElementById("add-button")
      addButton.onclick = addForm
      const clearButton = document.getElementById("clearButton")
      clearButton.onclick = clearList
  })
}

function addAddButton() {
  const form = document.getElementById("form")
  while (form.firstChild) {
    form.removeChild(form.firstChild)
  }
  form.appendChild(buildAddButton({onClick: addForm}))
}

function addForm() {
  const form = document.getElementById("form")
  while (form.firstChild) {
    form.removeChild(form.firstChild)
  }
  form.appendChild(buildForm({onSubmit: onFormSubmit, onCancel: addAddButton}))
}

function onFormSubmit() {
  const titleInput = document.getElementById("title-input")
  const descriptionInput = document.getElementById("description-input")
  const recipeInput = document.getElementById("recipe-input")
  const payload = {
    title: titleInput.value,
    description: descriptionInput.value,
    recipe: recipeInput.value,
  }

  if (!payload.title || !payload.description || !payload.recipe) {
    return
  }

  fetch("/todos", {
    body: JSON.stringify(payload),
    method: "POST",
  }).then( () => {
    titleInput.value = ""
    descriptionInput.value = ""
    recipeInput.value = ""
    loadList()
  })
}

function loadList() {
  return fetch("/todos").then(
    response => response.json()
  ).then(
    payload => {
      items = payload
      const list = document.getElementById("list")
      while (list.firstChild) {
        list.removeChild(list.firstChild)
      }
      items.forEach(element => {
        list.appendChild(buildItem(element))
      });
    }
  )
}

function clearList() {
  fetch("/todos", {
    body: JSON.stringify([]),
    method: "POST",
  }).then( () => {
    loadList()
  })
}
