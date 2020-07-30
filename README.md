# Rails API with JavaScript Front-end Full CRUD and Users Authentications

## summary 
This APP uses a Rails API back-end and a JavaScript front-end using the `fetch()` method to fetch the back-end, gets the JSON uses the `json()` method to instantiate javaScript Objects and saves them in `Recipe.all` and `Comment.all` so it won't hit the API for the next request. This APP follows the concerns principal such as request related to `Json API` requests are happenning in the `Api class`, rendering `markup texts`, `logic statements` not related to `DOM` manupulations, instatiating `new Object` instances, saving them in a class variable happen in the `Recipe` and `Comment` classes. Everything related to `DOM` manupulation happen in the `events liteners`.
This APP has users `authentications` via `devise gem` and to fully use the APP you would have to create and account `follow below`. This APP allows users to create FOOD RECIPES to be shared among others users, leave COMMENTS...

## Ruby version
- ruby 2.6.1

## System dependencies
```
gem "devise", "~> 4.7"
gem "fast_jsonapi", "~> 1.5"
gem "pry", "~> 0.12.2"
gem "typhoeus", "~> 1.3"
gem 'rails', '~> 6.0.2', '>= 6.0.2.1'
```
## Start
- Fork and clone this repository and then run 

## Configuration
- run `yarn install --check-files` to update yarn
- run `rails db:migrate` to create the migrations
- run `rails s` to start the rails server
- head to `http://localhost:3000/` on your browser and click on `signup` to create a new account 
- head back to your terminal and run `rails db:seed` to seed the database
- Go back to your browser and you should see new records of Recipes. 


# Documenting the APP functions

### let BASE_URL = "http://localhost:3000"

# class Recipe Functions 
## static getAllRecipes() 
- Checks if `Recipe.all === 0` before calling on `Api.fetchRecipes()` to instantiate `new instances of recipes` saves them in `Recipe.all` giving the program some flexibility.

## static create(recipeAttributes)
- Calls on `Api.fetchToCreateRecipes(recipeAttributes)` chaining with a `.then` and uses the `json` from the backend API to create `new Recipes` and saves them in `Recipe.all` through the `save()` instance method

## save() 
- Saves `this` as a new instance of recipe in `Recipe.all` and returns it

## renderIndex() 
- Checks to see if a `user` is `signed in` or not, then decides of the `markup` to be rendered.

## static update(recipe) 
- Calls on `Api.fetchToUpdateRecipes(recipe)` uses the `json` from the backend to update the `new Recipe`, mapping over the `Recipe.all` and setting an `if (recipe.id === json.id)` to avoid duplications, the return value of this function will be the updated recipe `promise`.

## getDetails()
-- Checks if `this.comments.length === 0` before calling on `Api.fetchRecipeShow(this.id)` to hit the backend Rails API, `recicpe has_many comments` allows me to pass the recipe id in this case `this.id` finds the recipe comments or create them returning a `resolved promise`

## comments() 
- Uses the `filter` method and returns all `comments` related to the matching `recipe id` passed in the block

## renderComments() 
- Checks to see if a `user` is `signed in` or not, finds the `recipe comments` iterate over them and then decides of the `markup` to be rendered.

## render() 
- Render the `show page markup`

## static renderForm() 
- Render the `form markup` to create new recipes 

## renderUpdateForm() 
- Render the `form markup` to update recipes

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
- `Fetches` the `${BASE_URL}/recipes` giving the `fetch` method a second argument with a `POST` method a `X-CSRF-Token` in the `headers` to validate the authenticity of the request, hits the `recipes controller create action` if valid, will persist the data and then returns a destructured `promise` for the frontend use

## static fetchToUpdateRecipes(recipe) 
- `Fetches` the `${BASE_URL}/recipes/${recipe.id}` by addind the recipe object id to the url, giving the `fetch` method a second argument with a `PATCH` method including a `X-CSRF-Token` in the `headers` to validate the authenticity of the request, hits the `recipes controller update action` updates the record and returns a destructured `promise`.

## static fetchToDeleteRecipe(recipeId) 
- `Fetches` the `${BASE_URL}/recipes/${recipeId}` by adding the recipe id to the Url, with a second argument to the `fetch` method of `DELETE` including a `X-CSRF-Token` in the `headers` to validate the authenticity of the request, hits the `destroy action` and then returns a `json response` and uses `json()` to extract the actual json and return the `promise`  

## static fetchToCreateComments(commentAttributes)
- `Fetches` the `${BASE_URL}/comments` with a second argument of a `POST` method and `X-CSRF-Token` in the `headers` to validate the authenticity of the request, hits the `comments controller create action` if valid, will persist the data and then returns a destructured `promise` for the frontend use

## static fetchToDeleteComment(recipeId, commentId) 
- Takes in 2 arguments the `recipeId` that we want to `delete` the `comment` from and the `commentId` that is being deleted fetches the `${BASE_URL}/recipes/${recipeId}/comments/${commentId}` with a second argument of `DELETE` method including a `X-CSRF-Token` in the `headers` to validate the authenticity of the request, hits the `destroy action` and then returns a `json response` and uses `json()` to extract the actual json and return the `promise`  


# Adding events listeners
## document.addEventListener("DOMContentLoaded", () => {})
- Is making sure the initial `HTML` is fully loaded and parsed

##  document.addEventListener("click", (event) => {})
- Adding `click` events liteners responding to a button click deciding what action is being required and how to manupulate the `DOM`

## document.addEventListener("submit", (e) => {})
- `e.preventDefault()` to prevent a normal request cycle when submitting to create a new record.
- adding submit events listeners to create new instances of objects via users interactions and manipulate the `DOM`
