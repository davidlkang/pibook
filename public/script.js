window.onload = function(){

  loadList().then( () => {

      const submitButton = document.getElementById("submitButton")
      submitButton.onclick = function() {
        const titleInput = document.getElementById("title_input")
        const descriptionInput = document.getElementById("description_input")
        const recipeInput = document.getElementById("recipe_input")
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

      const clearButton = document.getElementById("clearButton")
      clearButton.onclick = clearList
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

function buildItem(text){
  const item = document.createElement("li")
  item.className = ""
  item.innerHTML = text

  return item
}
