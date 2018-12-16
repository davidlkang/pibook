function createElement(tagName, {children = [], ...props}){
  const element = document.createElement(tagName)
  Object.entries(props).forEach(([key, value]) => {
    element[key] = value
  });
  children.forEach(child=>{
    element.appendChild(child)
  })

  return element
}

function buildItem(props){
  return (
    createElement('div', {
      className: "card",
      children: [
        createElement('div', {
          className: "card-content",
          children: [
            createElement('div', {
              className: "item-flexcontainer",
              children: [
                createElement('div', {
                  className: "item-flexitem",
                  children:[
                    createElement('h4', {innerHTML: props.title, className: "whitespace"}),
                    createElement('p', {innerHTML: props.description, className: "whitespace"}),
                    createElement('p', {innerHTML: props.recipe, className: "whitespace"}),
                  ]
                }),
                createElement('div', {
                  className: "item-flexitem",
                  children:[
                    createElement('button', {
                      className: "right btn waves-effect waves-dark red darken-3",
                      innerHTML:"delete",
                      onclick: () => {
                        fetch("/todos/" + props.id, {
                          method: "DELETE",
                        }).then( () => {
                          loadList()
                        })
                      }
                    })
                ]
              })
            ]
        })]
      })]
    })
  )
}

function buildForm({onCancel, onSubmit}){
  return (
    createElement('div', {
      className: "row card",
      children: [
        createElement('div', {
          className: "card-content",
          children: [
            createElement('div', {
              className: "col s6",
              children: [
                buildInput({id: "title-input", label: "Title"}),
                buildInput({id: "description-input", label: "Description"}),
                buildInput({id: "recipe-input", label: "Recipe"}),
                createElement('button', {
                  id: "submit-button",
                  className: "btn waves-effect waves-light",
                  innerHTML: "Submit",
                  onclick: onSubmit,
                }),
                createElement('button', {
                  id: "cancel-button",
                  className: "btn waves-effect waves-light",
                  innerHTML: "Cancel",
                  onclick: onCancel,
                })
              ]
            })
          ]
        })
      ]
    })
  )
}

function buildInput ({id, label}) {
  return (
      createElement('div', {
      className: "input-field",
      children: [
        createElement('textarea', {
          id: id,
          type: "text",
          className: "materialize-textarea"
        }),
        createElement('label', {
          for: "title-input",
          innerHTML: label,
          className: "no-click"
        })
      ]
    })
  )
}

function buildAddButton ({onClick}) {
  return (
    createElement('button', {
      className: "btn waves-effect waves-light",
      innerHTML: "Add",
      onclick: onClick,
    })
  )
}
