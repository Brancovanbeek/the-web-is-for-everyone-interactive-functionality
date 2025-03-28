document.addEventListener('DOMContentLoaded', function () {
    const searchInputs = document.querySelectorAll('input[type="text"][id="search"]'); 

    searchInputs.forEach(search => {
        search.addEventListener('input', function () {
            const searchValue = this.value.toLowerCase();
            const leden = document.querySelectorAll('.leden-card-grid section');

            leden.forEach(lid => {
                const title = lid.querySelector('h3').textContent.toLowerCase();
                lid.style.display = title.includes(searchValue) ? '' : 'none';
            });
        });
    });
});


// error en succes meldingen
document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    
    const succesMelding = urlParams.get('succes');
    const errorMelding = urlParams.get('error');
    
    if (succesMelding) {
        const succesDiv = document.createElement('div');
        succesDiv.className = 'succes-melding';
        succesDiv.textContent = succesMelding;
        document.body.prepend(succesDiv);  // Voeg de succesmelding toe aan de bovenkant van de pagina
    }

    if (errorMelding) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-melding';
        errorDiv.textContent = errorMelding;
        document.body.prepend(errorDiv);  // Voeg de foutmelding toe aan de bovenkant van de pagina
    }
});

  