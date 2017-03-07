var visualizeSingleLL = function(canvasDom) {
  var list = new SinglyLinkedList();
  var ctx = canvasDom.getContext('2d');
  var i = 0;

  ctx.font = '30px sans-serif';
  ctx.fillText('Start', 10, 40);

  var addBtn = document.getElementById('ll-add');
  var rmBtn = document.getElementById('ll-rm');
  var findBtn = document.getElementById('ll-find');
  var addRandomBtn = document.getElementById('ll-add-random');

  addBtn.addEventListener('click', function(e) {
    var userData = document.getElementById('ll-add-value').value
    // Doesn't handle non-int esque input
    var node = new SinglyLinkedListNode(parseInt(userData));

    list.insert(node);
    ctx.clearRect(0, 50, 500, 450);
    drawLinkedList(ctx, list.getStart(), 0);
  });

  addRandomBtn.addEventListener('click', function(e) {
    var node = new SinglyLinkedListNode(Math.floor(Math.random()*100));
    list.insert(node);
    ctx.clearRect(0, 50, 500, 450);
    drawLinkedList(ctx, list.getStart(), 0);
  });

  rmBtn.addEventListener('click', function(e) {
    var userData = document.getElementById('ll-rm-value').value;
    if(list.remove(parseInt(userData))) {
      ctx.clearRect(0, 50, 500, 450);
      drawLinkedList(ctx, list.getStart(), 0);
    } else {
      console.log('not found');
    }
  });

  findBtn.addEventListener('click', function(e) {
    var userData = document.getElementById('ll-find-value').value;
    if(list.find(parseInt(userData))) {
      ctx.clearRect(0, 50, 500, 450);
      drawLinkedList(ctx, list.getStart(), 0, parseInt(userData));
      console.log('found', userData);
    } else {
      console.log('not found', userData);
    }
  });
};

function drawLinkedList(ctx, start, index, dataFlag) {
  var data = start.getData();

  if (dataFlag === data) {
    drawLinkedListNode(ctx, data, index, true);
  } else {
    drawLinkedListNode(ctx, data, index);
  }
  if (start.hasNext()) {
    drawLinkedList(ctx, start.next, index+1, dataFlag);
  }
}

function drawNode(ctx, index, config) {
  var x = index % config.numCol * config.nodeXSpacing + config.xPadding;
  var y = Math.floor(index / config.numCol) * config.nodeYSpacing + config.yPadding;
  // Data Box
  ctx.strokeRect(x, y, config.nodeWidth, config.nodeHeight);
  // Next Pointer Box
  ctx.strokeRect(x + config.nodeWidth, y, config.nodeWidth, config.nodeHeight);
}

function drawPointer(ctx, index, config) {
  // Pointer Dot
  ctx.arc(index % config.numCol * config.nodeXSpacing + config.pointerXOffset,
    Math.floor(index / config.numCol) * config.nodeYSpacing + config.pointerYOffset,
    config.pointerRadius, 0, Math.PI * 2);
  ctx.fill();
  if (index % config.numCol === config.numCol - 1) {
    // Pointer Line 
    ctx.beginPath();
    ctx.moveTo(index % config.numCol * config.nodeXSpacing + 40, Math.floor(index / config.numCol) * config.nodeYSpacing + 80);
    ctx.lineTo(index % config.numCol * config.nodeXSpacing + 40, Math.floor(index / config.numCol) * config.nodeYSpacing + 90);
    ctx.lineTo(20, Math.floor(index / config.numCol) * 40 + 90);
    ctx.lineTo(20, Math.floor(index / config.numCol) * 40 + 100);
    ctx.stroke();

    // Pointer Triangle
    ctx.beginPath();
    ctx.moveTo(20, Math.floor(index / config.numCol) * 40 + 100);
    ctx.lineTo(25, Math.floor(index / config.numCol) * 40 + 95);
    ctx.lineTo(15, Math.floor(index / config.numCol) * 40 + 95);
    ctx.lineTo(20, Math.floor(index / config.numCol) * 40 + 100);
    ctx.fill();
  } else {
    // Pointer Line
    ctx.beginPath();
    ctx.moveTo(index % config.numCol * 60 + 40, Math.floor(index / config.numCol) * 40 + 70);
    ctx.lineTo(index % config.numCol * 60 + 70, Math.floor(index / config.numCol) * 40 + 70);
    ctx.stroke();

    // Pointer Triangle
    ctx.beginPath();
    ctx.moveTo(index % config.numCol * 60 + 70, Math.floor(index / config.numCol) * 40 + 70);
    ctx.lineTo(index % config.numCol * 60 + 65, Math.floor(index / config.numCol) * 40 + 65);
    ctx.lineTo(index % config.numCol * 60 + 65, Math.floor(index / config.numCol) * 40 + 75);
    ctx.lineTo(index % config.numCol * 60 + 70, Math.floor(index / config.numCol) * 40 + 70);
    ctx.fill();
  }
}

function drawData(ctx, data, index, config) {
  ctx.font = '10px sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(data, index % config.numCol * 60 + 20, Math.floor(index / config.numCol) * 40 + 70, 20);
}

function drawLinkedListNode(ctx, data, index, dataFlag) {
  var config = {
    numCol: 8,
    nodeXSpacing: 60,
    xPadding: 10,
    nodeYSpacing: 40,
    yPadding: 60,
    nodeWidth: 20,
    nodeHeight: 20,
    pointerRadius: 4,
    pointerXOffset: 40,
    pointerYOffset: 70,
    nodeColor: dataFlag ? '#FF0000' : '#000000'
  };

  ctx.strokeStyle = config.nodeColor;
  ctx.fillStyle = config.nodeColor;
  drawNode(ctx, index, config);
  drawPointer(ctx, index, config);
  drawData(ctx, data, index, config);
}