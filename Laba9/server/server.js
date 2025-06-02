const express = require('express');
const path = require('path');
const { generateArray } = require('./modules/arrayGenerator');
const { sortArray, findMax } = require('./modules/arrayProcessor');

const app = express();
const PORT = 3000;

// Логирование всех запросов для отладки
app.use((req, res, next) => {
  console.log(`Request for: ${req.url}`);
  next();
});

// Обслуживание статических файлов из папки client
app.use(express.static('D:/Универ/4 семестр/ПиWeb/Laba9/client'));

// Обработчик для API
app.get('/api/array', (req, res) => {
  const originalArray = generateArray(100, 10, 100);
  const sortedArray = sortArray(originalArray);
  const maxElement = findMax(originalArray);
  res.json({
    original: originalArray,
    sorted: sortedArray,
    max: maxElement
  });
});

// Обработчик для корневого пути
app.get('/', (req, res) => {
  res.sendFile('D:/Универ/4 семестр/ПиWeb/Laba9/client/html/index.html');
});

// Обработчик ошибок 404
app.use((req, res, next) => {
  res.status(404).send('Resource not found');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});