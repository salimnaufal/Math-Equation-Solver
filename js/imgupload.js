//display uploaded image in screen
const file = document.querySelector("#file")

file.addEventListener("change", function() {

  const reader = new FileReader()

  reader.addEventListener("load", () => {
    document.querySelector("#image").src = reader.result
  })

  reader.readAsDataURL(this.files[0])

})


//handle the form submission and send the image to the server
document.querySelector('form').addEventListener('submit', (event) => {
  event.preventDefault();

  const formData = new FormData(event.target);

  fetch('/upload', {
    method: 'POST',
    body: formData
  }).then((response) => {
    // handle the response
  });
});