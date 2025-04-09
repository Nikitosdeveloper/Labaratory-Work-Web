const phoneBookApp = {

    history: [],
    contacts: [],

    init() {
        
        this.loadData();
        this.loadHistory(); 
        this.updateIdSelect();

        document.getElementById('saveBtn').addEventListener('click', () => this.saveContact());
        document.getElementById('clearBtn').addEventListener('click', () => this.clearForm());
        document.getElementById('deleteBtn').addEventListener('click', () => this.deleteContact());
        document.getElementById('showDebtorsBtn').addEventListener('click', () => this.showDebtors());
        document.getElementById('addPropertyBtn').addEventListener('click', () => this.addProperty());


        this.displayContacts();
        this.displayHistory();
    },

    addHistoryEntry(action, id, details = '') {
        const now = new Date();
        const timeString = now.toLocaleTimeString();
        const dateString = now.toLocaleDateString();
        
        let entry = {
            timestamp: now,
            action: action,
            id: id,
            details: details
        };
        
        this.history.unshift(entry);
        this.saveHistory();
        this.displayHistory();
        
        if (this.history.length > 50) {
            this.history.pop();
        }
    },

    saveHistory() {
        localStorage.setItem('phoneBookHistory', JSON.stringify(this.history));
    },

    loadHistory() {
        const savedHistory = localStorage.getItem('phoneBookHistory');
        if (savedHistory) {
            this.history = JSON.parse(savedHistory);
            this.history.forEach(entry => {
                entry.timestamp = new Date(entry.timestamp);
            });
        }
    },

    displayHistory() {
        const historyLog = document.getElementById('historyLog');
        historyLog.innerHTML = '';
        
        this.history.forEach(entry => {
            const entryElement = document.createElement('div');
            entryElement.className = 'history-entry';
            
            const timeString = entry.timestamp.toLocaleTimeString();
            const dateString = entry.timestamp.toLocaleDateString();
            
            let actionText = '';
            switch(entry.action) {
                case 'add':
                    actionText = `Добавлена новая запись с ID ${entry.id}`;
                    break;
                case 'delete':
                    actionText = `Запись с ID ${entry.id} была удалена`;
                    break;
                case 'update':
                    actionText = `Запись с ID ${entry.id} была изменена`;
                    break;
                case 'property_add':
                    actionText = `К записи с ID ${entry.id} добавлено свойство: ${entry.details}`;
                    break;
                default:
                    actionText = `Произведено действие с записью ID ${entry.id}`;
            }
            
            entryElement.innerHTML = `
                <span class="history-time">${dateString} ${timeString}</span>
                <span class="history-action">${actionText}</span>
            `;
            
            historyLog.appendChild(entryElement);
        });
    },

    loadData() {
        const savedData = localStorage.getItem('phoneBookData');
        if (savedData) {
            this.contacts = JSON.parse(savedData);
        }
    },

    saveData() {
        localStorage.setItem('phoneBookData', JSON.stringify(this.contacts));
    },

    updateIdSelect() {
        const select = document.getElementById('contactSelect');
        select.innerHTML = '<option value="new">Новый номер</option>';

        this.contacts.forEach(contact => {
            const option = document.createElement('option');
            option.value = contact.id;
            option.textContent = contact.id;
            select.appendChild(option);
        });
    },

    saveContact() {
        const idSelect = document.getElementById('contactSelect');
        const fullName = document.getElementById('full_name').value;
        const phoneNumber = document.getElementById('number').value;
        const address = document.getElementById('address').value;
        const debt = document.getElementById('debt').value;

        if (!fullName || !phoneNumber) {
            alert('Поля "ФИО" и "Номер телефона" обязательны для заполнения!');
            return;
        }

        if (idSelect.value === 'new') {
            const newId = this.contacts.length > 0
                ? Math.max(...this.contacts.map(c => c.id)) + 1
                : 1;

            const newContact = {
                id: newId,
                fullName,
                phoneNumber,
                address,
                debt: debt === 'yes',
                customProperties: {}
            };

            this.contacts.push(newContact);
            this.addHistoryEntry('add', newId, `ФИО: ${fullName}, Телефон: ${phoneNumber}`);
        } else {

            const id = parseInt(idSelect.value);
            const contact = this.contacts.find(c => c.id === id);

            if (contact) {
                contact.fullName = fullName;
                contact.phoneNumber = phoneNumber;
                contact.address = address;
                contact.debt = debt === 'yes';
            }
            this.addHistoryEntry('update', id, `ФИО: ${fullName}, Телефон: ${phoneNumber}`);
        }


        this.saveData();
        this.updateIdSelect();
        this.displayContacts();
        this.clearForm();
    },

    clearForm() {
        document.getElementById('contactSelect').value = 'new';
        document.getElementById('full_name').value = '';
        document.getElementById('number').value = '';
        document.getElementById('address').value = '';
        document.getElementById('debt').value = 'yes';
        document.getElementById('propertyName').value = '';
        document.getElementById('propertyValue').value = '';
    },

    deleteContact() {
        const idSelect = document.getElementById('contactSelect');
        const id = idSelect.value === 'new' ? null : parseInt(idSelect.value);
        
        if (!id) {
            alert('Выберите запись для удаления!');
            return;
        }
    
        const contactIndex = this.contacts.findIndex(c => c.id === id);
        
        if (contactIndex === -1) {
            alert('Запись не найдена!');
            return;
        }
    
        const contactToDelete = this.contacts[contactIndex];
        this.addHistoryEntry('delete', id, `ФИО: ${contactToDelete.fullName}`);
    
        this.contacts.splice(contactIndex, 1);
        this.saveData();
        this.updateIdSelect();
        this.displayContacts();
        this.clearForm();
    },

    showDebtors() {
        const debtors = this.contacts.filter(c => c.debt);

        if (debtors.length === 0) {
            alert('Нет записей с задолженностью!');
            return;
        }

        let message = 'ФИО с задолженностью:\n';
        debtors.forEach(d => {
            message += `- ${d.fullName}\n`;
        });

        alert(message);
    },

    addProperty() {
        const idSelect = document.getElementById('contactSelect');

        if (idSelect.value === 'new') {
            alert('Сначала сохраните контакт, прежде чем добавлять свойства!');
            return;
        }

        const propertyName = document.getElementById('propertyName').value;
        const propertyValue = document.getElementById('propertyValue').value;

        if (!propertyName || !propertyValue) {
            alert('Введите название свойства и его значение!');
            return;
        }

        const id = parseInt(idSelect.value);
        const contact = this.contacts.find(c => c.id === id);

        if (contact) {
            contact.customProperties[propertyName] = propertyValue;
            this.addHistoryEntry('property_add', id, `${propertyName}: ${propertyValue}`);
            this.saveData();
            this.displayContacts();
            document.getElementById('propertyName').value = '';
            document.getElementById('propertyValue').value = '';
        }
    },

    displayContacts() {

        const oldTable = document.querySelector('table');
        if (oldTable) oldTable.remove();

        if (this.contacts.length === 0) return;

        const table = document.createElement('table');
        table.innerHTML = `
        <thead>
          <tr>
            <th>ID</th>
            <th>ФИО</th>
            <th>Номер телефона</th>
            <th>Адрес</th>
            <th>Задолженность</th>
            <th>Дополнительные свойства</th>
          </tr>
        </thead>
        <tbody></tbody>
      `;
  
      const tbody = table.querySelector('tbody');

        this.contacts.forEach(contact => {
            const row = document.createElement('tr');

            row.innerHTML = `
          <td>${contact.id}</td>
          <td>${contact.fullName}</td>
          <td>${contact.phoneNumber}</td>
          <td>${contact.address || '-'}</td>
          <td>${contact.debt ? 'Да' : 'Нет'}</td>
          <td class="custom-properties"></td>
        `;

            const customPropsCell = row.querySelector('.custom-properties');
            const props = [];

            for (const prop in contact.customProperties) {
                props.push(`${prop}: ${contact.customProperties[prop]}`);
            }

            customPropsCell.textContent = props.join(', ');

            tbody.appendChild(row);
        });


        document.querySelector('.property-form').insertAdjacentElement('afterend', table);
    }
};

document.addEventListener('DOMContentLoaded', () => phoneBookApp.init());