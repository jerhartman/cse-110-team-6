window.addEventListener('DOMContentLoaded', init)

const sessionStorage = window.sessionStorage
const localStorage = window.localStorage

/**
 * bind favorite button on the general recipe page
 */
function bindFavoriteButton (event) {
  const recipeData = JSON.parse(sessionStorage.getItem(sessionStorage.getItem('curr')))
  const FavoriteButton = event.target
  let inList = false
  if (localStorage.getItem(recipeData.id) != null) {
    inList = true
  }
  if (!inList) {
    // store
    try {
      localStorage.setItem(recipeData.id, JSON.stringify(recipeData))
    } catch {
      console.log('WARNING!!: Recipe not stored')
    }
    FavoriteButton.innerHTML = 'Remove from MyRecipes'
  } else {
    // delete
    try {
      localStorage.removeItem(recipeData.id)
    } catch {
      console.log('Remove Unsuccessful')
    }
    FavoriteButton.innerHTML = 'Add to MyRecipes'
  }
}

/**
 * Open note and hide image when click the button
 */
function openNotes () {
  const recipeExpand = document.querySelector('recipe-expand-bootstrap')
  recipeExpand.shadowRoot.querySelector('.photo').classList.add('hide')
  recipeExpand.shadowRoot.querySelector('.notes').classList.remove('hide')
}

/**
* Open image and hide note when click the button
* Set notes div display:none and remove display
*/
function openImage () {
  const recipeExpand = document.querySelector('recipe-expand-bootstrap')
  recipeExpand.shadowRoot.querySelector('.notes').classList.add('hide')
  recipeExpand.shadowRoot.querySelector('.photo').classList.remove('hide')
}

/**
* Go back on step in the history, bind to Back to Search button
*/
function backToSearch () {
  window.history.back()
}

function init () {
  // eslint-disable-next-line no-console
  console.log('Called')

  // populate page with JSON data
  const dataKey = sessionStorage.getItem('curr')
  let recipeData
  if (sessionStorage.getItem(dataKey) == null) {
    recipeData = JSON.parse(localStorage.getItem(dataKey))
  } else {
    recipeData = JSON.parse(sessionStorage.getItem(dataKey))
  }
  // console.log(recipeData)
  const recipeExpand = document.createElement('recipe-expand-bootstrap')
  recipeExpand.data = recipeData
  document.querySelector('.main-div').appendChild(recipeExpand)

  // Making div display time selected from slider
  // recipeExpand.shadowRoot.querySelector('.notes-button').addEventListener('click', openNotes)
  // recipeExpand.shadowRoot.querySelector('.image-button').addEventListener('click', openImage)

  // Return to search results when "Back to search" is clicked
  recipeExpand.shadowRoot.querySelector('.back-button').addEventListener('click', backToSearch)

  // Add to MyRecipes and Remove from MyRecipes
  recipeExpand.shadowRoot.querySelector('.add-to-myrecipes').addEventListener('click', bindFavoriteButton)
  // recipeExpand.shadowRoot.querySelector('.add-to-myrecipes button').addEventListener('click', testFunc)
}
