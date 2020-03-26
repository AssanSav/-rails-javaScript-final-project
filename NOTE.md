### let BASE_URL = "http://localhost:3000"

# class Recipe Functions 
## static getAllRecipes() 
- Checks if `Recipe.all === 0` before calling on `Api.fetchRecipes()` to hit the backend Rails API if not it would just return a `promise` giving the program some speed. Either way this `function` will return a `Promise`

## static create(recipeAttributes)
- Calls on `Api.fetchToCreateRecipes(recipeAttributes)` chaining with a `.then` and uses the `json` from the backend API to create `new Recipe` and saves them in `Recipe.all` through the `save()` instance method

## save() 
- Saves `this` as a new instance in `Recipe.all` and always returns it `this`

## renderIndex() 
- Checks to see if a `user` is `signed in` or not, then decides of the `markup` to be rendered.

## static update(recipe) 
- Calls on `Api.fetchToUpdateRecipes(recipe)` uses the `json` from the backend to update the `new Recipe`, mapping over the `Recipe.all` and setting an `if (recipe.id === json.id)` to avoid duplications, because of closure the return value of this function will be the updated recipe `promise`.

## getDetails()
-- Checks if `this.comments.length === 0` before calling on `Api.fetchRecipeShow(this.id)` to hit the backend Rails API, `recicpe has_many comments` allows me to pass the recipe id in this case `this.id` get the recipe comments or create them returning a `resolved promise`

## comments() 
- Uses the `filter` method and returns all `comments` related to the matching `recipe id` passed in the block

## renderComments() 
- Checks to see if a `user` is `signed in` or not, finds the `recipe comments` iterate over them and then decides of the `markup` to be rendered.

## render() 
- Render the `show page markup`

## static renderForm() 
- Render the `form markup` to create a new recipe 

## renderUpdateForm() 
- Render the `form markup` to update `recipes`

## static findById(id) 
- Finds a recipe by a given `id` and return it

## Recipe.all = [] 
- In javaScript a class variable is defined outside of the class 


# class Comment 
## static create(commentAttributes) 
- Calls on `Api.fetchToCreateComments(commentAttributes)` chaining with a `.then` and uses the `json` from the backend API to create `new Comment` and saves them in `Comment.all` through the `save()` instance method

## static findOrCreate(attributes) 
- Finds a comment by a given `attributes id` to return or create a `new Comment` with those `attributes` and saves them in `Comment.all`

## render() 
- Render the `comment show page markup`

## save()  
- Saves `this` as a new instance in `Comment.all` and always returns `this`

## Comment.all 
- In javaScript a class variable is defined outside of the class 


# class Api 
## static fetchRecipes() 
- `Fetches` the `${BASE_URL}/recipes` hits the `recipes index controller action` if resolved it will return a destrutured `promise` 

## static fetchRecipeShow(id) 
- `Fetches` the `${BASE_URL}/recipes/${id}` from the id parameter hits the `recipes controller show action` if resolved it will return a destrutured `promise` of the passed in id 

## static fetchToCreateRecipes(recipeAttributes)
- `Fetches` the `${BASE_URL}/recipes` giving the `fetch` method a second argument having a `POST` method and also a `X-CSRF-Token` in the `headers` to validate the authenticity of the request, hits the `recipes controller create action` if valid, will persist the data and then returns a destructured `promise` for the fronend use

## static fetchToUpdateRecipes(recipe) 
- `Fetches` the `${BASE_URL}/recipes/${recipe.id}` by addind the recipe object id to the url, giving the `fetch` method a second argument with a `PATCH` method including also `X-CSRF-Token` in the `headers` to validate the authenticity of the request, hits the `recipes controller update action` updates the record and returns a destructured `promise`.

## static fetchToDeleteRecipe(recipeId) 
- `Fetches` the `${BASE_URL}/recipes/${recipeId}` by adding the recipe id to the Url, with a second argument to the `fetch` method of `DELETE` also including a `X-CSRF-Token` in the `headers` to validate the authenticity of the request, hits the `destroy action` and then returns a `json response` and uses `json()` to extract the actual json and return the `promise`  

## static fetchToCreateComments(commentAttributes)
- `Fetches` the `${BASE_URL}/comments` with a second argument having a `POST` method and also a `X-CSRF-Token` in the `headers` to validate the authenticity of the request, hits the `comments controller create action` if valid, will persist the data and then returns a destructured `promise` for the fronend use

## static fetchToDeleteComment(recipeId, commentId) 
- Takes in 2 arguments the `recipeId` that we want to `delete` the `comments` from and the `commentId` that is being deleted fetches the `${BASE_URL}/recipes/${recipeId}/comments/${commentId}` with a second argument of a `DELETE` method also including a `X-CSRF-Token` in the `headers` to validate the authenticity of the request, hits the `destroy action` and then returns a `json response` and uses `json()` to extract the actual json and return the `promise`  


# Adding events listeners
## document.addEventListener("DOMContentLoaded", () => {})
- Is making sure the initial html is fully loaded and parsed

##  document.addEventListener("click", (event) => {})
- Adding `clicks` events liteners responding to a button click deciding what action is being required and how to manupulate the `DOM`

## document.addEventListener("submit", (e) => {})
- `e.preventDefault()` to prevent a normal request cycle when submitting to create a new record.
- adding submit events listeners to create new instances of objects via users interactions and manupalte the `DOM`