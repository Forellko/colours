const cols = document.querySelectorAll('.col');

function setRandomColors() {
  cols.forEach((col) => {
    const color = chroma.random();
    const text = col.querySelector('h2');
    text.textContent = color;
    col.style.background = color;
  });
}

setRandomColors();
