var visualizeSingleLL = function(canvasDom) {
  var list = new SinglyLinkedList();
  var ctx = canvasDom.getContext('2d');
  var i = 0;

  ctx.font = '30px sans-serif';
  ctx.fillText('Start', 10, 40);

  var addBtn = document.getElementById('ll-add');
  var addRandomBtn = document.getElementById('ll-add-random');

  addBtn.addEventListener('click', function(e) {
    var userData = document.getElementById('ll-add-value').value
    var node = new SinglyLinkedListNode(userData);
    
    list.insert(node);
    ctx.clearRect(0, 50, 500, 450);
    drawList(ctx, list.getStart(), 0);
  });

  addRandomBtn.addEventListener('click', function(e) {
    var node = new SinglyLinkedListNode(Math.floor(Math.random()*100));
    list.insert(node);
    ctx.clearRect(0, 50, 500, 450);
    drawList(ctx, list.getStart(), 0);
  });
};

function drawList(ctx, start, index) {
  var data = start.getData();
  drawNode(ctx, data, index);
  if (start.hasNext()) {
    drawList(ctx, start.next, index+1);
  }
}

function drawNode(ctx, data, index) {
  var numCol = 8;

  // Data Box
  ctx.strokeRect(index % numCol * 60 + 10, Math.floor(index / numCol) * 40 + 60, 20, 20);
  // Next Pointer Box
  ctx.strokeRect(index % numCol * 60 + 30, Math.floor(index / numCol) * 40 + 60, 20, 20);

  // Pointer Dot
  ctx.arc(index % numCol * 60 + 40, Math.floor(index / numCol) * 40 + 70, 4, 0, Math.PI * 2);
  ctx.fill();

  if (index % numCol === numCol - 1) {
    // Pointer Line 
    ctx.beginPath();
    ctx.moveTo(index % numCol * 60 + 40, Math.floor(index / numCol) * 40 + 80);
    ctx.lineTo(index % numCol * 60 + 40, Math.floor(index / numCol) * 40 + 90);
    ctx.lineTo(20, Math.floor(index / numCol) * 40 + 90);
    ctx.lineTo(20, Math.floor(index / numCol) * 40 + 100);
    ctx.stroke();

    // Pointer Triangle
    ctx.beginPath();
    ctx.moveTo(20, Math.floor(index / numCol) * 40 + 100);
    ctx.lineTo(25, Math.floor(index / numCol) * 40 + 95);
    ctx.lineTo(15, Math.floor(index / numCol) * 40 + 95);
    ctx.lineTo(20, Math.floor(index / numCol) * 40 + 100);
    ctx.fill();
  } else {
    // Pointer Line
    ctx.beginPath();
    ctx.moveTo(index % numCol * 60 + 40, Math.floor(index / numCol) * 40 + 70);
    ctx.lineTo(index % numCol * 60 + 70, Math.floor(index / numCol) * 40 + 70);
    ctx.stroke();

    // Pointer Triangle
    ctx.beginPath();
    ctx.moveTo(index % numCol * 60 + 70, Math.floor(index / numCol) * 40 + 70);
    ctx.lineTo(index % numCol * 60 + 65, Math.floor(index / numCol) * 40 + 65);
    ctx.lineTo(index % numCol * 60 + 65, Math.floor(index / numCol) * 40 + 75);
    ctx.lineTo(index % numCol * 60 + 70, Math.floor(index / numCol) * 40 + 70);
    ctx.fill();
  }

  ctx.font = '10px sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(data, index % numCol * 60 + 20, Math.floor(index / numCol) * 40 + 70, 20);
}