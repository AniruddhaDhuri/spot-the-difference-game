let config;
let foundDifferences = [];
let score = 0;

async function loadGame() {
  const res = await fetch('config.json');
  config = await res.json();

  const img1 = document.getElementById('image1');
  const img2 = document.getElementById('image2');
  const canvas1 = document.getElementById('canvas1');
  const canvas2 = document.getElementById('canvas2');

  img1.src = config.image1;
  img2.src = config.image2;

  img1.onload = () => setupCanvas(img1, canvas1);
  img2.onload = () => setupCanvas(img2, canvas2);

  document.getElementById('total').textContent = config.differences.length;

  canvas1.addEventListener('click', e => handleClick(e, canvas1));
  canvas2.addEventListener('click', e => handleClick(e, canvas2));
}

function setupCanvas(img, canvas) {
  canvas.width = img.width;
  canvas.height = img.height;
}

function handleClick(e, canvas) {
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  for (let i = 0; i < config.differences.length; i++) {
    const diff = config.differences[i];
    const distance = Math.sqrt((x - diff.x) ** 2 + (y - diff.y) ** 2);

    if (distance < diff.radius && !foundDifferences.includes(i)) {
      foundDifferences.push(i);
      drawCircle(canvas, diff.x, diff.y, diff.radius);
      drawCircle(document.getElementById('canvas1'), diff.x, diff.y, diff.radius);
      drawCircle(document.getElementById('canvas2'), diff.x, diff.y, diff.radius);
      updateScore();
      return;
    }
  }
}

function drawCircle(canvas, x, y, radius) {
  const ctx = canvas.getContext('2d');
  ctx.strokeStyle = 'red';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, 2 * Math.PI);
  ctx.stroke();
}

function updateScore() {
  score = foundDifferences.length;
  document.getElementById('score').textContent = score;

  if (score === config.differences.length) {
    document.getElementById('message').textContent = '🎉 Congratulations! You found all differences!';
  }
}

loadGame();
