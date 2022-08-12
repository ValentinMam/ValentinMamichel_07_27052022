// ========== FUNCTION INGREDIENTS LIST ==========

export function generateIngList(recipeList) {
  // /* Array of ingredients */
  let ingredients = [];
  // for (let i = 0; i < recipes.length; i++) {
  recipeList.forEach((recipe) => {
    // const ingredientArray = recipes[i].ingredients
    recipe.ingredients.some((ingredientItem) => {
      // const ingredientItem = ingredientArray[j].ingredient.toLowerCase()
      let ingredient = ingredientItem.ingredient.toLowerCase();
      // if (ingredients.indexOf(ingredient) === -1) {
      ingredients.push(ingredient);
    });
  });
  // return ingredients
  return [...new Set(ingredients)].sort();
}

// ========== FUNCTION APPLIANCES LIST ==========

export function generateAppList(recipeList) {
  // /* Array of appliances */
  let appliances = [];
  // for (let i = 0; i < recipes.length; i++) {
  recipeList.forEach((recipe) => {
    // const applianceItem = recipes[i].appliance.toLowerCase()
    let appliance = recipe.appliance.toLowerCase();
    // if (appliances.indexOf(appliance) === -1) {
    appliances.push(appliance);
  });
  // return appliances
  return [...new Set(appliances)].sort();
}

// ========== FUNCTION USTENSILS LIST ==========

export function generateUstList(recipeList) {
  // /* Array of ustensils */
  let ustensils = [];
  // for (let i = 0; i < recipes.length; i++) {
  recipeList.forEach((recipe) => {
    // const ustensilArray = recipes[i].ustensils
    recipe.ustensils.forEach((ustensilItem) => {
      // const ustensilItem = ustensilArray[j].toLowerCase()
      let ustensil = ustensilItem.toLowerCase();
      // if (ustensils.indexOf(ustensil) === -1) {
      ustensils.push(ustensil);
    });
  });
  // return ustensils
  return [...new Set(ustensils)].sort();
}
