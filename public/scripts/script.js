document.getElementById('search').addEventListener('input', function () {
    const search = this.value.toLowerCase();
    const leden = document.querySelectorAll('.leden-card-grid section');

    leden.forEach(lid => {
        const title = lid.querySelector('h3').textContent.toLowerCase();
        lid.style.display = title.includes(search) ? '' : 'none';
    });
});


document.addEventListener("DOMContentLoaded", function () {
    //Provincie-filter instellen
    const pathPartsProvincie = window.location.pathname.split("/leden/");
    if (pathPartsProvincie.length > 1) {
      const currentProvincie = decodeURIComponent(pathPartsProvincie[1].split("/")[0]); // Alleen provincie pakken, zonder extra delen

      console.log("Geselecteerde provincie uit URL:", currentProvincie); // Debugging

      const provincieSelect = document.getElementById("provincie");
      for (let option of provincieSelect.options) {
        if (option.value === currentProvincie) {
          option.selected = true;
          break;
        }
      }
    }

    //Sorteren-filter instellen
    const pathPartsSorteren = window.location.pathname.split("/leden/zoeken/");
    if (pathPartsSorteren.length > 1) {
      const currentSorteren = decodeURIComponent(pathPartsSorteren[1].split("/")[0]); // Alleen de sorteerwaarde pakken

      console.log("Geselecteerde sorteermethode uit URL:", currentSorteren); // Debugging

      const sorterenSelect = document.getElementById("sorteren");
      for (let option of sorterenSelect.options) {
        if (option.value === currentSorteren) {
          option.selected = true;
          break;
        }
      }
    }
  });