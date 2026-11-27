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

**Current implementation:** The project displays recipe groups and their individual recipes using data stored in a separate JSON file. Employees can expand recipe groups, view recipe details, and mark recipes as completed. The application also tracks overall completion and handles errors when recipe data cannot be loaded. Employees can use a form to add new recipe groups with recipes, yields, and ingredients during the current page session. A reusable `renderGroup()` function displays both loaded and newly added groups, and the overall recipe total updates when new recipes are added. After successful submission, the form clears its input values and returns to one recipe entry with one ingredient entry. The form is created only once, while recipe groups and the completion counter are rebuilt after a successful Retry. Shared counter variables keep Add and Done interactions consistent after reloading.

Accessibility improvements include associated input labels, input names, visible keyboard focus, improved color contrast, managed focus, descriptive button names, synchronized expanded states, live announcements, and text-based group completion indicators. These improvements were manually tested using keyboard navigation, DevTools, and Windows Narrator in Google Chrome.

Recipe data and new groups are validated against `recipeGroups.schema.json` using Ajv. The form uses required fields, positive whole-number yields, positive numeric quantities (including decimals), and schema-driven measurement dropdowns. Failed validation preserves entered values and prevents changes to recipe data and counters. Successful submissions reset the form. Vite provides development and production builds; the application is deployed on [Vercel](https://interactive-prep-list.vercel.app/).

## Inputs, Steps, and Outputs

- **Inputs:** Recipe data from `recipeGroups.json`, DOM events, Show More/Hide All buttons, Details/Hide buttons, recipe completion checkboxes, the Retry button, and the Add Recipe form inputs and buttons.
- **Steps:**
  <ol type="1">
    <li>Retrieve recipe data from <code>recipeGroups.json</code> using <code>fetch()</code>.</li>
    <li>Check whether the request was successful, convert the response into JavaScript data, and validate it against the JSON Schema before replacing existing data.</li>
    <li>Display recipe groups with a Show More button to expand their recipes in a predetermined order.</li>
    <li>Allow employees to expand an incomplete recipe to view its yield, ingredients, and quantities.</li>
    <li>Allow employees to mark a recipe complete using its checkbox.</li>
    <li>Update the recipe's completion status, hide its details button, details, and checkbox, grey out the recipe, and increment the completed recipe counter.</li>
    <li>When all recipes in a group are completed, grey out the group name and append “is complete” while allowing the group to remain expandable.</li>
    <li>If recipe data fails to load, display an appropriate error message and Retry button.</li>
    <li>If a refresh fails after recipes have already loaded, keep the previously loaded recipes visible.</li>
    <li>When loading succeeds, clear the error message, hide the Retry button, remove the previous recipe elements and counter, and rebuild the list without duplicating the Add Recipe form.</li>
    <li>Reset the shared completion and total recipe counts before recalculating the totals, and place the new counter above the recipe groups.</li>
    <li>Allow employees to enter a new recipe group, add multiple recipes, and enter each recipe’s yield, ingredients, quantities, and units.</li>
    <li>When Add Recipe Group is clicked, check browser form validity, collect the form entries into a new recipe group, and validate the group against the schema. If validation succeeds, add the group to the in-memory recipe data and display it above the form using the reusable rendering function.</li>
    <li>Increase the total number of recipes and refresh the displayed completion counter when new recipes are added.</li>
    <li>Reset the Add Recipe form after successful submission, clearing its inputs and removing extra recipe and ingredient entries while keeping one of each.</li>
    <li>Provide associated labels and names for inputs, visible keyboard focus, and descriptive form button text.</li>
    <li>Synchronize accessible toggle names and expanded states with visible button text and content visibility.</li>
    <li>Move focus to the next available control after completion and to newly added recipe or ingredient inputs.</li>
    <li>Announce counter changes politely and loading errors assertively through live regions.</li>
  </ol>
- **Outputs:** Page title, recipe completion counter, expandable and collapsible recipe groups, expandable recipe details, completion styling and text indicators, accessible button states, live announcements, loading error messages with a retry option, and an Add Recipe form that displays newly added groups, updates the total recipe count, and resets after successful submission.

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

### Example User Workflow

On the live application:

1. Expand **Berry Pancakes** using **Show More**.
2. Open **Details** and mark **Pancakes**, **Strawberry Topping**, and **Whipped Topping** as **Done**.
3. Expand **Breakfast Sandwich** and open **Details** for **Toasted English Muffins**.

The completion counter should show **3/20 recipes completed**. The completed recipes should be grey and display Done, and the grey group heading should read **Berry Pancakes is complete**, while Toasted English Muffins should display its yield and ingredients.

You can also use the form to add a group such as **Chicken and Waffles**, with recipes such as **Breaded Chicken Filets** and **Buttermilk Waffles**. Adding two recipes increases the total from 20 to 22; marking one Done increases the completed count by one.

### Validation and Deployment Test Cases

- **Missing required fields or an unselected measurement unit** - Browser validation blocks submission and preserves inputs.
- **Zero or fractional yield** - Browser validation rejects the value.
- **Negative quantity** - Browser validation rejects the value.
- **Zero quantity or whitespace-only name** - Ajv rejects the group without changing recipe data or counters.
- **Positive decimal quantity** - Valid data is accepted and rendered.
- **Multiple schema errors** - Ajv reports all detected errors in the console.
- **Measurement dropdowns** - All 17 schema units are available, including in newly added ingredient entries; successful reset restores the placeholder.
- **Production smoke test** - Local production preview and live Vercel deployment passed manual checks. Live checks confirmed that all 20 initial recipes loaded with the expected styling, recipe details toggled correctly, the completion counter updated, valid groups were accepted, invalid submissions preserved inputs, and no unexpected console errors occurred.

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

Testing observations from before the numeric input validation updates: Narrator reported zero minimum and maximum values for the numeric yield input, although entered values were readable. It also announced the page title and browser once when adding an ingredient; subsequent attempts did not reproduce this. The causes remain unconfirmed. These tests are not a formal WCAG compliance audit.

## Pseudocode

```text
CREATE empty loading error paragraph with assertive live announcements
KEEP error paragraph available and initially hide Retry button

FUNCTION loadRecipes
  TRY
    FETCH recipeGroups.json
    CHECK whether the response was successful
    CONVERT response to JavaScript data
    VALIDATE data against JSON Schema
    IF invalid, THROW loading error

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
    SET required fields and numeric constraints
    POPULATE measurement dropdowns from schema enum
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
    CHECK browser form validity
    IF invalid, RETURN without resetting form
    CREATE a new group from form values
    FOR EACH recipe entry
      CREATE recipe with its yield
      FOR EACH ingredient entry
        READ quantity as a number
        ADD ingredient, quantity, and unit to recipe
      ADD recipe to new group
    VALIDATE new group against JSON Schema
    IF invalid, LOG validation errors and RETURN without resetting form
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
- [x] Reset the Add Recipe form after successful submission, including removal of extra recipe and ingredient entries.
- [x] Test that the form returns to one empty recipe and ingredient entry after successful submission.
- [x] Prevent duplicate Add Recipe forms after successful Retry.
- [x] Keep the completion counter above recipe groups after Retry.
- [x] Share counter variables across Add and Done event listeners and reset them when loaded data is rebuilt.
- [x] Test adding and completing recipes after Retry, including a second Retry.

### Accessibility Progress

- [x] Associate labels with form inputs and completion checkboxes, and add form input names.
- [x] Add visible keyboard focus styling and improved color contrast.
- [x] Manage keyboard focus after recipe completion and when adding recipe or ingredient fields.
- [x] Add descriptive accessible names (`aria-label`) and synchronized expanded states (`aria-expanded`) to recipe toggle buttons.
- [x] Rename form buttons to clarify their actions.
- [x] Add polite live announcements for completion counter changes and assertive announcements for loading errors. The error paragraph remains present and is cleared after successful loading.
- [x] Add text-based group completion indicators so completion does not rely on color alone.
- [x] Test keyboard navigation, focus management, toggle attributes, live regions, and completion indicators.
- [x] Complete planned Windows Narrator testing and document observations.

### Validation and Deployment Progress

- [x] Add form input validation, including appropriate numeric input limits.
- [x] Create a JSON Schema to define the required structure and data types for recipe data.
- [x] Implement JSON Schema validation for loaded data and new recipe groups using Ajv.
- [x] Populate measurement dropdowns from the schema.
- [x] Test browser validation, schema validation, form reset, and regression behavior.
- [x] Integrate Vite and move recipe data into `public/`.
- [x] Build and test the local production preview.
- [x] Deploy to Vercel and pass live production smoke tests.
- [x] Replace GitHub Pages with Vercel as the primary hosting platform.
- [x] Disable the old GitHub Pages deployment.

## Deployment Configuration

- Production URL: [Interactive Prep List](https://interactive-prep-list.vercel.app/).
- Vercel Hobby plan; Vite preset; repository root; `dist` output; automatic install and build settings.
- Production branch: `main`. No environment variables required.

## Future Improvements

- [ ] Implement local storage to preserve user-entered recipe data and completion status between page visits.
- [ ] Add the ability to edit and remove recipe groups and recipes.
- [ ] Add field-specific browser validation messages and accessible, user-facing schema validation feedback.

## Long-Term Development Roadmap

- [ ] Build an inventory tracker as a separate application.
- [ ] Build an ordering monitor as a separate application.
- [ ] Learn PostgreSQL and implement it for persistent storage.
- [ ] Develop a Python backend to connect the applications to PostgreSQL.
- [ ] Set up cloud database hosting, potentially using Neon.
- [x] Deploy the web application using Vercel.
- [ ] Integrate the recipe prep list, inventory tracker, and ordering monitor into one application.
