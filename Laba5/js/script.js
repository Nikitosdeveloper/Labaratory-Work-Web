const phoneBookApp = {

    contacts: [],

    init() {

        this.loadData();

        this.updateIdSelect();

        document.getElementById('saveBtn').addEventListener('click', () => this.saveContact());
        document.getElementById('clearBtn').addEventListener('click', () => this.clearForm());
        document.getElementById('deleteBtn').addEventListener('click', () => this.deleteContact());
        document.getElementById('showDebtorsBtn').addEventListener('click', () => this.showDebtors());
        document.getElementById('addPropertyBtn').addEventListener('click', () => this.addProperty());


        this.displayContacts();
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
        } else {

            const id = parseInt(idSelect.value);
            const contact = this.contacts.find(c => c.id === id);

            if (contact) {
                contact.fullName = fullName;
                contact.phoneNumber = phoneNumber;
                contact.address = address;
                contact.debt = debt === 'yes';
            }
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
        const id = parseInt(document.getElementById('contactSelect').value);

        if (id && id !== 'new') {
            this.contacts = this.contacts.filter(c => c.id !== id);
            this.saveData();
            this.updateIdSelect();
            this.displayContacts();
            this.clearForm();
        } else {
            alert('Выберите запись для удаления!');
        }
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