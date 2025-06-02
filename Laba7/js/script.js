const blockData = new Map();
const usedIds = new Set();
let blockCounter = 0;

const sizeOptions = {
  small: { width: '300px', minHeight: '200px' },
  medium: { width: '400px', minHeight: '300px' },
  large: { width: '600px', minHeight: '400px' },
  xlarge: { width: '800px', minHeight: '500px' },
  gigant: { width: '1000px', minHeight: '1000px' }
};

const createBlock = (() => {
  const generateId = () => `block-${blockCounter++}`;

  return (size, margin, title, image, text) => {
    const id = generateId();
    if (usedIds.has(id)) return;

    usedIds.add(id);
    blockData.set(id, { size, margin, title, image, text });

    const block = document.createElement('div');
    block.className = 'block';
    block.id = id;
    block.style.width = sizeOptions[size].width;
    block.style.minHeight = sizeOptions[size].minHeight;
    block.style.margin = `${margin}px`;

    block.innerHTML = `
      <h2>${title}</h2>
      <img src="${image}" alt="Block Image">
      <section>${text}</section>
      <button onclick="updateBlock.bind(null, '${id}')()">Изменить блок</button>
    `;

    document.getElementById('blocks-container').appendChild(block);
  };
})();

const updateBlock = (id) => {
  const data = blockData.get(id);
  if (!data) return;

  const sizeSelect = document.getElementById('block-size').value;
  const marginSelect = document.getElementById('block-margin').value;
  const titleSelect = document.getElementById('block-title').value;
  const imageSelect = document.getElementById('block-image').value;
  const textSelect = document.getElementById('block-text').value;

  blockData.set(id, {
    size: sizeSelect,
    margin: marginSelect,
    title: titleSelect,
    image: imageSelect,
    text: textSelect
  });

  const block = document.getElementById(id);
  block.style.width = sizeOptions[sizeSelect].width;
  block.style.minHeight = sizeOptions[sizeSelect].minHeight;
  block.style.margin = `${marginSelect}px`;
  block.innerHTML = `
    <h2>${titleSelect}</h2>
    <img src="${imageSelect}" alt="Block Image">
    <section>${textSelect}</section>
    <button onclick="updateBlock.bind(null, '${id}')()">Изменить блок</button>
  `;
};

document.getElementById('add-block').addEventListener('click', () => {
  const size = document.getElementById('block-size').value;
  const margin = document.getElementById('block-margin').value;
  const title = document.getElementById('block-title').value;
  const image = document.getElementById('block-image').value;
  const text = document.getElementById('block-text').value;

  createBlock(size, margin, title, image, text);
});

const filterBlocksBySize = (size) => {
  const blocks = document.querySelectorAll('.block');
  blocks.forEach(block => {
    const data = blockData.get(block.id);
    block.style.display = data.size === size ? 'block' : 'none';
  });
};