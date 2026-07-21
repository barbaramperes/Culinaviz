# Culinaviz 🍽️

**Interactive data-visualisation website** exploring one question: *does the number of recipes a country produces correlate with its presence in elite world cuisine?*

**▶ Live demo:** https://barbaramperes.github.io/Culinaviz/

## What it is

Culinaviz applies Munzner's *What/Why/How* visualization framework to **5 stitched datasets** (recipe details, ingredients, compound ingredients, recipe–ingredient aliases, and the World's Best Restaurants ranking) and answers the question through **6 linked D3.js visualisations**:

1. **Dot-distribution world map** of the world's best restaurants, filterable by year
2. **Global Cuisine Map** (vector-dragging) showing recipe volume per country
3. **Bubble-chart hierarchy** of ingredient categories
4. **Radial ingredient networks**
5. **Ingredient bundling** diagram
6. **Cuisine distribution** views

**Conclusion:** culinary prestige is decoupled from recipe volume — French, Italian and Contemporary American cuisines dominate fine-dining rankings despite less recipe documentation than the US, India or Mexico.

## Tech

- **D3.js** for all visualisations
- Vanilla JavaScript, HTML, CSS (static site — no build step)
- Data preprocessing into JSON (`cuisine_distribution.json`, `ingredients_bundling.json`, `radial_ingredient_networks.json`, `top_ingredients.json`)

## Run locally

```bash
git clone https://github.com/barbaramperes/Culinaviz.git
cd Culinaviz
python3 -m http.server 8080   # any static server works
# open http://localhost:8080
```

## Context

Final project for **Data Visualization** (MSc Information Management, NOVA IMS, 2025). Team of 4 — my role: **D3.js developer & visual designer**.
