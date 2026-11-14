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
Inputs: Recipe, Ingredients, Quantities, and Completed (check box)
Steps: Retrieve recipe groups, recipes will be displayed in a predetermined order in their groups, allow employees to expand an incomplete recipe for ingredients, quantities and yield, allow employees to mark a recipe complete, update the recipe’s completion status with the checkbox, which hides the recipe’s details button, details and checkbox and adds one to the recipes completed counter. When all recipes in a group are completed the group name is greyed out.
Outputs: A title. A total recipe completion counter. Recipe groups with a Show More button that displays their sub-recipes when expanded. A Show More button next to each sub-recipe name, and a checkbox under each incomplete sub-recipe to mark it complete. Completed recipes appear greyed out with hidden details button and hidden details. Counter increase by one when each recipe is complete.Completed recipe groups greyed out and remain expandable. 
Test cases (input row, expected result, why):


Pancake Batter, complete: no collapsed: false -  displays recipe name, hide, yield, ingredients, quantities and a check box.
Whipped topping, complete: no, checkbox checked: yes - it would be greyed out, no checkbox, cannot be expanded, and the overall completion counter increases by one.
Toasted English muffins: complete: false -  collapsed: true. displays recipe name and show more button 
Berry Pancakes group, completed: true collapsed: false -  group and sub recipes remain but are greyed out, sub recipes cannot be expanded but the recipe group can be expanded to show the sub recipes but not their details. Show more button changes to Hide all.




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
