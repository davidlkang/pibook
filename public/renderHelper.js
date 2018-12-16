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
      children: [createElement('div', {
        className: "card-content",
        children: [
          createElement('h4', {innerHTML: props.title}),
          createElement('p', {innerHTML: props.description}),
          createElement('p', {innerHTML: props.recipe}),
        ]
      })]
    })
  )
}
