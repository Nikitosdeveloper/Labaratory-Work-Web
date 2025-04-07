document.getElementById('surveyForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    if (!this.checkValidity()) {
        alert("Пожалуйста, заполните все обязательные поля корректно!");
        return;
    }

    const formData = new FormData(this);
    const data = {};
    formData.forEach((value, key) => {
        if (key === 'genres') {
            if (!data[key]) data[key] = [];
            data[key].push(value);
        } else {
            data[key] = value;
        }
    });

    let submissions = JSON.parse(localStorage.getItem('tvSurveySubmissions') || '[]');
    submissions.push(data);
    localStorage.setItem('tvSurveySubmissions', JSON.stringify(submissions));

    // Открываем в новой вкладке
    const resultsTab = window.open('results.html', '_blank');
});