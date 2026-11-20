# Interactive Prep List

A kitchen management resource for tracking recipe preparation and completion. It's designed for professional kitchens that rely on traditional methods to organize daily prep.

## The problem

This tool helps reduce confusion about which recipes need to be prepared for a day's service while allowing kitchen employees to track what has been completed.

## How to run it

You need nothing installed to use the live version.

1. Open the [live page](https://azizamassri.github.io/interactive-prep-list/).
2. When the page opens, you will see a page title, a completion counter, and recipe groups with Show More buttons.
3. Expand a recipe group to see the individual recipes it contains.
4. Expand an individual recipe using its Details button to see the yield, ingredients, and quantities.
5. Mark a recipe complete using its checkbox. Completed recipes turn grey, their details and checkbox are hidden, and the completion counter increases.
6. Completed recipe groups also turn grey but can still be expanded to view their recipes.

If recipes cannot be loaded, an error message and Retry button appear. If a refresh fails after recipes have already loaded, the previously loaded recipes remain available.

To run a local copy, clone or download the repository and serve the project folder using a local development server. The JSON data is loaded with `fetch()`, so opening `index.html` directly as a local file may not work.

## What it looks like when it works

Follow these steps on the live page to reproduce the example below:

1. Expand the **Berry Pancakes** recipe group using its Show More button.
2. Click Details for **Pancakes**, then check Done.
3. Click Details for **Strawberry Topping**, then check Done.
4. Click Details for **Whipped Topping**, then check Done.
5. Expand the **Breakfast Sandwich** recipe group using its Show More button.
6. Click Details for **Toasted English Muffins** to display its yield and ingredients.
7. Leave the remaining recipes incomplete.

The page should now display:

```text
Prep List
3/20 recipes completed

Berry Pancakes
Hide All
Pancakes
Done
Strawberry Topping
Done
Whipped Topping
Done

Breakfast Sandwich
Hide All
Toasted English Muffins
Hide
20 Servings

English Muffins -- 20 each
Butter -- 200 g
Poached Eggs
Details
```

## How I built it

- Written in JavaScript, HTML, and CSS, first as a CodePen project and then developed and published with GitHub Pages.
- Recipe data is stored separately in `recipeGroups.json` and loaded using the Fetch API.
- The data is invented for this project.
- I added a completion counter to track progress across all recipes.
- I used DOM manipulation and event listeners to create expandable recipe groups, recipe details, and completion controls.
- I added error handling for failed recipe-data loading, including a Retry button and separate messages for initial loading failures and failed refreshes.
- **AI use:** I used My Code Coach for explanations, hints, and troubleshooting throughout development. Topics included nested arrays and objects, nested loops, DOM manipulation, event listeners, recipe completion logic, counters, loading data from JSON, and error handling.
  I also received guidance on applying CSS classes to JavaScript-created elements, mobile button styling, and code cleanup.
  I used the guidance to understand problems and implement my own solutions.
  I wrote the JavaScript and CSS myself.

## What I would change next

- Add the ability to enter new recipe groups and individual recipes through a form.
- Add Local Storage so recipe completion and user-entered data can persist between page visits.

## Files

- `index.html`: The page structure, which loads `style.css` and `script.js`.
- `style.css`: Styles the page layout, title, completion tracker, recipe groups, buttons, and recipe details.
- `script.js`: Loads the recipe data, creates the page elements, handles expanding and collapsing content, tracks recipe completion, and handles loading errors.
- `recipeGroups.json`: Stores the recipe groups, recipes, yields, completion statuses, and ingredients.
- `plan.md`: The capstone plan, updated to reflect the project's implementation and progress.