async function fetchArrayData(arrayType, tableId, maxId = null) {
  try {
    const response = await fetch('/api/array');
    const data = await response.json();
    const array = arrayType === 'original' ? data.original : data.sorted;
    const table = document.getElementById(tableId);
    
    
    for (let i = 0; i < 10; i++) {
      const row = table.insertRow();
      for (let j = 0; j < 10; j++) {
        const cell = row.insertCell();
        cell.textContent = array[i * 10 + j];
      }
    }
    
    if (maxId) {
      document.getElementById(maxId).textContent = data.max;
    }
  } catch (error) {
    console.error('Error fetching array data:', error);
  }
}