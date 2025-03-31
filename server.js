// Importeer het npm package Express (uit de door npm aangemaakte node_modules map)
// Deze package is geïnstalleerd via `npm install`, en staat als 'dependency' in package.json
import express from 'express'

// Importeer de Liquid package (ook als dependency via npm geïnstalleerd)
import { Liquid } from 'liquidjs';

// Maak een nieuwe Express applicatie aan, waarin we de server configureren
const app = express()

// Maak werken met data uit formulieren iets prettiger
app.use(express.urlencoded({extended: true}))

// Gebruik de map 'public' voor statische bestanden (resources zoals CSS, JavaScript, afbeeldingen en fonts)
// Bestanden in deze map kunnen dus door de browser gebruikt worden
app.use(express.static('public'))

// Stel Liquid in als 'view engine'
const engine = new Liquid();
app.engine('liquid', engine.express());

// Stel de map met Liquid templates in
// Let op: de browser kan deze bestanden niet rechtstreeks laden (zoals voorheen met HTML bestanden)
app.set('views', './views')

// homepage
app.get('/', async function (request, response) {
  // Render index.liquid uit de Views map
  response.render('index.liquid'  )
})

// lid detail pagina
app.get('/leden/lid/:id', async function (request, response) {
  
  const apiResponse = await fetch('https://fdnd-agency.directus.app/items/dda_agencies/' + request.params.id)
  const apiResponseJSON = await apiResponse.json() 

  response.render('lid.liquid', { lidDetails: apiResponseJSON.data });
})



// leden overzichts pagina
// app.get('/leden', async function (request, response) {
//   const apiResponse = await fetch('https://fdnd-agency.directus.app/items/dda_agencies')
//   const apiResponseJSON = await apiResponse.json()

//   const extraLedenFetch = await fetch('https://fdnd-agency.directus.app/items/dda_messages?filter={%22text%22:%20{%22_contains%22:%22Branco_%22}}');
//   const extraLedenJSON = await extraLedenFetch.json()

//   let extraLeden = []
//   if (extraLedenJSON.data.length > 0) {
//     extraLeden = extraLedenJSON.data.map((lid) => {
//       return {
//         title: lid.text.replace('Branco_', ''),
//         address: lid.for,
//         colleagues: lid.from
//       }
//     })
//   }

//   const {provincie} = request.query;
//   console.log(request.query);


//   let apiResponseProvincie;

//   if (provincie === undefined || provincie === '') {
//     apiResponseProvincie = await fetch ('https://fdnd-agency.directus.app/items/dda_agencies');
//   } else {
//     apiResponseProvincie = await fetch ('https://fdnd-agency.directus.app/items/dda_agencies?filter[province_string][_eq]=' + request.query.provincie)
//   }

//   const apiResponseProvincieJSON = await apiResponseProvincie.json()

//   response.render('leden.liquid', { leden: [...apiResponseJSON.data, ...extraLeden] })
// })


app.get('/leden', async function (request, response) {
  // Verkrijg de filters uit de queryparameters
  const { provincie, omvang, sorteren } = request.query;

  // Basis URL voor de API-aanroep
  let apiUrl = 'https://fdnd-agency.directus.app/items/dda_agencies';

  // Als een provincie is opgegeven, voeg die toe aan de filter
  if (provincie && provincie !== '') {
    apiUrl += `?filter[province_string][_eq]=${provincie}`;
  }

  // Als sorteren is opgegeven, voeg dat toe
  if (sorteren && sorteren !== '') {
    const connector = apiUrl.includes('?') ? '&' : '?';
    if (sorteren === 'az') {
      apiUrl += `${connector}sort=title`;
    } else if (sorteren === 'za') {
      apiUrl += `${connector}sort=-title`;
    } else if (sorteren === 'colleagues') {
      apiUrl += `${connector}sort=colleagues`;
    }
  }

  // Haal de data op van de API
  const apiResponse = await fetch(apiUrl);
  const apiResponseJSON = await apiResponse.json();

  // Haal extra leden op (indien nodig)
  const extraLedenFetch = await fetch('https://fdnd-agency.directus.app/items/dda_messages?filter={%22text%22:%20{%22_contains%22:%22Branco_%22}}');
  const extraLedenJSON = await extraLedenFetch.json();

  let extraLeden = [];
  if (extraLedenJSON.data.length > 0) {
    extraLeden = extraLedenJSON.data.map((lid) => {
      return {
        title: lid.text.replace('Branco_', ''),
        address: lid.for,
        colleagues: lid.from
      };
    });
  }

  // Combineer de data van de agencies met de extra leden
  let leden = [...apiResponseJSON.data, ...extraLeden];

  // Render de data naar de view
  response.render('leden.liquid', { leden });
});


// // provincie filter
// app.get('/leden', async function (request, response) {
//   const apiResponse = await fetch('https://fdnd-agency.directus.app/items/dda_agencies?filter={"province_string" : "'+ request.params.id+'"} ')
//   const apiResponseJSON = await apiResponse.json()
//   console.log(request.params.id)
//   console.log(request.query);
 
//   response.render('leden.liquid', { leden: apiResponseJSON.data, succes_message: request.query.succes })
// })

// app.get('/leden/:id', async function (request, response) {
//   const apiResponse = await fetch('https://fdnd-agency.directus.app/items/dda_agencies?filter={"province_string" : "'+ request.params.id+'"} ')
//   const apiResponseJSON = await apiResponse.json()
//   console.log(request.params.id)
 
//   response.render('leden.liquid', { leden: apiResponseJSON.data })
// })


// sorteren
// app.get('/leden/zoeken/:wat', async function (request, response) {
//   let searcher;
//   if (request.params.wat == "az") {
//     searcher = 'title';
//   } else if (request.params.wat == "za") {
//     searcher = '-title';
//   } else if (request.params.wat == "colleagues") {
//     searcher = 'colleagues';
//   } else {
//     searcher = "";
//   }
  
//   const apiResponse = await fetch('https://fdnd-agency.directus.app/items/dda_agencies?sort=' + searcher);
//   const apiResponseJSON = await apiResponse.json();
//   console.log(request.params.wat);
  
//   response.render('leden.liquid', { leden: apiResponseJSON.data });
// });


// lid toevoegen
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

  // Als de fetch-aanroep succesvol is
  if (res.ok) {
    response.redirect(303, '/leden?succes=' + encodeURIComponent('Lid toegevoegd!'));
  } else {
    // Als de fetch-aanroep faalt
    response.redirect(303, '/leden?error=' + encodeURIComponent('Er is een fout opgetreden.'));
  }
});




// app.post('/leden/nieuw/toevoegen/', async function (request, response) {
//   await fetch('https://fdnd-agency.directus.app/items/dda_messages/', {
//     method: 'POST',
//     body: JSON.stringify({
//       text: "Branco_" + request.body.title,
//       for: request.body.address,
//       from: request.body.colleagues,
//     }),
//     headers: {
//       'Content-Type': 'application/json;charset=UTF-8'
//     }
//   });

//   response.redirect(303, '/leden?succes=Lid toegevoegd!');
// })

// app.post('/', (req, res) => {


/*
// Zie https://expressjs.com/en/5x/api.html#app.get.method over app.get()
app.get(…, async function (request, response) {
  
  // Zie https://expressjs.com/en/5x/api.html#res.render over response.render()
  response.render(…)
})
*/

/*
// Zie https://expressjs.com/en/5x/api.html#app.post.method over app.post()
app.post(…, async function (request, response) {

  // In request.body zitten alle formuliervelden die een `name` attribuut hebben in je HTML
  console.log(request.body)

  // Via een fetch() naar Directus vullen we nieuwe gegevens in

  // Zie https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch over fetch()
  // Zie https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify over JSON.stringify()
  // Zie https://docs.directus.io/reference/items.html#create-an-item over het toevoegen van gegevens in Directus
  // Zie https://docs.directus.io/reference/items.html#update-an-item over het veranderen van gegevens in Directus
  await fetch(…, {
    method: …,
    body: JSON.stringify(…),
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  });

  // Redirect de gebruiker daarna naar een logische volgende stap
  // Zie https://expressjs.com/en/5x/api.html#res.redirect over response.redirect()
  response.redirect(303, …)
})
*/




// Stel het poortnummer in waar Express op moet gaan luisteren
// Lokaal is dit poort 8000; als deze applicatie ergens gehost wordt, waarschijnlijk poort 80
app.set('port', process.env.PORT || 8000)

// Start Express op, gebruik daarbij het zojuist ingestelde poortnummer op
app.listen(app.get('port'), function () {
  // Toon een bericht in de console
  console.log(`Daarna kun je via http://localhost:${app.get('port')}/ jouw interactieve website bekijken.\n\nThe Web is for Everyone. Maak mooie dingen 🙂`)
})
