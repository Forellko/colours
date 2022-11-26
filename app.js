const cols = document.querySelectorAll('.col');

document.addEventListener('keydown', (event) => {
  event.preventDefault();
  if (event.code.toLocaleLowerCase() === 'space') {
    setRandomColors();
  }
});

document.addEventListener('click', (event) => {
  const type = event.target.dataset.type;
  if (type === 'lock') {
    const node =
      event.target.tagName.toLowerCase() === 'i'
        ? event.target
        : event.target.children[0];

    node.classList.toggle('fa-lock-open');
    node.classList.toggle('fa-lock');
  }
});

document.addEventListener('dblclick', () => {
  setRandomColors();
});

function copyToClipboard(text) {
  return navigator.clipboard.writeText(text);
}

function setRandomColors() {
  cols.forEach((col) => {
    const isLocked = col.querySelector('i').classList.contains('fa-lock');
    if (isLocked) return;
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
