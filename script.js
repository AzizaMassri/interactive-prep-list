const recipeGroups = [
  { group: "Berry Pancakes", 
    recipes:  [
      { recipe: "Pancakes",
        yield: "20 Servings",
        completed: false, 
        ingredients: [
          { name: "Pancake Mix", quantity: 1000, unit: "g"},
          { name: "Water", quantity: 1200, unit: "ml"}
        ]}, 
      { recipe: "Strawberry Topping",
        yield: "20 Servings",
        completed: false,
        ingredients: [
          { name: "Strawberries", quantity: 500, unit: "g"}, 
          { name: "Sugar", quantity: 200, unit: "g"}
        ]},
      { recipe: "Whipped Topping",
        yield: "20 Servings", 
        completed: false, 
        ingredients: [
          { name: "Heavy Cream", quantity: 1000, unit: "ml"}, 
          { name: "Powdered Sugar", quantity: 150, unit: "g"}, 
          { name: "Vanilla Extract", quantity: 30, unit: "ml"}
        ]
      }
    ]
  },
  
  { group: "Breakfast Sandwich", 
    recipes:  [
      { recipe: "Toasted English Muffins",
        yield: "20 Servings", 
        completed: false, 
        ingredients: [
          { name: "English Muffins", quantity: 20, unit: "each"}, 
          { name: "Butter", quantity: 200, unit: "g"}
        ]}, 
      { recipe:"Poached Eggs", 
        yield: "20 Servings", 
        completed: false, 
        ingredients: [
          { name: "Eggs", quantity: 20, unit: "each"},
          { name: "Vinegar", quantity: 120, unit: "ml"}, 
          { name: "Water", quantity: 4000, unit: "ml"}
        ]}, 
      { recipe: "Sliced Cheese",
        yield: "20 Servings", 
        completed: false, 
        ingredients: [
          { name: "American Cheese Block", quantity: 400, unit: "g"}
        ]}, 
      { recipe: "Fried Bacon", 
        yield: "20 Servings", 
        completed: false, 
        ingredients: [
          { name: "Bacon", quantity: 40, unit: "slices"}
        ]
      }
    ]
  },
  { group: "Sausage Omelet", 
    recipes:  [
      { recipe: "Mixed Eggs", 
        yield: "20 Servings", 
        completed: false, 
        ingredients: [
          { name: "Eggs", quantity: 40, unit: "each"}, 
          { name: "Milk", quantity: 500, unit: "ml"}, 
          { name: "Salt", quantity: 20, unit: "g"}, 
          { name: "Black Pepper", quantity: 5, unit: "g"}
        ]}, 
      { recipe: "Shredded Cheese", 
        yield: "20 Servings", 
        completed: false, 
        ingredients: [
          { name: "Cheddar Cheese Block", quantity: 1000, unit: "g"}
        ]}, 
      { recipe: "Grilled Onions", 
        yield: "20 Servings", 
        completed: false, 
        ingredients: [
          { name: "Onions", quantity: 1500, unit: "g"},
          { name: "Butter", quantity: 100, unit: "g"}, 
          { name: "Oil", quantity: 100, unit: "ml"}, 
          { name: "Salt", quantity: 20, unit: "g"}
        ]}, 
      { recipe:"Crumbled Sausage", 
        yield: "20 Servings", 
        completed: false, 
        ingredients: [
          { name: "Sausage", quantity: 2000, unit: "g"}
        ]}, 
      { recipe:"Toast", 
        yield: "20 Servings", 
        completed: false, 
        ingredients: [
          { name: "Bread", quantity: 20, unit: "slices"}, 
          { name: "Butter", quantity: 200, unit: "g"}
        ]
      }
    ]
  },
  { group: "Steak and Eggs", 
    recipes:  [
      { recipe: "Marinated Steak", 
        yield: "20 Servings", 
        completed: false, 
        ingredients: [
          { name: "Steak", quantity: 3000, unit: "g"}, 
          { name: "Marinade Mix", quantity: 200, unit: "g"}, 
          { name: "Oil", quantity: 250, unit: "ml"}, 
          { name: "Water", quantity: 500, unit: "ml"}, 
          { name: "Onions", quantity: 500, unit: "g"}, 
          { name: "Garlic", quantity: 50, unit: "g"}, 
          { name: "Bay Leaves", quantity: 5, unit: "each"}
        ]},
      { recipe: "Eggs Uncooked", 
        yield: "20 Servings", 
        completed: false, 
        ingredients: [
          { name: "Eggs", quantity: 40, unit: "each"}
        ]}, 
      { recipe: "Hashbrowns", 
        yield: "20 Servings", 
        completed: false, 
        ingredients: [
          { name: "Potatoes", quantity: 3000, unit: "g"}
        ]
      }
    ]
  },
  { group: "Sides", 
    recipes:  [
      { recipe:"Pancakes", 
        yield: "20 Servings", 
        completed: false, 
        ingredients: [
          { name: "Pancake Mix", quantity: 1000, unit: "g"}, 
          { name: "Water", quantity: 1200, unit: "ml"}
        ]}, 
      { recipe: "Toast", 
        yield: "20 Servings", 
        completed: false, 
        ingredients: [
          { name: "Bread", quantity: 20, unit: "slices"},
          { name: "Butter", quantity: 200, unit: "g"}
        ]}, 
      { recipe: "Hashbrowns", 
        yield: "20 Servings", 
        completed: false, 
        ingredients: [
          { name: "Potatoes", quantity: 3000, unit: "g"}
        ]}, 
      { recipe: "Bacon", 
        yield: "20 Servings", 
        completed: false, 
        ingredients: [
          { name: "Bacon", quantity: 40, unit: "slices"}
        ]}, 
      { recipe: "Sausage Patties", 
        yield: "20 Servings", 
        completed: false, 
        ingredients: [
          { name: "Sausage", quantity: 20, unit: "patties"}
        ]
      }
    ]
  }
];
const recipeGroupList = document.querySelector(".recipe-groups");
for (const group of recipeGroups) {
 const recipeGroupDiv = document.createElement("div");
 const recipeGroupH2 = document.createElement("h2");
 const recipeGroupShow = document.createElement("button");
 const recipeGroupUl = document.createElement("ul");
 let recipeGroupCompleteCounter = 0;
 recipeGroupH2.textContent = group.group;
 recipeGroupShow.textContent = "Show More";
 recipeGroupList.append(recipeGroupDiv);
 recipeGroupDiv.append(recipeGroupH2);
 recipeGroupDiv.append(recipeGroupShow);
 recipeGroupDiv.append(recipeGroupUl);
 recipeGroupUl.hidden = true;
 recipeGroupShow.addEventListener("click", function () {
  if (recipeGroupUl.hidden) {
    recipeGroupUl.hidden = false;
    recipeGroupShow.textContent = "Hide All";
  } else {
    recipeGroupUl.hidden = true;
    recipeGroupShow.textContent = "Show More";
  }
 });
  for (const recipe of group.recipes) {
  const recipeItem = document.createElement("li");
  const recipeName = document.createElement("h3");
  const recipeShow = document.createElement("button");
  const recipeDiv = document.createElement("div");
  const recipeYield = document.createElement("p");
  const recipeIngredients = document.createElement("ul");
  const recipeCheckbox = document.createElement("input");
  recipeCheckbox.type = "checkbox";
  const recipeComplete = document.createElement("label");
  let recipeCompleteCounter = 0;
  recipeComplete.textContent = "Done"
  recipeName.textContent = recipe.recipe;
  recipeShow.textContent = "Details";
  recipeYield.textContent = recipe.yield;
    for (const ingredient of recipe.ingredients) {
      const ingredientList = document.createElement("li");
      recipeIngredients.append(ingredientList);
      ingredientList.append(`${ingredient.name} -- ${ingredient.quantity} ${ingredient.unit}`);
    }
  recipeGroupUl.append(recipeItem);
  recipeItem.append(recipeName);
  recipeItem.append(recipeShow);
  recipeItem.append(recipeDiv);
  recipeDiv.append(recipeYield);
  recipeDiv.append(recipeIngredients);
  recipeDiv.append(recipeCheckbox);
  recipeDiv.append(recipeComplete);
  recipeDiv.hidden = true;
  recipeCheckbox.hidden = false;
  recipeComplete.hidden = false;
  recipeShow.addEventListener("click", function () {
  if (recipeDiv.hidden) {
    recipeDiv.hidden = false;
    recipeShow.textContent = "Hide";
  } else {
    recipeDiv.hidden = true;
    recipeShow.textContent = "Details";
  }
  recipeCheckbox.addEventListener("change", function () {
    recipe.completed = recipeCheckbox.checked;
    if (recipe.completed === true) {
      recipeName.style.color = "#888888";
      recipeIngredients.hidden = true;
      recipeShow.hidden = true;
      recipeYield.hidden = true;
      recipeCheckbox.hidden = true;
    } else {
      recipeIngredients.hidden = false;
    }
    
  })
});
}
}
