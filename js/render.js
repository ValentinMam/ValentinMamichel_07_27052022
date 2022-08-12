// ========== FUNCTION DISPLAY RECIPE ==========

export function renderRecipe(name, ingredients, time, description) {
  // Create the article element
  const article = document.createElement("article");

  // Create the card element
  const cardPicture = document.createElement("div");
  cardPicture.className = "card-picture";

  // Create the card body element
  const cardBody = document.createElement("div");
  cardBody.className = "card-body";

  // Create the card header element
  const cardHeader = document.createElement("div");
  cardHeader.className = "card-header";

  // Create the title element
  const title = document.createElement("h2");
  title.textContent = name;
  // append the title to the card header
  cardHeader.append(title);

  // Create the clock element
  const clock = document.createElement("i");
  clock.className = "fas fa-clock";
  clock.innerHTML = "<b>" + time + "</b>" + "<b> min</b>";
  // append the clock to the card header
  cardHeader.append(clock);
  // append the card header to the card body
  cardBody.append(cardHeader);

  // Create the card container element
  const cardContainer = document.createElement("div");
  cardContainer.className = "card-container";

  // Create the ul element
  const ul = document.createElement("ul");
  for (let i = 0; i < ingredients.length; i++) {
    // Create the li element
    const li = document.createElement("li");
    li.innerHTML =
      "<span>" +
      ingredients[i].ingredient +
      "</span>" +
      ": " +
      (ingredients[i].quantity || "") +
      " " +
      (ingredients[i].unit || "") +
      "<br>";
    // append the li to the ul
    ul.append(li);
    // append the ul to the card container
    cardContainer.append(ul);
  }

  // append the card container to the card body
  cardBody.append(cardContainer);

  // Create the method element
  const method = document.createElement("p");
  method.textContent = description;
  // append the method to the card container
  cardContainer.append(method);
  // append the card container to the card body
  cardBody.append(cardContainer);
  // append the card picture to the article
  article.append(cardPicture);
  // append the card body to the article
  article.append(cardBody);
  //  append the article to the section
  document.querySelector("section").append(article);
}

// ========== FUNCTION DISPLAY RECIPES LIST ==========

export function renderRecipeList(recipeList) {
  // Clear the section
  document.querySelector("section").innerHTML = "";
  // Loop through the recipe list
  recipeList.forEach((recipe) => {
    // Render the recipe
    renderRecipe(
      recipe.name,
      recipe.ingredients,
      recipe.time,
      recipe.description
    );
  });
}

// ========== FUNCTION DISPLAY INGREDIENTS LIST ==========

export function renderIngList(ingredientList) {
  // Clear the section
  document.getElementById("ingredients-list").innerHTML = "";
  // Loop through the ingredient list
  ingredientList.forEach((ingredient) => {
    // Render the ingredient
    let ing = document.createElement("li");
    ing.textContent = ingredient;
    // append the ingredient to the section
    document.getElementById("ingredients-list").append(ing);
  });
}

// ========== FUNCTION DISPLAY APPPLIANCES LIST ==========

export function renderAppList(applianceList) {
  // Clear the section
  document.getElementById("appliances-list").innerHTML = "";
  // Loop through the appliance list
  applianceList.forEach((appliance) => {
    // Render the appliance
    let app = document.createElement("li");
    app.textContent = appliance;
    // append the appliance to the section
    document.getElementById("appliances-list").append(app);
  });
}

// ========== FUNCTION DISPLAY USTENSILS LIST ==========

export function renderUstList(ustensilList) {
  // Clear the section
  document.getElementById("ustensils-list").innerHTML = "";
  // Loop through the ustensil list
  ustensilList.forEach((ustensil) => {
    // Render the ustensil
    let ust = document.createElement("li");
    ust.textContent = ustensil;
    // append the ustensil to the section
    document.getElementById("ustensils-list").append(ust);
  });
}

// ========== FUNCTION DISPLAY TAGS ABOVE FILTER BOXES ==========

export function renderTag(value, type) {
  // Create the tag element
  let tag = document.createElement("span");
  tag.className = "tag" + " " + (`${type}` + "-tag");
  tag.setAttribute("data-type", `${type}`);
  tag.innerHTML = `${value}`;

  // create the delete button
  let closeBtn = document.createElement("i");
  closeBtn.className = "far fa-times-circle";
  closeBtn.setAttribute("data-status", "on");

  tag.append(closeBtn);
  document.getElementById("search-tags").append(tag);
}
