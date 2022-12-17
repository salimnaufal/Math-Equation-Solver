// create signature pad
const canvas = document.getElementById('signature-pad');
const context = canvas.getContext('2d');

let strokes = []; // array to store previous strokes

const undoButton = document.getElementById('button-undo');
undoButton.addEventListener('click', function() {
  if (strokes.length > 0) {
    // remove the last stroke from the array
    let lastStroke = strokes.pop();
    // clear the canvas
    context.clearRect(0, 0, canvas.width, canvas.height);
    // redraw all the previous strokes
    strokes.forEach(function(stroke) {
      context.beginPath();
      context.moveTo(stroke[0], stroke[1]);
      context.lineTo(stroke[2], stroke[3]);
      context.stroke();
    });
  }
});

let isDrawing = false;
let lastX = 0;
let lastY = 0;

canvas.addEventListener('mousedown', (event) => {
  isDrawing = true;
  lastX = event.offsetX;
  lastY = event.offsetY;
});

canvas.addEventListener('mousemove', (event) => {
  if (isDrawing) {
    context.beginPath();
    context.moveTo(lastX, lastY);
    context.lineTo(event.offsetX, event.offsetY);
    context.stroke();
    // store the current stroke in the array
    strokes.push([lastX, lastY, event.offsetX, event.offsetY]);
    lastX = event.offsetX;
    lastY = event.offsetY;
  }
});

canvas.addEventListener('mouseup', () => {
  isDrawing = false;
});


//button operations

const clearButton = document.getElementById('button-clear');
clearButton.addEventListener("click", () => {
  context.clearRect(0, 0, canvas.width, canvas.height);
});

const saveButton = document.getElementById('button-save');
saveButton.addEventListener("click", function() {
  var imageData = canvas.toDataURL();
  var link = document.createElement("a");
  link.download = "my-image.png";
  link.href = imageData;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
});