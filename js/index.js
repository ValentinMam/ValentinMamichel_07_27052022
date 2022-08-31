// ========== IMPORTS ==========

// import recipes from js file
import { recipes } from "./recipes.js";
// import filters from js file
import { filterRecByValue, filterRecByTag, filterTagList } from "./filter.js";
// import generateLists from js file
import {
  generateIngList,
  generateAppList,
  generateUstList,
} from "./generate.js";
// import render from js file
import {
  renderRecipeList,
  renderIngList,
  renderAppList,
  renderUstList,
  renderTag,
} from "./render.js";

// ========== ARRAYS ==========

// array of all recipes
let searchResult = [...recipes];
// array of filtered recipes
let filterResult = [...searchResult];
// array of all ingredients
let ingredientList = generateIngList(searchResult);
// array of filtered ingredients
let filterIngList = [...ingredientList];
// array of all appliances
let applianceList = generateAppList(searchResult);
// array of filtered appliances
let filterAppList = [...applianceList];
// array of all ustensils
let ustensilList = generateUstList(searchResult);
// array of filtered ustensils
let filterUstList = [...ustensilList];

// ========== DOM ELEMENTS ==========

// box, label, input, button, dropdown
const ingBox = document.querySelector(".box-primary");
const appBox = document.querySelector(".box-secondary");
const ustBox = document.querySelector(".box-tertiary");

const ingLabel = document.getElementById("label-ingredients");
const appLabel = document.getElementById("label-appliances");
const ustLabel = document.getElementById("label-ustensils");

const mainInput = document.getElementById("main-input");
const ingInput = document.getElementById("input-ingredients");
const appInput = document.getElementById("input-appliances");
const ustInput = document.getElementById("input-ustensils");

const ingButton = document.getElementById("button-ingredients");
const appButton = document.getElementById("button-appliances");
const ustButton = document.getElementById("button-ustensils");

const ingDropdown = document.getElementById("ingredients-list");
const appDropdown = document.getElementById("appliances-list");
const ustDropdown = document.getElementById("ustensils-list");

// ========== FUNCTION INGREDIENTS LIST ==========

function switchFilterbox(box, label, input, button, dropdown) {
  // activate/desactivate filterbox
  function activateBox(box) {
    // activate filterbox
    box.dataset.filter =
      // if filterbox is active, set to inactive
      box.dataset.filter == "inactive" ? "active" : "inactive";
  }

  activateBox(box);

  function deactivateLabel(label) {
    // activate/desactivate label
    label.dataset.label =
      // if label is active, set to inactive
      label.dataset.label == "active" ? "inactive" : "active";
  }
  deactivateLabel(label);

  function activateInput(input) {
    // activate/deactivate input
    input.dataset.input =
      // if input is active, set to inactive
      input.dataset.input == "inactive" ? "active" : "inactive";
  }
  activateInput(input);

  function activateButton(button) {
    // switch on/off button
    // if button is on, set to off
    button.dataset.button = button.dataset.button == "off" ? "on" : "off";
  }
  activateButton(button);

  function activateDropdown(dropdown) {
    // activate/deactivate dropdown list
    dropdown.dataset.list =
      // if dropdown is active, set to inactive
      dropdown.dataset.list == "inactive" ? "active" : "inactive";
  }
  activateDropdown(dropdown);
}

function openFilterbox(box, label, input, button, dropdown) {
  // display block filterbox
  if (
    (box.dataset.filter = "inactive") &&
    (label.dataset.label = "active") &&
    (input.dataset.input = "inactive") &&
    (button.dataset.button = "off") &&
    (dropdown.dataset.list = "inactive")
  ) {
    switchFilterbox(box, label, input, button, dropdown);
  }
}

function closeFilterbox(box, label, input, button, dropdown) {
  // display none filterbox
  if (
    (box.dataset.filter = "active") &&
    (label.dataset.label = "inactive") &&
    (input.dataset.input = "active") &&
    (button.dataset.button = "on") &&
    (dropdown.dataset.list = "active")
  ) {
    switchFilterbox(box, label, input, button, dropdown);
  }
}

function updateListsOfLi() {
  // update ingredients list with filtered recipes
  ingredientList = generateIngList(filterResult);
  // display ingredients list
  renderIngList(ingredientList);
  // update appliances list with filtered recipes
  applianceList = generateAppList(filterResult);
  // display appliances list
  renderAppList(applianceList);
  // update ustensils list with filtered recipes
  ustensilList = generateUstList(filterResult);
  // display ustensils list
  renderUstList(ustensilList);
}

function closeAllFilterboxes() {
  // close ingredient filterbox
  closeFilterbox(ingBox, ingLabel, ingInput, ingButton, ingDropdown);
  // close appliance filterbox
  closeFilterbox(appBox, appLabel, appInput, appButton, appDropdown);
  // close ustensil filterbox
  closeFilterbox(ustBox, ustLabel, ustInput, ustButton, ustDropdown);
}

document.addEventListener("click", function (e) {
  // close all filterboxes when clicking outside filterbox
  if (
    !ingBox.contains(e.target) &&
    !appBox.contains(e.target) &&
    !ustBox.contains(e.target)
  ) {
    closeAllFilterboxes();
  }
});

renderRecipeList(searchResult);

/******************   GET RECIPES BY INPUT RESEARCH   ******************/

mainInput.addEventListener("input", (event) => {
  // get input value
  const input = event.target.value.toLowerCase();

  if (input.length >= 1) {
    /* checking if input word is more than 1 letter */
    closeAllFilterboxes();
    document.querySelector("section").innerHTML = "";
    filterResult = filterRecByValue(recipes, input);
    filterResult = filterRecByTag(filterResult);
    renderRecipeList(filterResult);
  } else {
    document.querySelector("section").innerHTML = "";
  }
});

/******************   GET RECIPES BY FILTERED TAGS   ******************/

function handlerLi(typeListLi, typeTag) {
  // remove li from the list if selected
  const lis = document.querySelectorAll(`${typeListLi}`);
  const tagsSelected = document.querySelectorAll(`${typeTag}`);
  const tagsToRemove = [];

  if (tagsSelected.length > 0) {
    tagsSelected.forEach((span) => {
      tagsToRemove.push(span);
    });
    tagsToRemove.forEach((tag) => {
      lis.forEach((li) => {
        if (li.innerHTML === tag.textContent) {
          li.style.display = "none";
        }
      });
    });
  }
}

function removeSelectedTag(tag) {
  // remove selected tag on search-tags
  tag.parentElement.remove(tag.parentElement);
}

function addEventToLi(type, typeListLi, typeTag) {
  // add event listener to each li
  const ingLis = document.querySelectorAll(`${typeListLi}`);
  ingLis.forEach((li) => {
    li.addEventListener("click", () => {
      let selectedTag = li.innerHTML;
      // add data-attribute "ing" to selected tag & display it
      renderTag(selectedTag, `${type}`);
      filterResult = filterRecByTag(searchResult);
      renderRecipeList(filterResult);
      // update all lists of li with filtered recipes
      updateListsOfLi();
      // call event listener to each li
      addEventToLi(`${type}`, `${typeListLi}`, `${typeTag}`);
      // remove selected tag from the list
      handlerLi(`${typeListLi}`, `${typeTag}`);

      // closure button for tags
      const closureBtn = document.querySelectorAll("i.far.fa-times-circle");
      closureBtn.forEach((tag) => {
        tag.addEventListener("click", () => {
          removeSelectedTag(tag);
          filterResult = filterRecByTag(searchResult);
          renderRecipeList(filterResult);
          updateListsOfLi();
          addEventToLi(`${type}`, `${typeListLi}`, `${typeTag}`);
          closeAllFilterboxes();
        });
      });
    });
  });
}

/********  INGREDIENTS FILTERBOX  ********/

ingBox.onclick = function () {
  // open ingredient filterbox
  openFilterbox(ingBox, ingLabel, ingInput, ingButton, ingDropdown);
  ingredientList = generateIngList(filterResult);
  // display ingredients list
  renderIngList(ingredientList);
  addEventToLi("ing", "#ingredients-list li", ".ing-tag");
  handlerLi("#ingredients-list li", ".ing-tag");
};

ingInput.addEventListener("input", (event) => {
  const input = event.target.value.toLowerCase();
  if (input.length >= 1) {
    filterIngList = filterTagList(ingredientList, input);
    renderIngList(filterIngList);
    addEventToLi("ing", "#ingredients-list li", ".ing-tag");
    handlerLi("#ingredients-list li", ".ing-tag");
  } else {
    filterIngList = generateIngList(filterResult);
    renderIngList(filterIngList);
    addEventToLi("ing", "#ingredients-list li", ".ing-tag");
    handlerLi("#ingredients-list li", ".ing-tag");
  }
});

/********  APPLIANCES FILTERBOX  ********/

appBox.onclick = function () {
  // open appliance filterbox
  openFilterbox(appBox, appLabel, appInput, appButton, appDropdown);
  applianceList = generateAppList(filterResult);
  // display appliances list
  renderAppList(applianceList);
  addEventToLi("app", "#appliances-list li", ".app-tag");
  handlerLi("#appliances-list li", ".app-tag");
};

appInput.addEventListener("input", (event) => {
  const input = event.target.value.toLowerCase();
  if (input.length >= 1) {
    filterAppList = filterTagList(applianceList, input);
    renderAppList(filterAppList);
    addEventToLi("app", "#appliances-list li", ".app-tag");
    handlerLi("#appliances-list li", ".app-tag");
  } else {
    filterAppList = generateAppList(filterResult);
    renderAppList(filterAppList);
    addEventToLi("app", "#appliances-list li", ".app-tag");
    handlerLi("#appliances-list li", ".app-tag");
  }
});

/********  USTENSILS FILTERBOX  ********/

ustBox.onclick = function () {
  // open ustensil filterbox
  openFilterbox(ustBox, ustLabel, ustInput, ustButton, ustDropdown);
  ustensilList = generateUstList(filterResult);
  // display ustensils list
  renderUstList(ustensilList);
  addEventToLi("ust", "#ustensils-list li", ".ust-tag");
  handlerLi("#ustensils-list li", ".ust-tag");
};

ustInput.addEventListener("input", (event) => {
  const input = event.target.value.toLowerCase();
  if (input.length >= 1) {
    filterUstList = filterTagList(ustensilList, input);
    renderUstList(filterUstList);
    addEventToLi("ust", "#ustensils-list li", ".ust-tag");
    handlerLi("#ustensils-list li", ".ust-tag");
  } else {
    filterUstList = generateUstList(filterResult);
    renderUstList(filterUstList);
    addEventToLi("ust", "#ustensils-list li", ".ust-tag");
    handlerLi("#ustensils-list li", ".ust-tag");
  }
});
