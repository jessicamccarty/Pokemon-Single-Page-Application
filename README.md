# Pokemon Browser: Development Log

**Deployed Page:**  
[LINK HERE](#)  

---

## Project Overview

This project is a responsive, single-page web application that displays the first 100 Pokémon using data from the [PokeAPI](https://pokeapi.co/). The app lets users browse through the Pokémon list, view detailed character cards, listen to their cry, and navigate with a carousel and keyboard controls styled with a fun, clean aesthetic inspired by the Pokedex.

---

## Steps Taken

### 1. **Set Up HTML/CSS Layout**
- Created a two-column responsive layout.
- Left panel holds the Pokémon list.
- Right panel displays the character card with a styled Pokedex-style background.
- Used custom fonts and color palette to give the app a fun, cartoon-inspired feel.

### 2. **Fetched 100 Pokémon from the PokeAPI**
- Used `fetch()` in `script.js` to retrieve the list of 100 Pokémon.
- Injected each name into the `.left-panel` as a list item.
- Capitalized names and made each item clickable to trigger detail view.

### 3. **Displayed Detailed Pokémon Cards**
- On click, fetched additional data from each Pokémon's URL.
- Rendered:
  - Name and ID (with Pokedex badge styling)
  - Sprite image
  - Ability list
  - Autoplaying cry (with low volume)

### 4. **Styled Pokemon List with Hover and Scroll**
- Clean, scrollable list that fits into its panel.
- Added hover effect and "active" selection highlight.

### 5. **Implemented Carousel (Previous/Next Buttons)**
- Added buttons below the right panel to navigate forward and backward through the list.
- Buttons are disabled appropriately at the first and last Pokemon.
- Used a shared `currentIndex` to track position.

### 6. **Keyboard Navigation**
- Used `keydown` listener to allow navigation with **←** and **→** arrow keys.
- Included `preventDefault()` to avoid scroll-jumping when keys are pressed.

### 7. **Loading Animation with Transparent APNG**
- Added a loading animation using a transparent **Pikachu APNG** centered in the card frame.
- Loader appears while Pokémon data is being fetched, then disappears with a fade-in card reveal.
- This added a super polished and playful experience.

---

## Challenges Faced

- **Dynamic background images** didn’t show due to CSS overrides and missing files. I later decided to keep the frame static and simplify the visuals — which worked out better in the end.
- **White box in loading GIF** was caused by GIF limitations. Fixed it by switching to an APNG for transparency.
- **Carousel layout** broke the right panel at first due to incorrect HTML nesting. Solved it by wrapping the right panel and buttons in a Flex column container.
- **JavaScript fade effect** initially caused the Pokémon list to stop working. I fixed it by separating logic and toggling `fade-in` correctly after rebuilding the DOM.

---


## What I Learned

- Working with APIs and handling async data with `fetch()`
- DOM manipulation: dynamically creating and replacing elements
- Responsive design with Flexbox
- Handling edge cases and UX (like disabling buttons and showing loaders)
- How small polish (animations, loaders, keyboard nav) can take a project from good to great

