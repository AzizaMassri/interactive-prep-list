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

**Current implementation:** The project displays recipe groups and their individual recipes using data stored in a separate JSON file. Employees can expand recipe groups, view recipe details, and mark recipes as completed. The application also tracks overall completion and handles errors when recipe data cannot be loaded.

## Inputs, Steps, and Outputs

- **Inputs:** Recipe data from `recipeGroups.json`, DOM events, Show More/Hide All buttons, Details/Hide buttons, recipe completion checkboxes, and the Retry button.
- **Steps:**
  1. Retrieve recipe data from `recipeGroups.json` using `fetch()`.
  2. Check whether the request was successful and convert the response into JavaScript data.
  3. Display recipe groups with a Show More button to expand their recipes in a predetermined order.
  4. Allow employees to expand an incomplete recipe to view its yield, ingredients, and quantities.
  5. Allow employees to mark a recipe complete using its checkbox.
  6. Update the recipe's completion status, hide its details button, details, and checkbox, grey out the recipe, and add one to the recipes-completed counter.
  7. When all recipes in a group are completed, grey out the group name while allowing the group to remain expandable.
  8. If recipe data fails to load, display an appropriate error message and Retry button.
  9. If a refresh fails after recipes have already loaded, keep the previously loaded recipes visible.
  10. When loading succeeds, hide the error message, remove the previous recipe elements and counter, and rebuild the list.
- **Outputs:** Page title, recipe completion counter, expandable and collapsible recipe groups, expandable recipe details, completion styling, and loading error messages with a retry option.

## Test Cases (Input, Expected Result, Why)

- **Berry Pancakes group - Pancakes, complete: false, expanded: true** - Displays the recipe name, Hide button, yield, ingredients, quantities, and checkbox because the recipe has not been completed and its details have been expanded.
- **Berry Pancakes group - Whipped Topping, complete: false, checkbox checked: true** - The recipe name is greyed out, its details and checkbox are hidden, and the overall completion counter increases by one because the recipe is marked complete.
- **Breakfast Sandwich group - Toasted English Muffins, complete: false, collapsed: true** - Displays the recipe name and Details button because the recipe has not been expanded or completed.
- **Berry Pancakes group, all recipes completed, expanded: true** - The group name is greyed out. The group can still be expanded to show its completed recipes, and the Show More button changes to Hide All.
- **Initial JSON loading failure** - Displays an error message and Retry button because no recipe data was successfully loaded.
- **Failed refresh after a successful load** - Displays a refresh error message while keeping previously loaded recipes visible so employees do not lose access to the existing list.
- **Successful retry after a loading failure** - Hides the error message and Retry button, then displays the recipe groups and completion counter without duplicating existing elements.

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

  FOR EACH recipe group
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

## Future Improvements

- [ ] Add a form to create recipe groups and individual recipes.
- [ ] Add Local Storage to preserve user-entered data and completion status between page visits.