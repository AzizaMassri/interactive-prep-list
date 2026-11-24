let recipeGroups = [];
let totalCounter = 0;
let totalRecipes = 0;

const recipeGroupList = document.querySelector(".recipe-groups");

let loadingErrorMessage = document.createElement("p");
loadingErrorMessage.textContent = "Error: No recipes loaded.";
const loadingErrorButton = document.createElement("button");
loadingErrorButton.classList.add("button");
loadingErrorButton.textContent = "Retry";
recipeGroupList.append(loadingErrorMessage);
recipeGroupList.append(loadingErrorButton);
loadingErrorMessage.hidden = true;
loadingErrorButton.hidden = true;
loadingErrorButton.addEventListener("click", function () {
  loadRecipes();
});

async function loadRecipes() {
  try {
    const response = await fetch('./recipeGroups.json');

    if (!response.ok) {
      throw new Error("Failed to load recipes.");
    }

    recipeGroups = await response.json();
    loadingErrorMessage.hidden = true;
    loadingErrorButton.hidden = true;
    const loadedRecipes = document.querySelectorAll(".recipe-group-div");

    for (const loaded of loadedRecipes) {
      loaded.remove();
    }
    const removeCounter = document.querySelectorAll(".counter-text");

    for (const remove of removeCounter) {
      remove.remove();
    }
    initApp();
  } catch (error) {
    console.error("Error loading JSON:", error);
    if (document.querySelectorAll(".recipe-group-div").length === 0) {
      loadingErrorMessage.textContent = "Failed to load recipes, Check your connection and try again.";
    } else {
      loadingErrorMessage.textContent = "Unable to refresh recipes. Your previously loaded recipes are still available. Please try again.";
    }
    loadingErrorMessage.hidden = false;
    loadingErrorButton.hidden = false;
  }
}

function initApp() {
  
  totalRecipes = 0;
  totalCounter = 0;
  for (const group of recipeGroups) {
    totalRecipes += group.recipes.length;
  }
  const counterText = document.createElement("p");
  counterText.classList.add("counter-text");
  counterText.textContent = `${totalCounter}/${totalRecipes} recipes completed`;
  let recipeForm = document.querySelector(".recipe-form");

  if (recipeForm === null) {
    recipeForm = document.createElement("form");
    recipeForm.classList.add("recipe-form");
    recipeGroupList.append(recipeForm);
    const recipeFormLabel = document.createElement("h2");
    recipeFormLabel.textContent = "Add a Recipe:";
    recipeForm.append(recipeFormLabel);

        const recipeGroupAdd = document.createElement("input");
    recipeGroupAdd.type = "text";
    recipeGroupAdd.name = "recipeGroup";
    const recipeGroupLabel = document.createElement("label");
    recipeGroupLabel.textContent = "Recipe Group";
    recipeForm.append(recipeGroupLabel);
    recipeGroupLabel.append(recipeGroupAdd);

    const moreRecipes = document.createElement("button");
    moreRecipes.classList.add("button");
    moreRecipes.textContent = "Add Another Recipe";
    moreRecipes.type = "button";
    recipeForm.append(moreRecipes);

    moreRecipes.addEventListener("click", function () {
      createRecipe(true);
    });

    function createRecipe(shouldFocus) {
      const recipeDiv = document.createElement("div");
      moreRecipes.before(recipeDiv);
      recipeDiv.classList.add("recipe-entry");

      const recipeAdd = document.createElement("input");
      recipeAdd.type = "text";
      recipeAdd.name = "recipeName";
      const recipeLabel = document.createElement("label");
      recipeLabel.textContent = "Recipe Title";
      recipeAdd.classList.add("recipe");
      recipeDiv.append(recipeLabel);
      recipeLabel.append(recipeAdd);

      if (shouldFocus === true) {
        recipeAdd.focus();
      }

      const yieldAdd = document.createElement("input");
      yieldAdd.type = "number";
      yieldAdd.name = "recipeYield";
      const yieldLabel = document.createElement("label");
      yieldLabel.textContent = "Yield";
      yieldAdd.classList.add("yield");
      recipeDiv.append(yieldLabel);
      yieldLabel.append(yieldAdd);

      const moreIngredients = document.createElement("button");
      moreIngredients.classList.add("button");
      moreIngredients.textContent = "Add Another Ingredient";
      moreIngredients.type = "button";
      recipeDiv.append(moreIngredients);

      moreIngredients.addEventListener("click", function () {
        createDetails(moreIngredients, true);
      });
      createDetails(moreIngredients, false);
    }

    createRecipe(false);

    function createDetails(moreIngredients, shouldFocus) {
      const detailsDiv = document.createElement("div");
      detailsDiv.classList.add("ingredient-entry");
      moreIngredients.before(detailsDiv);

      const ingredientAdd = document.createElement("input");
      ingredientAdd.type = "text";
      ingredientAdd.name = "recipeIngredient";
      const ingredientLabel = document.createElement("label");
      ingredientLabel.textContent = "Ingredient";
      ingredientAdd.classList.add("ingredient");
      detailsDiv.append(ingredientLabel);
      ingredientLabel.append(ingredientAdd);

      if (shouldFocus === true) {
        ingredientAdd.focus();
      }

      const quantityAdd = document.createElement("input");
      quantityAdd.type = "number";
      quantityAdd.name = "ingredientQuantity";
      const quantityLabel = document.createElement("label");
      quantityLabel.textContent = "Quantity";
      quantityAdd.classList.add("quantity");
      detailsDiv.append(quantityLabel);
      quantityLabel.append(quantityAdd);

      const unitAdd = document.createElement("input");
      unitAdd.type = "text";
      unitAdd.name = "ingredientUnit";
      const unitLabel = document.createElement("label");
      unitLabel.textContent = "Unit";
      unitAdd.classList.add("unit");
      detailsDiv.append(unitLabel);
      unitLabel.append(unitAdd);
    }

    const addNewDiv = document.createElement("div");
    const addNew = document.createElement("button");
    addNew.classList.add("button");
    addNew.type = "button";
    addNew.textContent = "Add";
    recipeForm.append(addNewDiv);
    addNewDiv.append(addNew);

    addNew.addEventListener("click", function () {
      const newGroup = { group: recipeGroupAdd.value, recipes: [] };
      const recipeEntries = recipeForm.querySelectorAll(".recipe-entry");
      for (const entry of recipeEntries) {
        const recipeNames = entry.querySelector(".recipe").value;
        const yield = `${entry.querySelector(".yield").value} Servings`;
        const newRecipe = { recipe: recipeNames, yield: yield, ingredients: [] };
        const ingredients = entry.querySelectorAll(".ingredient-entry");
        for (const ingredientEntry of ingredients) {
          const ingredient = ingredientEntry.querySelector(".ingredient").value;
          const quantity = ingredientEntry.querySelector(".quantity").value;
          const unit = ingredientEntry.querySelector(".unit").value;
          const newDetails = { name: ingredient, quantity: quantity, unit: unit };
          newRecipe.ingredients.push(newDetails);
        }
        newGroup.recipes.push(newRecipe);
      }
      recipeGroups.push(newGroup);
      totalRecipes += newGroup.recipes.length;
      document.querySelector(".counter-text").textContent = `${totalCounter}/${totalRecipes} recipes completed`;
      renderGroup(newGroup);
      console.log(newGroup);
      recipeForm.reset();
      for (const recipe of recipeEntries) {
        if (recipe !== recipeEntries[0]) {
          recipe.remove();
        }
      }
      const firstRecipeIngredients = recipeEntries[0].querySelectorAll(".ingredient-entry");
      for (const ingredient of firstRecipeIngredients) {
        if (ingredient !== firstRecipeIngredients[0]) {
          ingredient.remove();
        }
      }
    });
  }

    function renderGroup(group) {
      const recipeGroupDiv = document.createElement("div");
      recipeGroupDiv.classList.add("recipe-group-div");
      const recipeGroupH2 = document.createElement("h2");
      recipeGroupH2.classList.add("recipe-group-h2");
      const recipeGroupShow = document.createElement("button");
      recipeGroupShow.classList.add("button");
      recipeGroupShow.setAttribute("aria-expanded", false);
      const recipeGroupUl = document.createElement("ul");
      recipeGroupUl.classList.add("recipe-group-ul");
      let recipeCompleteCounter = 0;
      recipeGroupH2.textContent = group.group;
      recipeGroupShow.textContent = "Show More";
      recipeForm.before(recipeGroupDiv);
      recipeGroupDiv.append(recipeGroupH2);
      recipeGroupDiv.append(recipeGroupShow);
      recipeGroupDiv.append(recipeGroupUl);
      recipeGroupUl.hidden = true;
      recipeGroupShow.addEventListener("click", function () {
        if (recipeGroupUl.hidden) {
          recipeGroupUl.hidden = false;
          recipeGroupShow.textContent = "Hide All";
          recipeGroupShow.setAttribute("aria-expanded", true);
        } else {
          recipeGroupUl.hidden = true;
          recipeGroupShow.textContent = "Show More";
          recipeGroupShow.setAttribute("aria-expanded", false);
        }
      });
      for (const recipe of group.recipes) {
        const recipeItem = document.createElement("li");
        recipeItem.classList.add("recipe-items");
        const recipeName = document.createElement("h3");
        recipeName.classList.add("recipe-name");
        const recipeShow = document.createElement("button");
        recipeShow.classList.add("button");
        recipeShow.classList.add("details-button");
        recipeShow.setAttribute("aria-expanded", false);
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
          ingredientList.classList.add("ingredient-li");
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
        recipeComplete.append(recipeCheckbox);
        recipeDiv.hidden = true;
        recipeShow.addEventListener("click", function () {
          if (recipeDiv.hidden) {
            recipeDiv.hidden = false;
            recipeShow.textContent = "Hide";
            recipeShow.setAttribute("aria-expanded", true);
          } else {
            recipeDiv.hidden = true;
            recipeShow.textContent = "Details";
            recipeShow.setAttribute("aria-expanded", false);
          }

        });
        recipeCheckbox.addEventListener("change", function () {
          recipe.completed = recipeCheckbox.checked;
          if (recipe.completed === true) {
            recipeName.style.color = "#636363";
            recipeIngredients.hidden = true;
            recipeShow.hidden = true;
            recipeYield.hidden = true;
            recipeCheckbox.hidden = true;
            recipeComplete.style.fontWeight = "bold";
            recipeCompleteCounter = recipeCompleteCounter + 1;
            totalCounter = totalCounter + 1;
            document.querySelector(".counter-text").textContent = `${totalCounter}/${totalRecipes} recipes completed`;
            const focusElement = document.querySelectorAll(".button, input");
            let foundCurrentElement = false;
            for (const element of focusElement) {
              if (element === recipeCheckbox) {
                foundCurrentElement = true;
              } else if (foundCurrentElement && element.closest("[hidden]") === null) {
                  element.focus();
                  break;
                }
              }
          }
          if (recipeCompleteCounter === group.recipes.length) {
            recipeGroupH2.style.color = "#636363";
          }

        });
      }
    }

    recipeForm.before(counterText);

    for (const group of recipeGroups) {
      renderGroup(group);
    }
}

loadRecipes();