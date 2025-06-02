const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Middleware для обработки статических файлов
app.use(express.static(path.join(__dirname, '../client')));
app.use(express.json());

// Генерация случайного массива
function generateRandomArray() {
    const arr = [];
    for (let i = 0; i < 100; i++) {
        arr.push(Math.floor(Math.random() * 91) + 10); // 10-100
    }
    return arr;
}

// Маршрут для получения начального массива
app.get('/api/array', (req, res) => {
    const randomArray = generateRandomArray();
    res.json({ array: randomArray });
});

// Маршрут для обработки массива (сортировка и поиск максимума)
app.post('/api/process', (req, res) => {
    const originalArray = req.body.array;
    const sortedArray = [...originalArray].sort((a, b) => a - b);
    const maxElement = Math.max(...originalArray);
    
    res.json({
        originalArray: originalArray,
        sortedArray: sortedArray,
        maxElement: maxElement
    });
});

// Запуск сервера
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});