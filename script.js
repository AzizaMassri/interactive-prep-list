const recipeGroups = [
  { group: "Berry Pancakes", recipes: [ "Pancake Batter", "Strawberry Topping", "Whipped Topping"]},
  { group: "Breakfast Sandwich", recipes: [ "Toasted English Muffins", "Poached Eggs", "Sliced Cheese", "Bacon"]},
  { group: "Sausage Omelet", recipes: [ "Mixed Eggs", "Shredded Cheese", "Grilled Onions", "Crumbled Sausage", "Toast"]},
  { group: "Steak and Eggs", recipes: [ "Marinated Steak", "Whole Eggs", "Hashbrowns"]},
  { group: "Sides", recipes: [ "Pancakes", "Toast", "Hashbrowns", "Bacon", "Sausage"]},
];
const groupList = document.querySelector(".recipe-groups");
for (const group of recipeGroups) {
 const groupDiv = document.createElement("div");
 const recipeUl = document.createElement("ul");
 groupDiv.textContent = group.group;
 groupDiv.append(recipeUl)
 groupList.append(groupDiv);
  for (const recipe of group.recipes) {
  const recipeItem = document.createElement("li");
  recipeItem.textContent = recipe;
  recipeUl.append(recipeItem);
}
 };
