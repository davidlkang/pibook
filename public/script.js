let items = []

window.onload = function(){

  loadList().then( () => {

      const submitButton = document.getElementById("submitButton")
      submitButton.onclick = function() {
        const input = document.getElementById("input")
        const payload = items.concat([input.value])

        fetch("/todos", {
          body: JSON.stringify(payload),
          method: "POST",
        }).then( () => {
          input.value = ""
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
        const item = document.createElement("li")
        item.innerHTML = element
        list.appendChild(item)
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
