CAPSTONE PLAN

Questions:
Is the prep list the same everyday?
Should the list include ingredients?
Should the list include quantities?
Is there more than one food station?
Is there more than one shift per day?
Should the tasks be marked completed?
Should it track completed recipes?


The request: I need a daily prep list that can tell kitchen employees what recipes to prep for the day.
Questions to ask (with the answers) see questions above. Answers: Yes, Yes, Yes, No, No, Yes, Yes
Inputs: Static data (nested array), DOM events, Show more/Hide all button, Details/hide button
Steps: Retrieve recipe groups, display recipe groups with a show more button to expand their recipes in a predetermined order, allow employees to expand an incomplete recipe for yield ingredients and quantities, allow employees to mark a recipe complete, update the recipe’s completion status with the checkbox, which hides the recipe’s details button, details and checkbox, greys out the recipe, and adds one to the recipes completed counter. When all recipes in a group are completed the group name is greyed out but can still be expanded to show the individual recipes.
Outputs: Static HTML title, recipe completion counter, expanded/collapsed lists, auto-hidden details, greyed-out text styling, 
Test cases (input row, expected result, why):


Pancake Batter, complete: no collapsed: false -  displays individual recipe name, hide button, yield, ingredients, quantities and a check box because the recipe hasn't been completed and the details button has been clicked.
Whipped topping, complete: no, checkbox checked: yes - it would be greyed out, no checkbox, can no longer be expanded, and the overall completion counter increases by one because the recipe is marked complete.
Toasted English muffins: complete: false -  collapsed: true. displays recipe name and details button because the recipe has not been expanded and has not been completed.
Berry Pancakes group, completed: true collapsed: false -  group and sub recipes remain but are greyed out, sub recipes cannot be expanded but the recipe group can be expanded to show the sub recipes and the word done. Show more button changes to Hide all. This happens because the group is completed and expanded.




Pseudocode:
```
FOR main body
  DISPLAY completion tracker
  
  FOR EACH recipe group
    DISPLAY group name
    DISPLAY group show more button

    IF recipe group is expanded
      DISPLAY sub recipe list

      IF recipe group is complete
        GREY out group name
        
      FOR EACH recipe in group
        DISPLAY recipe name

        IF recipe is complete
          GREY out name
          HIDE yield ingredients quantities and checkbox

        ELSE

          DISPLAY recipe show more button

          IF recipe is expanded
            DISPLAY yield, ingredients, quantities
            DISPLAY checkbox

          WHEN recipe checkbox changes AND recipe is complete
            ADD to recipe complete counter
            ADD to to overall complete counter```
