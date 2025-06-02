const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware для обработки статических файлов
app.use(express.static(path.join(__dirname, '../client')));
app.use(express.json());

// Генерация случайного массива
function generateRandomArray() {
    const array = [];
    for (let i = 0; i < 100; i++) {
        array.push((Math.random() * 90 + 10).toFixed(6));
    }
    return array;
}

// Сохранение массива в файл
function saveArrayToFile(filename, array) {
    const data = array.join(',');
    fs.writeFileSync(path.join(__dirname, 'data', filename), data);
}

// Загрузка массива из файла
function loadArrayFromFile(filename) {
    const data = fs.readFileSync(path.join(__dirname, 'data', filename), 'utf8');
    return data.split(',').map(Number);
}

// Инициализация данных при запуске сервера
if (!fs.existsSync(path.join(__dirname, 'data'))) {
    fs.mkdirSync(path.join(__dirname, 'data'));
}

const initialArray = generateRandomArray();
saveArrayToFile('original_data.txt', initialArray);

// Маршруты API
app.get('/api/data/original', (req, res) => {
    const data = loadArrayFromFile('original_data.txt');
    res.json(data);
});

app.post('/api/data/sort', (req, res) => {
    const { order, decimals } = req.body;
    const originalData = loadArrayFromFile('original_data.txt');
    
    let sortedData;
    if (order === 'asc') {
        sortedData = [...originalData].sort((a, b) => a - b);
        saveArrayToFile('sorted_asc.txt', sortedData);
    } else {
        sortedData = [...originalData].sort((a, b) => b - a);
        saveArrayToFile('sorted_desc.txt', sortedData);
    }
    
    // Форматирование чисел с заданным количеством знаков после запятой
    const formattedData = sortedData.map(num => num.toFixed(decimals));
    res.json(formattedData);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});