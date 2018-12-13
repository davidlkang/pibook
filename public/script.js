window.onload = function(){
  const button = document.getElementById("button")
  button.onclick = function(){
    const input = document.getElementById("input")
    const payload = {
      ingredient: input.value,
    }

    fetch("http://raspy:3000", {
      body: JSON.stringify(payload),
      method: "POST",
    })
  }
}

