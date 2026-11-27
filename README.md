# Interactive Prep List

A responsive kitchen prep list for managing recipes and tracking daily preparation progress.

**[Launch the live application](https://interactive-prep-list.vercel.app/)**

## Features

- Expand recipe groups and view recipe yields, ingredients, quantities, and units.
- Mark recipes complete and track individual, group, and overall progress.
- Add groups with multiple recipes and ingredients using a validated form.
- Delete recipes or entire groups with confirmation.
- Preserve form inputs after invalid submissions and reset the form after successful submissions.
- Retry failed data loads without losing previously displayed recipes.

**Current limitation:** Additions, deletions, and completion progress reset on reload or successful Retry.

## Getting started

Use the live application without installing anything. Select **Show More** to expand a group, **Details** to view a recipe, and **Done** to mark it complete. Use the **Add a Recipe** form to create new groups. Use **Delete Recipe** or **Delete Group** to remove items.

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

These demos predate the accessibility, validation, and deletion updates.

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

- Associated form and checkbox labels, descriptive button names (including delete controls), and synchronized `aria-expanded` states.
- Visible keyboard focus, improved color contrast, and focus management after completion or field creation.
- Live announcements for counter updates and loading errors, plus text-based completion indicators.

Earlier accessibility testing used keyboard navigation, Chrome DevTools, and Windows Narrator. See [plan.md](plan.md) for results and limitations. This is not a formal WCAG audit.

## Deployment and testing

Hosted on Vercel with automatic production deployments from `main`. Local production preview, deletion regression tests, and live smoke tests passed. Detailed test cases are in [plan.md](plan.md).

## Future improvements

- Add local storage so completion progress, additions, and deletions persist across page visits.
- Add a way to edit recipe groups and recipes after they have been created.
- Manage keyboard focus after deletion.
- Add field-specific browser validation messages and accessible, user-facing schema validation feedback.

## Project files

- `index.html`: Page structure and links to the stylesheet and script.
- `style.css`: Responsive styling for the layout, counter, recipe groups, buttons, and form.
- `script.js`: Recipe loading, rendering, completion, deletion, and form handling.
- `public/recipeGroups.json`: Stores the initial recipe groups, recipes, yields, and ingredient details.
- `recipeGroups.schema.json`: Defines the required recipe data structure, types, and allowed units.
- `package.json` and `package-lock.json`: Define dependencies, scripts, and locked dependency versions.
- `plan.md`: Capstone plan, implementation notes, test cases, and pseudocode.
- `assets/`: Mobile and desktop demo GIFs and other project assets.

## AI use

I used two ChatGPT projects (My Code Coach and Independent Code Coach) for explanations, hints, and troubleshooting related to JavaScript, CSS, accessibility, schema validation, Vite, Git, and Vercel, along with assistance preparing demo GIFs and documentation. I independently implemented the JavaScript and CSS, made development decisions, and manually tested functionality and accessibility.
