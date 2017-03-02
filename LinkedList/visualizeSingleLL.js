var visualizeSingleLL = function(canvasDom, list) {
  var ctx = canvasDom.getContext('2d');

  ctx.font = '30px sans-serif';
  ctx.fillText('Start', 10, 40);

  for (var i = 0; i < 50; i++) {
    drawNode(ctx, Math.floor(Math.random()*100), i);
  }
};

function drawNode(ctx, data, index) {
  var numCol = 8;

  ctx.strokeRect(index % numCol * 60 + 10, Math.floor(index / numCol) * 40 + 60, 20, 20);
  ctx.strokeRect(index % numCol * 60 + 30, Math.floor(index / numCol) * 40 + 60, 20, 20);
  ctx.arc(index % numCol * 60 + 40, Math.floor(index / numCol) * 40 + 70, 4, 0, Math.PI * 2);
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(index % numCol * 60 + 40, Math.floor(index / numCol) * 40 + 70);
  ctx.lineTo(index % numCol * 60 + 70, Math.floor(index / numCol) * 40 + 70);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(index % numCol * 60 + 70, Math.floor(index / numCol) * 40 + 70);
  ctx.lineTo(index % numCol * 60 + 65, Math.floor(index / numCol) * 40 + 65);
  ctx.lineTo(index % numCol * 60 + 65, Math.floor(index / numCol) * 40 + 75);
  ctx.lineTo(index % numCol * 60 + 70, Math.floor(index / numCol) * 40 + 70);
  ctx.fill();

  ctx.font = '10px sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(data, index % numCol * 60 + 20, Math.floor(index / numCol) * 40 + 70, 20);
}