document.addEventListener("DOMContentLoaded", function() {
    var canvas = document.getElementById('myCanvas');
    var ctx = canvas.getContext('2d');
    var drawing = false;
    var mousePos = { x: 0, y: 0 };
    var lastPos = mousePos;
  
    resizeCanvas();
  
    window.addEventListener('resize', resizeCanvas);
  
    canvas.addEventListener('mousedown', function(e) {
      drawing = true;
      lastPos = getMousePos(canvas, e);
    }, false);
  
    canvas.addEventListener('mouseup', function() {
      drawing = false;
    }, false);
  
    canvas.addEventListener('mousemove', function(e) {
      mousePos = getMousePos(canvas, e);
    }, false);
  
    canvas.addEventListener('touchstart', function(e) {
      mousePos = getTouchPos(canvas, e);
      var touch = e.touches[0];
      var mouseEvent = new MouseEvent('mousedown', {
        clientX: touch.clientX,
        clientY: touch.clientY
      });
      canvas.dispatchEvent(mouseEvent);
    }, false);
  
    canvas.addEventListener('touchend', function(e) {
      var mouseEvent = new MouseEvent('mouseup', {});
      canvas.dispatchEvent(mouseEvent);
    }, false);
  
    canvas.addEventListener('touchmove', function(e) {
      var touch = e.touches[0];
      var mouseEvent = new MouseEvent('mousemove', {
        clientX: touch.clientX,
        clientY: touch.clientY
      });
      canvas.dispatchEvent(mouseEvent);
    }, false);
  
    canvas.addEventListener('mouseleave', function() {
      drawing = false;
    }, false);
  
    function getMousePos(canvasDom, mouseEvent) {
      var rect = canvasDom.getBoundingClientRect();
      return {
        x: mouseEvent.clientX - rect.left,
        y: mouseEvent.clientY - rect.top
      };
    }
  
    function getTouchPos(canvasDom, touchEvent) {
      var rect = canvasDom.getBoundingClientRect();
      return {
        x: touchEvent.touches[0].clientX - rect.left,
        y: touchEvent.touches[0].clientY - rect.top
      };
    }
  
    function renderCanvas() {
      if (drawing) {
        ctx.moveTo(lastPos.x, lastPos.y);
        ctx.lineTo(mousePos.x, mousePos.y);
        ctx.stroke();
        lastPos = mousePos;
      }
    }
  
    function clearCanvas() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  
    // Allow download
    function downloadCanvas() {
      var link = document.createElement('a');
      link.download = 'signature.png';
      link.href = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
      link.click();
    }
  
    // Event listeners
    canvas.addEventListener('mousemove', renderCanvas, false);
    canvas.addEventListener('mousedown', function() {
      canvas.addEventListener('mousemove', renderCanvas, false);
    }, false);
    canvas.addEventListener('mouseup', function() {
      canvas.removeEventListener('mousemove', renderCanvas, false);
    }, false);
    document.getElementById('clearBtn').addEventListener('click', clearCanvas);
    document.getElementById('downloadBtn').addEventListener('click', downloadCanvas);
  
    function resizeCanvas() {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
    }
  });
  