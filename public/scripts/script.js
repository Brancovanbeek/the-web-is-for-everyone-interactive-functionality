document.getElementById('search').addEventListener('input', function () {
    const search = this.value.toLowerCase();
    const leden = document.querySelectorAll('.leden-card-grid section');

    leden.forEach(lid => {
        const title = lid.querySelector('h3').textContent.toLowerCase();
        lid.style.display = title.includes(search) ? '' : 'none';
    });
});

