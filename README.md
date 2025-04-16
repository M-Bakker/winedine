# WineDine 

**WineDine** is de digitale sommelier die je precies vertelt welke wijnen passen bij de gerechten die je maakt. Je laat de
app weten welk gerecht je op de planning hebt en WineDine geeft je vervolgens een mooi overzicht van wijnen die hier
goed mee samen gaan. Selecteer een wijn om hier meer informatie over te lezen. Ben je overtuigd? Volg dan de link om
deze wijn te kopen. Heb je meerdere wijnen die je interesse wekken? Of behoort een wijn tot de toppers na deze te
proeven? Voeg deze dan toe aan jouw persoonlijke favorietenlijstje. Zo zul je altijd een goede indruk maken op je
vrienden. WineDine, de sommelier op zak.

##  Features

-  Zoek op gerecht en vind passende wijnsuggesties
-  Bekijk aanbevolen wijncategorieën en wijnen
-  Beschrijvingen, prijs en beoordelingen per wijn
-  Registratie & login

## Technologieën

- React (Vite)
- React Router DOM
- Axios
- JWT-decode
- Spoonacular API
- CSS Modules

## Installatie

1. **Clone de repository naar WebStorm**
   ```bash
   git clone https://github.com/M-Bakker/winedine.git
   cd winedine

2. **Installeer de basis-dependencies**

```npm install```

3. **Installeer de extra benodigde packages**

```npm install react-router-dom axios jwt-decode```

4. **Maak een account aan op https://spoonacular.com/food-api/**

- Ga naar https://spoonacular.com/food-api/
- Maak een account aan
- Ga naar My Console
- Ga naar Profile & API Key
- Kopiëer de API Key

5 **Voeg een `.env` bestand toe om je API key in op te slaan**

- Run het volgende commando
   ```bash
   echo "VITE_SPOONACULAR_API_KEY=your_api_key_here" > .env
- Open het env. bestand in je projectmap
- Vervang your_api_key_here met de API Key die je hebt gekopieerd van Spoonacular

6. Start de applicatie

```npm run dev```

7. Open de applicatie in je webbrowser

Ga naar: http://localhost:5173/

8. Login of registreer een nieuwe gebruiker

**Veel plezier!**