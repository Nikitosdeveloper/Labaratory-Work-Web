document.addEventListener('DOMContentLoaded', function() {
    const submissions = JSON.parse(localStorage.getItem('tvSurveySubmissions')) || [];
    const table = document.getElementById('resultsTable');

    submissions.forEach(sub => {
        const row = table.insertRow();
        row.innerHTML = `
            <td>${sub.fullName || '-'}</td>
            <td>${sub.gender || '-'}</td>
            <td>${sub.birthDate || '-'}</td>
            <td>${sub.phone || '-'}</td>
            <td>${sub.email || '-'}</td>
            <td>${sub.genres ? sub.genres.join(', ') : '-'}</td>
        `;
    });
});