document.addEventListener('DOMContentLoaded', () => {
    // Получаем данные из sessionStorage
    const originalArray = JSON.parse(sessionStorage.getItem('originalArray'));
    const sortedArray = JSON.parse(sessionStorage.getItem('sortedArray'));
    const maxElement = sessionStorage.getItem('maxElement');
    
    // Отображаем данные
    displayArrayInTable(originalArray, 'originalArrayTable');
    displayArrayInTable(sortedArray, 'sortedArrayTable');
    document.getElementById('maxElement').textContent = maxElement;
    
    // Обработчик кнопки "Назад"
    document.getElementById('backBtn').addEventListener('click', () => {
        window.location.href = 'index.html';
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