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
  if (type === 'copy') {
    copyToClipboard(event.target.textContent);
  }
});

document.addEventListener('dblclick', () => {
  setRandomColors();
});

function copyToClipboard(text) {
  return navigator.clipboard.writeText(text);
}

function setRandomColors(isInitial = false) {
  let colors = [];
  if (isInitial) {
    colors = getColorsFromHash();
  }
  cols.forEach((col, index) => {
    const isLocked = col.querySelector('i').classList.contains('fa-lock');
    const color = isInitial
      ? colors[index]
        ? colors[index]
        : chroma.random()
      : chroma.random();
    const text = col.querySelector('h2');
    const button = col.querySelector('button');

    if (isLocked) {
      colors.push(text.textContent);
      return;
    }

    colors.push(color);

    text.textContent = color;
    col.style.background = color;
    col.style.color = setTextColor(text, color);
    col.style.color = setTextColor(button, color);
  });

  updateColorHash(colors);
}

function setTextColor(text, color) {
  const luminance = chroma(color).luminance();
  text.style.color = luminance > 0.5 ? 'black' : 'white';
}

function updateColorHash(colors = []) {
  document.location.hash = colors
    .map((col) => {
      return col.toString().slice(1);
    })
    .join('-');
}

function getColorsFromHash() {
  if (document.location.hash.length <= 1) return [];
  return document.location.hash
    .slice(1)
    .split('-')
    .map((color) => '#' + color);
}

setRandomColors(true);
