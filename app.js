const cols = document.querySelectorAll('.col');

document.addEventListener('keydown', (event) => {
  if (event.code.toLocaleLowerCase() === 'space') {
    setRandomColors();
  }
});

function setRandomColors() {
  cols.forEach((col) => {
    const color = chroma.random();
    const text = col.querySelector('h2');
    const button = col.querySelector('button');
    text.textContent = color;
    col.style.background = color;
    col.style.color = setTextColor(text, color);
    col.style.color = setTextColor(button, color);
  });
}

function setTextColor(text, color) {
  const luminance = chroma(color).luminance();
  text.style.color = luminance > 0.5 ? 'black' : 'white';
}

setRandomColors();
