/******************   FILTER RECIPES BY VALUE   ******************/

/* research recipes by name, description & ingredient */

// ALGORITHME #2

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

/******************   FILTER RECIPES BY TAGS LIST   ******************/

/* filter recipes from ingredients tags */
export function filterByIng(recipeList, value) {
  return recipeList.filter((recipe) =>
    recipe.ingredients.some((ingredientDetail) =>
      ingredientDetail.ingredient.toLowerCase().includes(value)
    )
  );
}

/* filter recipes from appliances tags */
export function filterByApp(recipeList, value) {
  return recipeList.filter((recipe) =>
    recipe.appliance.toLowerCase().match(value)
  );
}

/* filter recipes from ustensils tags */
export function filterByUst(recipeList, value) {
  return recipeList.filter((recipe) =>
    recipe.ustensils.some((ustensil) => ustensil.toLowerCase().match(value))
  );
}

/* filter recipes by search tags while tag is checked with data-attribute */
export function filterRecByTag(recipeList) {
  let tempRecipeList = [...recipeList];
  const searchTags = document.querySelectorAll(".tag");
  searchTags.forEach((searchTag) => {
    // loop on each tag and and filter by type
    let viewedTag = searchTag.textContent;
    const type = searchTag.getAttribute("data-type");

    if (`${type}` === "ing") {
      tempRecipeList = filterByIng(tempRecipeList, viewedTag);
    } else if (`${type}` === "app") {
      tempRecipeList = filterByApp(tempRecipeList, viewedTag);
    } else if (`${type}` === "ust") {
      tempRecipeList = filterByUst(tempRecipeList, viewedTag);
    }
  });
  return tempRecipeList;
}

/******************   FILTER TAG LIST BY VALUE   ******************/

/* filter tag list by writting an item in input */
export function filterTagList(tagList, value) {
  return tagList.filter((tag) => tag.match(value));
}
