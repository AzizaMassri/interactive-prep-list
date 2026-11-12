const recipeGroups = [
  { group: "Berry Pancakes", recipes: [ "Pancake Batter", "Strawberry Topping", "Whipped Topping"]},
  { group: "Breakfast Sandwich", recipes: [ "Toasted English Muffins", "Poached Eggs", "Sliced Cheese", "Bacon"]},
  { group: "Sausage Omelet", recipes: [ "Mixed Eggs", "Shredded Cheese", "Grilled Onions", "Crumbled Sausage", "Toast"]},
  { group: "Steak and Eggs", recipes: [ "Marinated Steak", "Whole Eggs", "Hashbrowns"]},
  { group: "Sides", recipes: [ "Pancakes", "Toast", "Hashbrowns", "Bacon", "Sausage"]},
];
const recipeGroupList = document.querySelector(".recipe-groups");
for (const group of recipeGroups) {
 const recipeGroupDiv = document.createElement("div");
 const recipeGroupUl = document.createElement("ul");
 recipeGroupDiv.textContent = group.group;
 recipeGroupDiv.append(recipeGroupUl);
 recipeGroupList.append(recipeGroupDiv);
  for (const recipe of group.recipes) {
  const recipeItem = document.createElement("li");
  recipeItem.textContent = recipe;
  recipeGroupUl.append(recipeItem);
}
};
