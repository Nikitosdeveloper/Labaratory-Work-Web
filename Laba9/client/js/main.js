document.addEventListener('DOMContentLoaded', async () => {
    // Получаем массив с сервера
    const response = await fetch('/api/array');
    const data = await response.json();
    const array = data.array;
    
    // Отображаем массив в таблице 10x10
    displayArrayInTable(array, 'arrayTable');
    
    // Обработчик кнопки
    document.getElementById('processBtn').addEventListener('click', async () => {
        // Отправляем массив на сервер для обработки
        const processResponse = await fetch('/api/process', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ array: array })
        });
        
        const processData = await processResponse.json();
        
        // Сохраняем данные в sessionStorage для использования на следующей странице
        sessionStorage.setItem('originalArray', JSON.stringify(processData.originalArray));
        sessionStorage.setItem('sortedArray', JSON.stringify(processData.sortedArray));
        sessionStorage.setItem('maxElement', processData.maxElement);
        
        // Переходим на страницу результатов
        window.location.href = 'result.html';
    });
});

function displayArrayInTable(array, tableId) {
    const table = document.getElementById(tableId);
    table.innerHTML = '';
    
    for (let i = 0; i < 10; i++) {
        const row = document.createElement('tr');
        
        for (let j = 0; j < 10; j++) {
            const cell = document.createElement('td');
            cell.textContent = array[i * 10 + j];
            row.appendChild(cell);
        }
        
        table.appendChild(row);
    }
}