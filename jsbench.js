// ========= Algorithms =========

// #1

export function filterRecByValue(recipeList, value) {
  return recipeList.filter(
    (recipe) =>
      recipe.name.toLowerCase().startsWith(value.toLowerCase) ||
      recipe.description.toLowerCase().includes(value.toLowerCase) ||
      recipe.ingredients.some((ingredientDetail) =>
        ingredientDetail.ingredient.toLowerCase().includes(value.toLowerCase())
      )
  );
}

// #2

export function filterRecByValue(recipeList, value) {
  let recipeResult = [];
  for (let i = 0; i < recipeList.length; i++) {
    const { name, description, ingredients } = recipeList[i];
    const includesInName = name.toLowerCase().includes(value.toLowerCase());
    const includesInDescription = description
      .toLowerCase()
      .includes(value.toLowerCase());
    let includesInIngredients = false;
    for (let j = 0; j < ingredients.length; j++) {
      const { ingredient } = ingredients[j];
      if (ingredient.toLowerCase().includes(value.toLowerCase())) {
        includesInIngredients = true;
        break;
      }
    }
    if (includesInName || includesInDescription || includesInIngredients) {
      recipeResult.push(recipeList[i]);
    }
  }
  return recipeResult;
}

// ========= jsbench =========

// test jsben.ch #1: https://jsben.ch/GlHRF : 100%
// test jsben.ch #2: https://jsben.ch/GlHRF : entre 85% et 90%

let query = "Sucre";

// #1

const results = recipes.filter((recipe) => {
  return (
    recipe.name.toLowerCase().startsWith(query.toLowerCase()) ||
    recipe.description.toLowerCase().includes(query.toLowerCase()) ||
    recipe.ingredients.some((ingredient) =>
      ingredient.ingredient.toLowerCase().includes(query.toLowerCase())
    )
  );
});

// #2

// const results = [];

for (let i = 0; i < recipes.length; i++) {
  const { name, ingredients, description } = recipes[i];
  const includesInName = name.toLowerCase().includes(query.toLowerCase());
  const includesInDescription = description
    .toLowerCase()
    .includes(query.toLowerCase());
  let includesInIngredients = false;
  for (let y = 0; y < ingredients.length; y++) {
    if (ingredients[y].ingredient.toLowerCase().includes(query.toLowerCase())) {
      includesInIngredients = true;
    }
  }
  if (includesInName || includesInDescription || includesInIngredients) {
    results.push(recipes[i]);
  }
}
