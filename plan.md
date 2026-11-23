# CAPSTONE PLAN

## Questions

- Is the prep list the same every day?
- Should the list include ingredients?
- Should the list include quantities?
- Is there more than one food station?
- Is there more than one shift per day?
- Should the tasks be marked completed?
- Should it track completed recipes?

## Project Overview

**The request:** I need a daily prep list that can tell kitchen employees what recipes to prep for the day.

**Questions to ask (with the answers):** See questions above.  
**Answers:** Yes, Yes, Yes, No, No, Yes, Yes

**Current implementation:** The project displays recipe groups and their individual recipes using data stored in a separate JSON file. Employees can expand recipe groups, view recipe details, and mark recipes as completed. The application also tracks overall completion and handles errors when recipe data cannot be loaded. Employees can use a form to add new recipe groups with recipes, yields, and ingredients during the current page session. A reusable `renderGroup()` function displays both loaded and newly added groups, and the overall recipe total updates when new recipes are added. After submission, the form clears its input values and returns to one recipe entry with one ingredient entry.

## Inputs, Steps, and Outputs

- **Inputs:** Recipe data from `recipeGroups.json`, DOM events, Show More/Hide All buttons, Details/Hide buttons, recipe completion checkboxes, the Retry button, and the Add Recipe form inputs and buttons.
- **Steps:**
  <ol type="1">
    <li>Retrieve recipe data from <code>recipeGroups.json</code> using <code>fetch()</code>.</li>
    <li>Check whether the request was successful and convert the response into JavaScript data.</li>
    <li>Display recipe groups with a Show More button to expand their recipes in a predetermined order.</li>
    <li>Allow employees to expand an incomplete recipe to view its yield, ingredients, and quantities.</li>
    <li>Allow employees to mark a recipe complete using its checkbox.</li>
    <li>Update the recipe's completion status, hide its details button, details, and checkbox, grey out the recipe, and add one to the recipes-completed counter.</li>
    <li>When all recipes in a group are completed, grey out the group name while allowing the group to remain expandable.</li>
    <li>If recipe data fails to load, display an appropriate error message and Retry button.</li>
    <li>If a refresh fails after recipes have already loaded, keep the previously loaded recipes visible.</li>
    <li>When loading succeeds, hide the error message, remove the previous recipe elements and counter, and rebuild the list.</li>
    <li>Allow employees to enter a new recipe group, add multiple recipes, and enter each recipe’s yield, ingredients, quantities, and units.</li>
    <li>When Add is clicked, collect the form entries into a new recipe group, add it to the in-memory recipe data, and display it above the form using the reusable rendering function.</li>
    <li>Increase the total number of recipes and refresh the displayed completion counter when new recipes are added.</li>
    <li>Reset the Add Recipe form after submission, clearing its inputs and removing extra recipe and ingredient entries while keeping one of each.</li>
  </ol>
- **Outputs:** Page title, recipe completion counter, expandable and collapsible recipe groups, expandable recipe details, completion styling, loading error messages with a retry option, and an Add Recipe form that displays newly added groups, updates the total recipe count, and resets after submission.

## Test Cases (Input, Expected Result, Why)

- **Berry Pancakes group - Pancakes, complete: false, expanded: true** - Displays the recipe name, Hide button, yield, ingredients, quantities, and checkbox because the recipe has not been completed and its details have been expanded.
- **Berry Pancakes group - Whipped Topping, complete: false, checkbox checked: true** - The recipe name is greyed out, its details and checkbox are hidden, and the overall completion counter increases by one because the recipe is marked complete.
- **Breakfast Sandwich group - Toasted English Muffins, complete: false, collapsed: true** - Displays the recipe name and Details button because the recipe has not been expanded or completed.
- **Berry Pancakes group, all recipes completed, expanded: true** - The group name is greyed out. The group can still be expanded to show its completed recipes, and the Show More button changes to Hide All.
- **Initial JSON loading failure** - Displays an error message and Retry button because no recipe data was successfully loaded.
- **Failed refresh after a successful load** - Displays a refresh error message while keeping previously loaded recipes visible so employees do not lose access to the existing list.
- **Successful retry after a loading failure** - Hides the error message and Retry button, then displays the recipe groups and completion counter without duplicating existing elements.

- **Add a group with two recipes** - Displays the new group above the form, allows its recipes to expand and be marked complete, and increases the total recipe count by two.
- **Complete a newly added recipe** - Increases the completed count by one without changing the total number of recipes.
- **Submit a group with multiple recipes and ingredients** - Clears the form inputs and removes additional recipe and ingredient sections, leaving one empty recipe section with one ingredient section for the next entry.

## Pseudocode

```text
FUNCTION loadRecipes
  TRY
    FETCH recipeGroups.json
    CHECK whether the response was successful
    CONVERT response to JavaScript data

    HIDE loading error message and Retry button
    REMOVE previously displayed recipe groups and counter
    CALL initApp

  CATCH loading error
    DISPLAY error message

    IF no recipe groups are currently displayed
      DISPLAY initial loading error
    ELSE
      DISPLAY refresh error
      KEEP previously loaded recipes visible

    DISPLAY Retry button

FUNCTION initApp
  CALCULATE total number of recipes
  DISPLAY completion counter

  CREATE and APPEND Add Recipe form

  DEFINE renderGroup(group)
    DISPLAY group name
    DISPLAY group Show More button

    IF recipe group is expanded
      DISPLAY recipe list

    FOR EACH recipe in group
      DISPLAY recipe name
      DISPLAY recipe Details button

      IF recipe is complete
        GREY out recipe name
        HIDE recipe details and checkbox

      ELSE
        IF recipe details are expanded
          DISPLAY yield, ingredients, and quantities
          DISPLAY checkbox

        WHEN recipe checkbox changes
          UPDATE recipe completion status

          IF recipe is complete
            HIDE recipe details and checkbox
            GREY out recipe name
            ADD to recipe completion counter
            ADD to overall completion counter

    IF all recipes in group are complete
      GREY out group name

  FOR EACH recipe group
    CALL renderGroup(group)

  BUILD form inputs for recipe group, recipes, yields, and ingredients
  ALLOW additional recipe and ingredient entries

  WHEN Add button is clicked
    CREATE a new group from form values
    FOR EACH recipe entry
      CREATE recipe with its yield
      FOR EACH ingredient entry
        ADD ingredient, quantity, and unit to recipe
      ADD recipe to new group
    ADD new group to recipe data
    INCREASE total recipe count by number of new recipes
    UPDATE displayed completion counter
    CALL renderGroup(new group)
    RESET form input values
    REMOVE all recipe entries except the first
    REMOVE all ingredient entries except the first in the remaining recipe

WHEN Retry button is clicked
  CALL loadRecipes
```

## Current Progress

- [x] Build the recipe group and recipe display.
- [x] Add expandable and collapsible recipe groups.
- [x] Add expandable recipe details.
- [x] Display recipe yields, ingredients, and quantities.
- [x] Add recipe completion checkboxes.
- [x] Track completed recipes with an overall counter.
- [x] Grey out completed recipes and recipe groups.
- [x] Move recipe data into a separate JSON file.
- [x] Load recipe data using `fetch()`.
- [x] Add error handling for unsuccessful recipe-data loading.
- [x] Add a Retry button.
- [x] Preserve previously loaded recipes when a refresh fails.
- [x] Test loading errors, successful retries, and the prevention of duplicated recipe elements.

- [x] Add a form to create recipe groups and individual recipes.
- [x] Extract reusable `renderGroup()` logic for existing and newly added recipe groups.
- [x] Update the total recipe counter when new recipes are added.
- [x] Test displaying and completing newly added recipes.
- [x] Reset the Add Recipe form after submission, including removal of extra recipe and ingredient entries.
- [x] Test that the form returns to one empty recipe and ingredient entry after submission.

## Future Improvements

- [ ] Implement Local Storage to preserve user-entered recipe data and completion status between page visits.
- [ ] Create a JSON Schema to define the required structure and data types for recipe data.
- [ ] Implement JSON Schema validation to ensure recipe data follows the defined structure and uses the correct data types.
- [ ] Build an inventory tracker as a separate application.
- [ ] Build an ordering monitor as a separate application.
- [ ] Learn PostgreSQL and implement it for persistent storage.
- [ ] Develop a Python backend to connect the applications to PostgreSQL.
- [ ] Set up cloud database hosting, potentially using Neon.
- [ ] Deploy the web application using Vercel.
- [ ] Integrate the recipe prep list, inventory tracker, and ordering monitor into one application.
