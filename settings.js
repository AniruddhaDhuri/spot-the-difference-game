let differences = [];

document.getElementById('load-images').addEventListener('click', () => {
  const img1 = document.getElementById('image1');
  const img2 = document.getElementById('image2');
  const canvas1 = document.getElementById('canvas1');
  const canvas2 = document.getElementById('canvas2');

  img1.src = document.getElementById('image1-url').value;
  img2.src = document.getElementById('image2-url').value;

  img1.onload = () => setupCanvas(img1, canvas1);
  img2.onload = () => setupCanvas(img2, canvas2);

  canvas1.addEventListener('click', e => markDifference(e, canvas1));
  canvas2.addEventListener('click', e => markDifference(e, canvas2));
});

function setupCanvas(img, canvas) {
  canvas.width = img.width;
  canvas.height = img.height;
}

function markDifference(e, canvas) {
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  const radius = 25;
  differences.push({ x, y, radius });

  const ctx = canvas.getContext('2d');
  ctx.strokeStyle = 'red';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, 2 * Math.PI);
  ctx.stroke();
}

document.getElementById('export-config').addEventListener('click', () => {
  const config = {
    image1: document.getElementById('image1-url').value,
    image2: document.getElementById('image2-url').value,
    differences
  };

  const blob = new Blob([JSON.stringify(config, null, 2)], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'config.json';
  a.click();
});
