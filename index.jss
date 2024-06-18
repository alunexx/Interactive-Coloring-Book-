document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  const upload = document.getElementById('upload');
  const pencil = document.getElementById('pencil');
  const crayon = document.getElementById('crayon');
  const sketch = document.getElementById('sketch');
  const eraser = document.getElementById('eraser');
  const colorPicker = document.getElementById('color-picker');
  const bucket = document.getElementById('bucket');
  const brushSize = document.getElementById('brush-size');
  const shapeCircle = document.getElementById('shape-circle');
  const clearCanvas = document.getElementById('clear-canvas');
  const save = document.getElementById('save');
  const load = document.getElementById('load');
  const undo = document.getElementById('undo');
  const redo = document.getElementById('redo');
  const zoomIn = document.getElementById('zoom-in');
  const zoomOut = document.getElementById('zoom-out');
  const tutorial = document.getElementById('tutorial');
  const themeSelector = document.getElementById('theme-selector');
  const tutorialModal = document.getElementById('tutorial-modal');

  canvas.width = window.innerWidth * 0.8;
  canvas.height = window.innerHeight * 0.8;

  let drawing = false;
  let tool = 'pencil';
  let color = '#000000';
  let size = 5;
  let startX, startY;
  let currentZoom = 1;

  pencil.addEventListener('click', () => setTool('pencil'));
  crayon.addEventListener('click', () => setTool('crayon'));
  sketch.addEventListener('click', () => setTool('sketch'));
  eraser.addEventListener('click', () => setTool('eraser'));
  bucket.addEventListener('click', () => setTool('bucket'));
  shapeCircle.addEventListener('click', drawCircle);
  clearCanvas.addEventListener('click', clearCanvasContent);
  save.addEventListener('click', saveDrawing);
  load.addEventListener('click', loadDrawing);
  undo.addEventListener('click', undoAction);
  redo.addEventListener('click', redoAction);
  zoomIn.addEventListener('click', () => zoomCanvas(1.1));
  zoomOut.addEventListener('click', () => zoomCanvas(0.9));
  tutorial.addEventListener('click', showTutorial);
  themeSelector.addEventListener('change', changeTheme);
  colorPicker.addEventListener('change', (e) => color = e.target.value);
  brushSize.addEventListener('input', (e) => size = e.target.value);

  canvas.addEventListener('mousedown', startDrawing);
  canvas.addEventListener('mousemove', draw);
  canvas.addEventListener('mouseup', stopDrawing);
  canvas.addEventListener('mouseout', stopDrawing);

  function setTool(selectedTool) {
    tool = selectedTool;
  }

  function startDrawing(e) {
    drawing = true;
    startX = e.offsetX;
    startY = e.offsetY;
    ctx.beginPath();
    ctx.moveTo(startX, startY);
  }

  function draw(e) {
    if (!drawing) return;
    ctx.lineWidth = size;
    ctx.lineCap = 'round';
    ctx.strokeStyle = (tool === 'eraser') ? '#ffffff' : color;

    if (tool === 'pencil' || tool === 'crayon' || tool === 'sketch') {
      ctx.lineTo(e.offsetX, e.offsetY);
      ctx.stroke();
    }
  }

  function stopDrawing() {
    drawing = false;
    ctx.closePath();
  }

  function drawCircle() {
    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2, 50, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.closePath();
  }

  function clearCanvasContent() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  function saveDrawing() {
    const dataURL = canvas.toDataURL();
    localStorage.setItem('savedDrawing', dataURL);
    alert('Drawing saved!');
  }

  function loadDrawing() {
    const dataURL = localStorage.getItem('savedDrawing');
    if (dataURL) {
      const img = new Image();
      img.src = dataURL;
      img.onload = () => ctx.drawImage(img, 0, 0);
      alert('Drawing loaded!');
    } else {
      alert('No saved drawing found.');
    }
  }

  function zoomCanvas(factor) {
    currentZoom *= factor;
    ctx.setTransform(currentZoom, 0, 0, currentZoom, 0, 0);
    redrawCanvas();
  }

  function showTutorial() {
    tutorialModal.style.display = 'block';
  }

  function changeTheme(e) {
    const theme = e.target.value;
    document.body.className = theme;
  }

  function redrawCanvas() {
    // Redraw all saved elements
    loadDrawing();
  }

  window.onclick = function(event) {
    if (event.target == tutorialModal) {
      tutorialModal.style.display = 'none';
    }
  }
});
