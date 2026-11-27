# Interactive Prep List

A responsive kitchen management application for organizing daily recipe preparation, tracking completion, and adding recipe groups as prep needs change. It is designed for professional kitchens that rely on traditional prep lists.

**[Launch the live application](https://interactive-prep-list.vercel.app/)**

## Features

- Expand recipe groups and view recipe yields, ingredients, quantities, and units.
- Mark recipes complete and track individual, group, and overall progress.
- Add groups with multiple recipes and ingredients using a validated form.
- Preserve form inputs after invalid submissions and reset the form after successful submissions.
- Retry failed data loads without losing previously displayed recipes.

**Current limitation:** Recipe additions and completion progress are stored in memory only. Reloading the page or successfully retrying a data load restores the original JSON data.

## Getting started

Use the live application without installing anything. Select **Show More** to expand a group, **Details** to view a recipe, and **Done** to mark it complete. Use the **Add a Recipe** form to create new groups.

To run locally, clone or download the repository, install Node.js and npm, and run these commands from the project folder:

```bash
npm install
npm run dev
```

Open the local URL printed by Vite. To build and preview the production version:

```bash
npm run build
npm run preview
```

Opening `index.html` directly is not supported by the module-based setup.

## Demos

Both demos show the core workflow. They predate the accessibility and validation updates, so some labels and styling may differ from the live application.

### Desktop

![Desktop demo of the Interactive Prep List](assets/desktop_prep_list.gif)

### Mobile

![Mobile demo of the Interactive Prep List](assets/mobile_prep_list.gif)

## Technical implementation

- **HTML, CSS, and JavaScript:** Responsive interface, dynamic DOM rendering, event handling, nested data structures, and shared completion counters.
- **Fetch API and JSON:** Load sample recipe data from a separate file with error handling and retry support.
- **Reusable rendering:** Display initial and user-added recipe groups through the same rendering function.
- **Ajv and JSON Schema:** Validate loaded data and new groups, enforce required fields and positive quantities, and populate measurement dropdowns from the schema.
- **Vite, Git, and GitHub:** Local development, production builds, and version control. Development began in CodePen and continued in VS Code.

## Accessibility

- Associated form and checkbox labels, descriptive button names, and synchronized `aria-expanded` states.
- Visible keyboard focus, improved color contrast, and focus management after completion or field creation.
- Live announcements for counter updates and loading errors, plus text-based completion indicators.

Manually tested using keyboard navigation, Chrome DevTools, and Windows Narrator. Detailed results and unresolved observations are recorded in [plan.md](plan.md). This is not a formal WCAG compliance audit.

## Deployment and testing

The application is hosted on Vercel using Vite’s `dist` build output. Production deployments use `main`. Local production preview and live smoke tests passed, including recipe loading, toggles, completion, valid and invalid submissions, and console checks.

## Future improvements

- Add local storage so completion progress and user-entered recipes persist across page visits.
- Add a way to edit or remove recipe groups and recipes after they have been created.
- Add field-specific browser validation messages and accessible, user-facing schema validation feedback.

## Project files

- `index.html`: Page structure and links to the stylesheet and script.
- `style.css`: Responsive styling for the layout, counter, recipe groups, buttons, and form.
- `script.js`: Loads recipe data, renders groups and recipes, handles completion and form interactions, and manages loading errors and retries.
- `public/recipeGroups.json`: Stores the initial recipe groups, recipes, yields, and ingredient details.
- `recipeGroups.schema.json`: Defines the required recipe data structure, types, and allowed units.
- `package.json` and `package-lock.json`: Define dependencies, scripts, and locked dependency versions.
- `plan.md`: Capstone plan, implementation notes, test cases, and pseudocode.
- `assets/`: Mobile and desktop demo GIFs and other project assets.

## AI use

I used two ChatGPT projects (My Code Coach and Independent Code Coach) for explanations, hints, and troubleshooting related to JavaScript, CSS, accessibility, schema validation, Vite, Git, and Vercel, along with assistance preparing demo GIFs and documentation. I independently implemented the JavaScript and CSS, made development decisions, and manually tested functionality and accessibility.
