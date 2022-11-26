const cols = document.querySelectorAll('.col');

function setRandomColors() {
  cols.forEach((col) => {
    const color = chroma.random();
    const text = col.querySelector('h2');
    text.textContent = color;
    col.style.background = color;
    col.style.color = setTextColor(text, color);
  });
}

function setTextColor(text, color) {
  const luminance = chroma(color).luminance();
  text.style.color = luminance > 0.5 ? 'black' : 'white';
}

setRandomColors();
