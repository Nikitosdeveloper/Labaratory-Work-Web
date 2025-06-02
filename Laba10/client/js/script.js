$(document).ready(function() {
    let originalData = [];
    let decimals = 2;
    
    // Загрузка исходных данных
    function loadOriginalData() {
        $.get('/api/data/original', function(data) {
            originalData = data;
            renderTable('originalTable', originalData, decimals);
        });
    }
    
    // Рендеринг таблицы
    function renderTable(containerId, data, decimalPlaces) {
        const $container = $('#' + containerId);
        $container.empty();
        
        const $table = $('<table>');
        const $tbody = $('<tbody>');
        
        for (let i = 0; i < 10; i++) {
            const $row = $('<tr>');
            for (let j = 0; j < 10; j++) {
                const index = i * 10 + j;
                const value = data[index] ? Number(data[index]).toFixed(decimalPlaces) : '';
                $row.append($('<td>').text(value));
            }
            $tbody.append($row);
        }
        
        $table.append($tbody);
        $container.append($table);
    }
    
    // Обработчики событий
    $('#decimals').change(function() {
        decimals = parseInt($(this).val());
        renderTable('originalTable', originalData, decimals);
    });
    
    $('#sortAsc').click(function() {
        $.post('/api/data/sort', { order: 'asc', decimals: decimals }, function(data) {
            renderTable('processedTable', data, decimals);
        });
    });
    
    $('#sortDesc').click(function() {
        $.post('/api/data/sort', { order: 'desc', decimals: decimals }, function(data) {
            renderTable('processedTable', data, decimals);
        });
    });
    
    $('#showOriginal').click(function() {
        renderTable('processedTable', originalData, decimals);
    });
    
    // Инициализация
    loadOriginalData();
});