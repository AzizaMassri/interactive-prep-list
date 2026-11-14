# Interactive Prep List

A kitchen management resource to track recipe completion. It's for professional kitchens relying on old school methods to track their prep.

## The problem

This tool helps reduce any confusion on what needs prepped for a day's service as well as tracks what is complete.

## How to run it

You need nothing installed.

1. Open the [live page]([https://azizamassri.github.io/interactive-prep-list/]).
2. When the page opens you see a page title, a completion counter and recipe groups with show more buttons by default.
   When you expand a recipe group you will see the recipes needed to complete the recipe group 
   Individual recipes then expand with a details button to show recipe yield, ingredients, quantities and their checkbox 
   When an individual recipe is marked done with a checkbox they no longer expandable, turn grey and add one to the counter at the top
   When recipe groups are completed, they still expand but they also turn grey.

Or click "Code", then "Download ZIP", unzip the folder, and open `index.html` in your browser.

## What it looks like when it works

```
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
Done
Poached Eggs
Details
```

## How I built it

- Written in JavaScript, HTML and CSS, first as a pen on CodePen, then kept here and published with GitHub Pages.
- The data is invented.
- I added a completion counter at the top of the page to track progress. 
- AI use: I used My Code Coach for explanations, hints, and troubleshooting with nested arrays and objects, nested loops, DOM manipulation, event listeners, completion logic, and counters.
  I also received help with applying CSS classes to JavaScript-created elements, mobile button styling, and code cleanup.
  I kept the guidance I understood and could implement myself, and postponed selector error handling because the project is still small.
  I wrote the JavaScript and CSS myself.

## What I would change next

- I would like to add the ability to input your own data for recipe groups and individual recipes.

## Files

- `index.html`: the page, which loads `style.css` and `script.js`
- `style.css`: Styles the page layout, page title, completion tracker, recipe groups, buttons, and recipe details.
- `script.js`: Contains the recipe data and JavaScript functionality for displaying recipes, expanding details, and tracking completion.
- `plan.md`: my capstone plan from the course
