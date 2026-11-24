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

**Current implementation:** The project displays recipe groups and their individual recipes using data stored in a separate JSON file. Employees can expand recipe groups, view recipe details, and mark recipes as completed. The application also tracks overall completion and handles errors when recipe data cannot be loaded. Employees can use a form to add new recipe groups with recipes, yields, and ingredients during the current page session. A reusable `renderGroup()` function displays both loaded and newly added groups, and the overall recipe total updates when new recipes are added. After submission, the form clears its input values and returns to one recipe entry with one ingredient entry. The form is created only once, while recipe groups and the completion counter are rebuilt after a successful Retry. Shared counter variables keep Add and Done interactions consistent after reloading.

Accessibility improvements include associated input labels, input names, visible keyboard focus, improved color contrast, managed focus, descriptive button names, synchronized expanded states, live announcements, and text-based group completion indicators. These improvements were manually tested using keyboard navigation, DevTools, and Windows Narrator in Google Chrome.

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
    <li>When all recipes in a group are completed, grey out the group name and append “is complete” while allowing the group to remain expandable.</li>
    <li>If recipe data fails to load, display an appropriate error message and Retry button.</li>
    <li>If a refresh fails after recipes have already loaded, keep the previously loaded recipes visible.</li>
    <li>When loading succeeds, clear the error message, hide the Retry button, remove the previous recipe elements and counter, and rebuild the list without duplicating the Add Recipe form.</li>
    <li>Reset the shared completion and total recipe counts before recalculating the totals, and place the new counter above the recipe groups.</li>
    <li>Allow employees to enter a new recipe group, add multiple recipes, and enter each recipe’s yield, ingredients, quantities, and units.</li>
    <li>When Add Recipe Group is clicked, collect the form entries into a new recipe group, add it to the in-memory recipe data, and display it above the form using the reusable rendering function.</li>
    <li>Increase the total number of recipes and refresh the displayed completion counter when new recipes are added.</li>
    <li>Reset the Add Recipe form after submission, clearing its inputs and removing extra recipe and ingredient entries while keeping one of each.</li>
    <li>Provide associated labels and names for inputs, visible keyboard focus, and descriptive form button text.</li>
    <li>Synchronize accessible toggle names and expanded states with visible button text and content visibility.</li>
    <li>Move focus to the next available control after completion and to newly added recipe or ingredient inputs.</li>
    <li>Announce counter changes politely and loading errors assertively through live regions.</li>
  </ol>
- **Outputs:** Page title, recipe completion counter, expandable and collapsible recipe groups, expandable recipe details, completion styling and text indicators, accessible button states, live announcements, loading error messages with a retry option, and an Add Recipe form that displays newly added groups, updates the total recipe count, and resets after submission.

## Test Cases (Input, Expected Result, Why)

- **Berry Pancakes group - Pancakes, complete: false, expanded: true** - Displays the recipe name, Hide button, yield, ingredients, quantities, and checkbox because the recipe has not been completed and its details have been expanded.
- **Berry Pancakes group - Whipped Topping, complete: false, checkbox checked: true** - The recipe name is greyed out, its details and checkbox are hidden, and the overall completion counter increases by one because the recipe is marked complete.
- **Breakfast Sandwich group - Toasted English Muffins, complete: false, collapsed: true** - Displays the recipe name and Details button because the recipe has not been expanded or completed.
- **Berry Pancakes group, all recipes completed, expanded: true** - The group name is greyed out and displays “is complete.” The group can still be expanded to show its completed recipes, and the Show More button changes to Hide All.
- **Initial JSON loading failure** - Displays an error message and Retry button because no recipe data was successfully loaded.
- **Failed refresh after a successful load** - Displays a refresh error message while keeping previously loaded recipes visible so employees do not lose access to the existing list.
- **Successful retry after a loading failure** - Clears the error message and hides the Retry button, then displays the recipe groups and completion counter without duplicating recipe groups or the Add Recipe form.
- **Failed refresh followed by Retry** - Keeps existing recipes visible during the failure, then replaces the displayed groups and counter on success while leaving one Add Recipe form.
- **Add and complete recipes after Retry** - Adds one recipe to the total and increases the completed count when Done is selected, including for a newly added recipe and an existing recipe.
- **Repeat Retry after adding and completing recipes** - Reloads the original JSON recipes, resets unsaved additions and completion progress, and allows Add and Done to update the same visible counter correctly.

- **Add a group with two recipes** - Displays the new group above the form, allows its recipes to expand and be marked complete, and increases the total recipe count by two.
- **Complete a newly added recipe** - Increases the completed count by one without changing the total number of recipes.
- **Submit a group with multiple recipes and ingredients** - Clears the form inputs and removes additional recipe and ingredient sections, leaving one empty recipe section with one ingredient section for the next entry.

### Accessibility Test Cases

- **Keyboard navigation** - Controls are reachable and focus is visible; completing a recipe moves focus to the next available control, skipping hidden controls.
- **Add a New Ingredient / Add a New Recipe** - New fields receive focus and Narrator identifies the input.
- **Recipe group and recipe toggles** - Accessible names and expanded states match visible text and state on initial display, expansion, and collapse. Narrator announces the recipe or group name and state.
- **Complete a recipe** - The Done indicator remains visible and Narrator announces the updated counter after the next focused recipe.
- **Complete a group** - The heading displays “is complete” even when collapsed; a partially completed group retains its original heading. Narrator reads the completed heading when navigated to.
- **Loading errors and retries** - The assertive live region retains its attribute, displays the appropriate error, and clears on success. Narrator automatically announces the initial loading error.
- **Form controls and recipe contents** - Narrator reads recipe yields, ingredients, quantities, checkbox labels, form labels, entered values, and button names. Renamed form buttons retain their functionality.

### Accessibility Testing Observations

Manual testing with Windows Narrator in Google Chrome confirmed recipe toggle names and states, recipe details and checkbox readability, completion counter announcements, focus movement, group completion heading readability, form labels and values, newly added field announcements, and the automatic initial loading error announcement. DevTools testing also verified live region attributes and error message updates during failed loads and retries.

Testing observations: Narrator reported zero minimum and maximum values for the numeric yield input, although entered values were readable. It also announced the page title and browser once when adding an ingredient; subsequent attempts did not reproduce this. The causes remain unconfirmed. These tests are not a formal WCAG compliance audit.

## Pseudocode

```text
CREATE empty loading error paragraph with assertive live announcements
KEEP error paragraph available and initially hide Retry button

FUNCTION loadRecipes
  TRY
    FETCH recipeGroups.json
    CHECK whether the response was successful
    CONVERT response to JavaScript data

    CLEAR loading error message
    HIDE Retry button
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
  RESET shared total and completed counters to zero
  CALCULATE total number of recipes from loaded data
  CREATE completion counter element with polite live announcements
  FIND existing Add Recipe form

  IF Add Recipe form does not exist
    CREATE and APPEND Add Recipe form
    BUILD form inputs for recipe group, recipes, yields, and ingredients
    ASSOCIATE labels with inputs and assign input names
    ALLOW additional recipe and ingredient entries
    FOCUS newly added recipe or ingredient input when its add button is clicked
    REGISTER Add Recipe Group button event listener

  DEFINE renderGroup(group)
    DISPLAY group name
    DISPLAY group Show More button
    SET accessible name using group name and button text
    SET expanded state to false
    WHEN group button is clicked
      TOGGLE recipe list visibility
      UPDATE button text, accessible name, and expanded state

    IF recipe group is expanded
      DISPLAY recipe list

    FOR EACH recipe in group
      DISPLAY recipe name
      DISPLAY recipe Details button
      SET accessible name using recipe name and button text
      SET expanded state to false
      ASSOCIATE Done label with checkbox
      WHEN recipe details button is clicked
        TOGGLE details visibility
        UPDATE button text, accessible name, and expanded state

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
            ADD to shared overall completion counter
            UPDATE current displayed completion counter
            KEEP Done label visible and bold
            FOCUS next available visible button or input

    IF all recipes in group are complete
      GREY out group name
      APPEND "is complete" to group heading

  INSERT completion counter before Add Recipe form
  FOR EACH recipe group
    CALL renderGroup(group)

  WHEN Add Recipe Group button is clicked (listener registered when form was created)
    CREATE a new group from form values
    FOR EACH recipe entry
      CREATE recipe with its yield
      FOR EACH ingredient entry
        ADD ingredient, quantity, and unit to recipe
      ADD recipe to new group
    ADD new group to recipe data
    INCREASE total recipe count by number of new recipes
    FIND current displayed completion counter
    UPDATE its text using shared counter values
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
- [x] Prevent duplicate Add Recipe forms after successful Retry.
- [x] Keep the completion counter above recipe groups after Retry.
- [x] Share counter variables across Add and Done event listeners and reset them when loaded data is rebuilt.
- [x] Test adding and completing recipes after Retry, including a second Retry.

### Accessibility Progress

- [x] Associated labels with form inputs and completion checkboxes, and added form input names.
- [x] Added visible keyboard focus styling and improved color contrast.
- [x] Managed keyboard focus after recipe completion and when adding recipe or ingredient fields.
- [x] Added descriptive accessible names (`aria-label`) and synchronized expanded states (`aria-expanded`) to recipe toggle buttons.
- [x] Renamed form buttons to clarify their actions.
- [x] Added polite live announcements for completion counter changes and assertive announcements for loading errors. The error paragraph remains present and is cleared after successful loading.
- [x] Added text-based group completion indicators so completion does not rely on color alone.
- [x] Test keyboard navigation, focus management, toggle attributes, live regions, and completion indicators.
- [x] Complete planned Windows Narrator testing and document observations.

## Future Improvements

- [ ] Implement Local Storage to preserve user-entered recipe data and completion status between page visits.
- [ ] Add the ability to edit and remove recipe groups and recipes.
- [ ] Add form input validation, including appropriate numeric input limits.
- [ ] Create a JSON Schema to define the required structure and data types for recipe data.
- [ ] Implement JSON Schema validation to ensure recipe data follows the defined structure and uses the correct data types.

## Long-Term Development Roadmap

- [ ] Build an inventory tracker as a separate application.
- [ ] Build an ordering monitor as a separate application.
- [ ] Learn PostgreSQL and implement it for persistent storage.
- [ ] Develop a Python backend to connect the applications to PostgreSQL.
- [ ] Set up cloud database hosting, potentially using Neon.
- [ ] Deploy the web application using Vercel.
- [ ] Integrate the recipe prep list, inventory tracker, and ordering monitor into one application.
