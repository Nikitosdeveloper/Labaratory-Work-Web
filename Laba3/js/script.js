
const textField = document.getElementById("textField");
const colorSelect = document.getElementById("colorSelect");
const sizeSelect = document.getElementById("sizeSelect");
const fontSelect = document.getElementById("fontSelect");
const textArea = document.querySelector("textarea");
const afterBtn = document.getElementById("afterBtn");
const beforeBtn = document.getElementById("beforeBtn");
const newBtn = document.getElementById("newBtn");
const deleteBtn = document.getElementById("deleteBtn");

function applyTextFormatting() {
    const text = textField.value;
    textArea.value = text;
    textArea.style.color = colorSelect.value;
    textArea.style.fontSize = sizeSelect.value;
    textArea.style.fontFamily = fontSelect.value;
}

afterBtn.addEventListener("click", function() {
    applyTextFormatting();
});

beforeBtn.addEventListener("click", function() {
    const currentText = textArea.value;
    textArea.style = "";
    textArea.value = currentText;
});

newBtn.addEventListener("click", function() {
    const newInput = textField.cloneNode(true);
    newInput.value = "";
    textField.parentElement.appendChild(newInput);
});

deleteBtn.addEventListener("click", function() {
    if (textField.parentElement.children.length > 1) {
        textField.parentElement.removeChild(textField.parentElement.lastChild);
    } else {
        alert("Нельзя удалить последнее текстовое поле!");
    }
});