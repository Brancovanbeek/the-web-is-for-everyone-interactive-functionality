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
-Naam van het lid
-Locatie
-Aantal werknemers (bijv. "10-24 werknemers")
Na het invullen en verzenden wordt het lid als een kaart weergegeven op de ledenpagina.
Als verplichte velden niet zijn ingevuld, krijg ik een foutmelding.
Ik krijg een bevestiging dat mijn toevoeging is verzonden en een melding als deze wordt goedgekeurd of afgewezen.

## Kenmerken
<!-- Bij Kenmerken staat welke technieken zijn gebruikt en hoe. Wat is de HTML structuur? Wat zijn de belangrijkste dingen in CSS? Wat is er met JS gedaan en hoe? Misschien heb je iets met NodeJS gedaan, of heb je een framework of library gebruikt? -->
### **Kenmerken**  

#### **HTML**  
- De pagina gebruikt een **filter- en zoekfunctionaliteit** met `<form>`-elementen en `<select>`-velden.  
- Leden worden dynamisch ingeladen met een **Liquid-loop (`{% for lid in leden %}`)** en weergegeven in een grid.  
- Een **formulier** stelt gebruikers in staat om nieuwe leden toe te voegen.  
- **Voorwaardelijke rendering** wordt toegepast voor succes- en foutmeldingen.  

#### **CSS**  
- De loader gebruikt een **CSS-animatie (`@keyframes spin`)** voor visuele feedback tijdens het laden.  
- **Responsief design**, zodat de pagina goed werkt op verschillende schermformaten.  

#### **JavaScript**  
- **Fetch API** wordt gebruikt om **leden op te halen** en te filteren op provincie, omvang en sorteervolgorde.  
- **Form enhancement** met JavaScript: bij het indienen van een formulier wordt de **pagina niet herladen**, maar wordt de nieuwe state met JavaScript ingeladen.  
- **Event listeners** vangen `submit`-events op en zorgen ervoor dat formulieren asynchroon worden verwerkt.  

#### **Node.js & Express**  
- De **Express-server** handelt API-aanroepen af en verwerkt filters en sorteringen via queryparameters.  
- **Data wordt opgehaald** van een externe API (`fdnd-agency.directus.app`).  
- Nieuwe leden worden via een **POST-request** aan de database toegevoegd.
  
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
