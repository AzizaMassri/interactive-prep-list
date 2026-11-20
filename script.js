let recipeGroups = [];

async function loadRecipes() {
  try {
    const response = await fetch('./recipeGroups.json'); 
    recipeGroups = await response.json();
    
    initApp(); 
  } catch (error) {
    console.error("Error loading JSON:", error);
  }
}

function initApp() { 

const recipeGroupList = document.querySelector(".recipe-groups");
let totalCounter = 0;
let totalRecipes = 0;
for (const group of recipeGroups) {
  totalRecipes += group.recipes.length;
};
const counterText = document.createElement("p");
counterText.classList.add("counter-text");
counterText.textContent = `${totalCounter}/${totalRecipes} recipes completed`;
recipeGroupList.append(counterText);
for (const group of recipeGroups) {
  const recipeGroupDiv = document.createElement("div");
  recipeGroupDiv.classList.add("recipe-group-div");
  const recipeGroupH2 = document.createElement("h2");
  recipeGroupH2.classList.add("recipe-group-h2");
  const recipeGroupShow = document.createElement("button");
  recipeGroupShow.classList.add("button");
  const recipeGroupUl = document.createElement("ul");
  recipeGroupUl.classList.add("recipe-group-ul");
  let recipeCompleteCounter = 0;
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
    recipeItem.classList.add("recipe-items");
    const recipeName = document.createElement("h3");
    recipeName.classList.add("recipe-name");
    const recipeShow = document.createElement("button");
    recipeShow.classList.add("button");
    const recipeDiv = document.createElement("div");
    recipeDiv.classList.add("recipe-div");
    const recipeYield = document.createElement("p");
    recipeYield.classList.add("yield");
    const recipeIngredients = document.createElement("ul");
    recipeIngredients.classList.add("recipe-ul");
    const recipeComplete = document.createElement("label");
    recipeComplete.textContent = "Done";
    const recipeCheckbox = document.createElement("input");
    recipeCheckbox.type = "checkbox";
    recipeName.textContent = recipe.recipe;
    recipeShow.textContent = "Details";
    recipeYield.textContent = recipe.yield;
    for (const ingredient of recipe.ingredients) {
      const ingredientList = document.createElement("li");
      ingredientList.classList.add("ingredient-li")
      recipeIngredients.append(ingredientList);
      ingredientList.append(`${ingredient.name} -- ${ingredient.quantity} ${ingredient.unit}`);
    }
    recipeGroupUl.append(recipeItem);
    recipeItem.append(recipeName);
    recipeItem.append(recipeShow);
    recipeItem.append(recipeDiv);
    recipeDiv.append(recipeYield);
    recipeDiv.append(recipeIngredients);
    recipeDiv.append(recipeComplete);
    recipeDiv.append(recipeCheckbox);
    recipeDiv.hidden = true;
    recipeShow.addEventListener("click", function () {
      if (recipeDiv.hidden) {
        recipeDiv.hidden = false;
        recipeShow.textContent = "Hide";
      } else {
        recipeDiv.hidden = true;
        recipeShow.textContent = "Details";
      }

    });
    recipeCheckbox.addEventListener("change", function () {
      recipe.completed = recipeCheckbox.checked;
      if (recipe.completed === true) {
        recipeName.style.color = "#888888";
        recipeIngredients.hidden = true;
        recipeShow.hidden = true;
        recipeYield.hidden = true;
        recipeCheckbox.hidden = true;
          recipeComplete.style.fontWeight = "bold";
        recipeCompleteCounter = recipeCompleteCounter + 1;
        totalCounter = totalCounter + 1;
        counterText.textContent = `${totalCounter}/${totalRecipes} recipes completed`;
      }
      if (recipeCompleteCounter === group.recipes.length) {
        recipeGroupH2.style.color = "#888888";
      }

    })
  }
}
}

loadRecipes();