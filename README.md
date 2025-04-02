## Inhoudsopgave

  * [Beschrijving](#beschrijving)
  * [Gebruik](#gebruik)
  * [Kenmerken](#kenmerken)
  * [Installatie](#installatie)
  * [Bronnen](#bronnen)
  * [Licentie](#licentie)

## Beschrijving
Dit project is een interactieve ledenpagina voor Dutch Digital Agencies, waarmee bezoekers eenvoudig digitale bureaus in Nederland kunnen ontdekken, filteren en sorteren op provincie, omvang en naam.  

Elk bureau heeft een eigen detailpagina met uitgebreide informatie, zoals de locatie en het aantal werknemers. Hierdoor kunnen bezoekers snel en overzichtelijk de juiste bureaus vinden.  

Ik heb een dynamische lijst van leden geïmplementeerd, waarbij gebruikers in real-time kunnen zoeken en filteren. Daarnaast kunnen nieuwe leden worden toegevoegd via een formulier dat gebruikmaakt van progressive enhancement. Dankzij JavaScript wordt de gebruikerservaring verbeterd door het formulier dynamisch bij te werken zonder een volledige paginavernieuwing.  

Om de toegankelijkheid en performance te optimaliseren, heb ik een visuele loader geïntegreerd tijdens de verwerking van formulieren. Dit zorgt voor een snellere en soepelere interactie, vooral bij tragere verbindingen.
https://the-web-is-for-everyone-interactive-p6v6.onrender.com

<h3>Mobile filters</h2>
<img width="350" alt="Scherm­afbeelding 2025-04-02 om 09 38 46" src="https://github.com/user-attachments/assets/e5884a61-ef27-4af2-9163-a3eccd97b7c5" />
<h3>Mobile Grid</h3>
<img width="572" alt="Scherm­afbeelding 2025-04-02 om 09 43 12" src="https://github.com/user-attachments/assets/a5ca26d8-048f-4217-8347-68a812439918" />
<h3>Ipad Grid</h3>
<img width="350" alt="Scherm­afbeelding 2025-04-02 om 09 38 16" src="https://github.com/user-attachments/assets/93e99e41-cc5b-4237-83fb-061a3c2f6a41" />
<h3>Desktop Grid</h3>
<img width="350" alt="Scherm­afbeelding 2025-04-02 om 09 38 33" src="https://github.com/user-attachments/assets/632b6dce-46d3-4807-98d2-f17177e66166" />



## Gebruik
User Story: Gebruiker kan een lid toevoegen

Als een gebruiker van de Dutch Digital Agencies-website
Wil ik een nieuw lid kunnen toevoegen met een naam, locatie, aantal werknemers.
Zodat ik een bedrijf of persoon kan aanmelden die relevant is voor het platform.

Er is een formulier waarin ik de volgende gegevens kan invoeren:
- Naam van het lid
- Locatie
- Aantal werknemers (bijv. "10-24 werknemers")
  
Na het invullen en verzenden wordt het lid als een kaart weergegeven op de ledenpagina.
Als verplichte velden niet zijn ingevuld, krijg ik een foutmelding.
Ik krijg een bevestiging dat mijn toevoeging is verzonden en een melding als deze wordt goedgekeurd of afgewezen.

<img width="549" alt="Scherm­afbeelding 2025-04-02 om 10 22 08" src="https://github.com/user-attachments/assets/c4475307-a016-492b-a85d-e18d2be65e0e" />



## Kenmerken
<!-- Bij Kenmerken staat welke technieken zijn gebruikt en hoe. Wat is de HTML structuur? Wat zijn de belangrijkste dingen in CSS? Wat is er met JS gedaan en hoe? Misschien heb je iets met NodeJS gedaan, of heb je een framework of library gebruikt? -->
Hier is een uitgebreide uitleg van jouw code, opgesplitst per technologie:  

---

### **1. HTML Structuur**  
De HTML bevat een formulier waarmee een nieuw lid kan worden toegevoegd. Dit formulier bevat:  
- Drie invoervelden voor de naam, locatie en het aantal medewerkers van een agentschap.  
- Een `<details>`-element met een `<summary>`, zodat het formulier in- en uitklapbaar is.  
- Een submit-knop voor het verzenden van de gegevens.  

**Belangrijke HTML-elementen:**  
```html
<details class="subtext">
    <summary>Lid toevoegen</summary>
    <form class="lid-toevoegen-form" action="/leden/nieuw/toevoegen" method="POST" data-enhanced="form">
        <label class="subtext" for="title">Agency Name</label>
        <input placeholder="Funda" name="title" type="text">

        <label class="subtext" for="address">Agency Location</label>
        <input placeholder="Amsterdam" name="address" type="text">

        <label class="subtext" for="colleagues">Agency Employees</label> 
        <input placeholder="80" name="colleagues" type="text">

        <button class="subtext" type="submit">SUBMIT</button>
    </form>   
</details>
```
**Wat is bijzonder?**  
- **`<details>` en `<summary>`**: Hierdoor kan de gebruiker het formulier openen en sluiten.  
- **`data-enhanced="form"`**: Dit attribuut wordt gebruikt in JavaScript om het formulier dynamisch te verbeteren met AJAX.  

---

### **2. CSS (Stijl & Animaties)**  
CSS zorgt ervoor dat de interface er goed uitziet en een **loader-animatie** wordt gebruikt om de laadtijd te visualiseren.  

**Loader-animatie:**  
```css
.loader {
    border: 10px solid #f3f3f3;
    border-top: 10px solid black;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    animation: spin .7s cubic-bezier(.21,-0.03,.08,.91) infinite;
    opacity: 0%;
}
  
@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

.show {
    opacity: 100%;
}
```
**Wat is bijzonder?**  
- **CSS Animatie** (`@keyframes spin`): Laat de loader draaien.  
- **Opaciteit** (`opacity: 0%` en `.show { opacity: 100%; }`): Zorgt ervoor dat de loader pas zichtbaar is als het formulier wordt verzonden.  

---

### **3. JavaScript (Formulier Verzending via Fetch API)**  
Het script onderschept de standaard formulierinzending en handelt deze af met JavaScript.  

**Belangrijkste functies in de JavaScript:**  
```js
if ('fetch' in window && 'DOMParser' in window) {
  document.addEventListener('submit', async function(event) {
    const form = event.target;
    if (!form.hasAttribute('data-enhanced')) {
      return;
    }

    const loader = document.querySelector('.loader');
    event.preventDefault();
    loader.classList.add('show');

    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: new URLSearchParams(new FormData(form)),
      });

      const responseText = await response.text();
      const parser = new DOMParser();
      const responseDOM = parser.parseFromString(responseText, 'text/html');

      const newState = responseDOM.querySelector('[data-enhanced="' + form.getAttribute('data-enhanced') + '"]');
      form.outerHTML = newState.outerHTML;

    } catch (error) {
      console.error('Error tijdens formulierverzending:', error);
      alert('Er is een fout opgetreden tijdens het verzenden.');
    } finally {
      loader.classList.remove('show');
    }
  });
}
```
**Wat is bijzonder?**  
- **Feature Detection**: Controleert of de browser `fetch` en `DOMParser` ondersteunt.  
- **AJAX Formulierinzending**: Stuurt het formulier via `fetch` en voorkomt dat de pagina herlaadt.  
- **Loader**: Voegt een laadanimatie toe tijdens het verzenden.  
- **Dynamische update**: Het formulier wordt vervangen door een nieuwe state, zonder herladen van de pagina.  

---

### **4. Node.js (Server-side verwerking met Express.js)**  
De server ontvangt de formuliergegevens en stuurt deze door naar een externe API (`Directus`).  

**Servercode in Express:**  
```js
app.post('/leden/nieuw/toevoegen/', async function (request, response) {
  const res = await fetch('https://fdnd-agency.directus.app/items/dda_messages/', {
    method: 'POST',
    body: JSON.stringify({
      text: "Branco_" + request.body.title,
      for: request.body.address,
      from: request.body.colleagues,
    }),
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  });

  if (res.ok) {
    response.json({ success: true, message: 'Lid toegevoegd!' });
  } else {
    response.json({ success: false, message: 'Er is een fout opgetreden.' });
  }
});
```
**Wat is bijzonder?**  
- **Express.js route**: Ontvangt een `POST`-verzoek op `/leden/nieuw/toevoegen/`.  
- **Fetch naar Directus API**: Verstuurt de data naar een externe database.  
- **JSON response**: Geeft een succes- of foutmelding terug aan de client.  

---

### **5. Samenvatting van gebruikte technologieën**  
| Technologie  | Functie |
|-------------|---------|
| **HTML** | Formulier voor gebruikersinvoer |
| **CSS** | Stijlen en animaties, inclusief een laadindicator |
| **JavaScript** | AJAX voor formulierinzending zonder herladen, DOM-manipulatie |
| **Node.js + Express** | Backend-verwerking van het formulier |
| **Directus API** | Opslaan van formuliergegevens in een externe database |

---
**AJAX** staat voor **Asynchronous JavaScript and XML**. Het is een techniek waarmee een webpagina **data** kan **ophalen, verzenden en bijwerken** zonder dat de hele pagina opnieuw moet worden geladen.  

### **Hoe werkt AJAX?**  
Met **AJAX** kun je gegevens uitwisselen met een server op de achtergrond. Dit zorgt ervoor dat een website sneller en interactiever wordt.  

**Bijvoorbeeld:**  
- **Zoekbalksuggesties**: Terwijl je typt in een zoekbalk, krijg je suggesties zonder dat de pagina herlaadt.  
- **Formulierverzending**: Een formulier kan worden ingediend zonder dat de gebruiker naar een nieuwe pagina gaat.  
- **Oneindig scrollen**: Meer content wordt geladen als je naar beneden scrolt, zoals op Instagram.  




  
## Installatie
1. git clone https://github.com/brancovanbeek/jouw-repo-naam.git
cd jouw-repo-naam
2. npm install
3. npm start
4. Ga naar http://localhost:8000

## Bronnen 

### **Algemene bronnen**  
- [MDN Web Docs - HTML](https://developer.mozilla.org/en-US/docs/Web/HTML)  
- [MDN Web Docs - CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)  
- [MDN Web Docs - JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)  
- [MDN Web Docs - Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)  

### **JavaScript & Asynchrone verwerking**  
- [JavaScript Event Listeners](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events)  
- [Handling Forms with Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)  

### **Node.js & Express**  
- [Node.js Documentatie](https://nodejs.org/en/docs)  
- [Express.js - Getting Started](https://expressjs.com/en/starter/installing.html)  
- [Using Fetch in Node.js](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)  

### **API & Data Handling**  
- [Directus API Documentation](https://docs.directus.io/)  
- [REST API Best Practices](https://restfulapi.net/)  



## Licentie

This project is licensed under the terms of the [MIT license](./LICENSE).
