let BASE_URL = "http://localhost:3000"

class Recipe {
    constructor({ id, image_url, category, name, ingredient1, unit1, ingredient2, unit2, ingredient3, unit3, ingredient4, unit4, ingredient5, unit5, ingredient6, unit6, directions, username, created_at,
        updated_at }) {
        this.id = id
        this.image_url = image_url
        this.name = name
        this.category = category
        this.ingredient1 = ingredient1
        this.unit1 = unit1
        this.ingredient2 = ingredient2
        this.unit2 = unit2
        this.ingredient3 = ingredient3
        this.unit3 = unit3
        this.ingredient4 = ingredient4
        this.unit4 = unit4
        this.ingredient5 = ingredient5
        this.unit5 = unit5
        this.ingredient6 = ingredient6
        this.unit6 = unit6
        this.directions = directions
        this.username = username
        this.created_at = created_at
        this.updated_at = updated_at
    }

    static getAllRecipes() {
        if (Recipe.all.length === 0) {
            return Api.fetchRecipes().then(recipes => {
                Recipe.all = recipes.map(attributes =>
                    new Recipe(attributes)
                )
                return Recipe.all
            })
        } else {
            return Promise.resolve(Recipe.all)
        }
    }

    static create(recipeAttributes) {
        return Api.fetchToCreateRecipes(recipeAttributes)
            .then(attributes => {
                return new Recipe(attributes).save()
            })
    }


    save() {
        Recipe.all.push(this)
        return this 
    }


    renderIndex() {
        let signedInInput = document.getElementById("user_signed_in?")
        let div = document.createElement("div")
        div.dataset["recipeid"] = this.id
        div.classList.add("recipesIndex")
        if (signedInInput && signedInInput.value == this.username) {
            div.innerHTML = `<img src="${this.image_url}" alt="">
                             <h4 style="color: antiquewhite;">${this.name}</h4>
                             <button class="btn"><i class="fa fa-trash"></i></button>
                             <button type="submit" class="update" data-id="${this.id}">Edit</button>
                             <button id="details">Details</button>`
            root.appendChild(div)
        } else {
            div.innerHTML = `<img src="${this.image_url}" alt="">
                             <h4 style="color: antiquewhite;">${this.name}</h4>
                             <button id="details">Details</button>`
            root.appendChild(div)
        }
    }


    static update(recipe) {
        return Api.fetchToUpdateRecipes(recipe).then(json => {
            let updatedRecipe = new Recipe(json)
            Recipe.all = Recipe.all.map(recipe => {
                if (recipe.id === json.id) {
                    return updatedRecipe
                } else {
                    return recipe
                }
            })
            return updatedRecipe
        })
    }

    
    getDetails() {
        if (this.comments().length === 0) {
            return Api.fetchRecipeShow(this.id).then(({ comments }) => {
                comments.map(commentAttributes => Comment.findOrCreate(commentAttributes))
                return this
            })
        } else {
            return Promise.resolve(this)
        }
    }


    comments() {
        return Comment.all.filter(comment => comment.recipe_id == this.id)
    }

    renderComments() {
        let signedInInput = document.getElementById("user_signed_in?")
        let divReviews = document.createElement("div")
        divReviews.id = "comments"
        this.comments().forEach(comment => {
            let p = document.createElement("p")
            p.dataset["recipeid"] = comment.recipe_id
            if (signedInInput && signedInInput.value == comment.username) {
                 p.innerHTML = `<div class="comment" data-commentid="${comment.id}">
                                    <h3 id="user" style="color: red;">${comment.username}</h3> 
                                    <p style="color: antiquewhite;">${comment.content}</p>
                                    <button class="release"><i class="fa fa-trash"></i></button>
                                </div>
                                       `
                divReviews.appendChild(p)
            } else {
                p.innerHTML = `<div class="comment" data-commentid="${comment.id}">
                                    <h3 id="user" style="color: red;">${comment.username}</h3> 
                                    <p style="color: antiquewhite;">${comment.content}</p>
                                </div>
                                       `
                divReviews.appendChild(p)
            }
               
        })
        return divReviews.outerHTML
    }
    

    render() {
        return ` 
                <img src="${this.image_url}" alt="">
                <h4 style="color: yellow;">${this.name}</h4>
                <h3 style="color: antiquewhite;">Ingredients</h3>
                <table>
                    <tr>
                        <th>${this.ingredient1}</th>
                        <th>${this.ingredient2}</th>
                        <th>${this.ingredient3}</th>
                        <th>${this.ingredient4}</th>
                        <th>${this.ingredient5}</th>
                        <th>${this.ingredient6}</th>
                    </tr>
                    <tr>
                        <td>${this.unit1}</td>
                        <td>${this.unit2}</td>
                        <td>${this.unit3}</td>
                        <td>${this.unit4}</td>
                        <td>${this.unit5}</td>
                        <td>${this.unit6}</td>
                    </tr>
                    <tr>
                </table>
                <h4 style="color: antiquewhite;">Directions</h4>
                <p style="color: antiquewhite;">${this.directions}</p>
                <h3 style="color: antiquewhite;">Reviews</h3>
                ${this.renderComments()}
                <div id="form"></div>`
    }


    static renderForm() {
      return  `
            <form class="addRecipe" >
                <p>
                    <input type="hidden" name="username" id="username">
                </p>
                <p>
                    <input type="text" name="name" id="name" placeholder="Name">
                </p>
                <p>
                    <input type="text" name="image_url" id="image_url" placeholder="Image Url">
                </p>
                <p>
                    <input type="text" name="category" id="category" placeholder="Category">
                </p>
                <p>
                    <input type="text" name="ingredient1" id="ingredient1" placeholder="Ingredient Name">
                    <input type="text" name="unit1" id="unit1" placeholder="Unit">
                </p>
                <p>
                    <input type="text" name="ingredient2" id="ingredient2" placeholder="Ingredient Name">
                    <input type="text" name="unit2" id="unit2" placeholder="Unit">
                </p>
                <p>
                    <input type="text" name="ingredient3" id="ingredient3" placeholder="Ingredient Name">
                    <input type="text" name="unit3" id="unit3" placeholder="Unit">
                </p>
                <p>
                    <input type="text" name="ingredient4" id="ingredient4" placeholder="Ingredient Name">
                    <input type="text" name="unit4" id="unit4" placeholder="Unit">
                </p>
                <p>
                    <input type="text" name="ingredient5" id="ingredient5" placeholder="Ingredient Name">
                    <input type="text" name="unit5" id="unit5" placeholder="Unit">
                </p>
                <p>
                    <input type="text" name="ingredient6" id="ingredient6" placeholder="Ingredient Name">
                    <input type="text" name="unit6" id="unit6" placeholder="Unit">
                </p>
                <p>
                    <textarea name="directions" id="directions" cols="30" rows="5" placeholder="Directions"></textarea>
                </p>
                <input type="submit" class="create"  value="Add Recipe" >
            </form>
            
            `
        
    }


    renderUpdateForm() {  
        return `
            <form class="editRecipe" data-id="${this.id}">
                <p>
                    <input type="hidden" name="username" id="username">
                </p>
                <p>
                    <input type="text" name="name" id="name" placeholder="Name" value="${this.name}">
                </p>
                <p>
                    <input type="text" name="image_url" id="image_url" placeholder="Image Url" value="${this.image_url}">
                </p>
                <p>
                    <input type="text" name="category" id="category" placeholder="Category" value="${this.category}">
                </p>
                <p>
                    <input type="text" name="ingredient1" id="ingredient1" placeholder="Ingredient Name" value="${this.ingredient1}">
                    <input type="text" name="unit1" id="unit1" placeholder="Unit" value="${this.unit1}">
                </p>
                <p>
                    <input type="text" name="ingredient2" id="ingredient2" placeholder="Ingredient Name" value="${this.ingredient2}">
                    <input type="text" name="unit2" id="unit2" placeholder="Unit" value="${this.unit2}">
                </p>
                <p>
                    <input type="text" name="ingredient3" id="ingredient3" placeholder="Ingredient Name" value="${this.ingredient3}">
                    <input type="text" name="unit3" id="unit3" placeholder="Unit" value="${this.unit3}">
                </p>
                <p>
                    <input type="text" name="ingredient4" id="ingredient4" placeholder="Ingredient Name" value="${this.ingredient4}">
                    <input type="text" name="unit4" id="unit4" placeholder="Unit" value="${this.unit4}">
                </p>
                <p>
                    <input type="text" name="ingredient5" id="ingredient5" placeholder="Ingredient Name" value="${this.ingredient5}">
                    <input type="text" name="unit5" id="unit5" placeholder="Unit" value="${this.unit5}">
                </p>
                <p>
                    <input type="text" name="ingredient6" id="ingredient6" placeholder="Ingredient Name" value="${this.ingredient6}">
                    <input type="text" name="unit6" id="unit6" placeholder="Unit" value="${this.unit6}">
                </p>
                <p>
                    <textarea name="directions" id="directions" cols="30" rows="5" placeholder="Directions">${this.directions}</textarea>
                </p>
                <input type="submit" class="editedRecipe"  value="Edit Recipe" >
            </form> 
            `
    }

    static findById(id) {
        let found = Recipe.all.find(recipe => recipe.id == id)
        return found
    }


    renderCommentForm() {
        let form = document.getElementById("form")
        form.innerHTML = `<form class="addComment">
                            <input type="hidden" id="recipe_id" value="${this.id}">
                            <textarea name="content" id="content" cols="30" rows="5"></textarea><br>
                            <input type="submit" value="Add Comment">
                         </form><br>
                         `
    }
}
Recipe.all = []



class Comment {
    constructor({ id, content, recipe_id, username}) {
        this.id = id 
        this.content = content
        this.username = username
        this.recipe_id = recipe_id
    }

    static create(commentAttributes) {
        return Api.fetchToCreateComments(commentAttributes)
            .then(commentAttribute => {
            return new Comment(commentAttribute).save()
        })
    }

    static findOrCreate(attributes) {
        let found = Comment.all.find(comment => comment.id == attributes.id)
        return found ? found : new Comment(attributes).save()
    }


    render() {
        let div = document.getElementById("comments")
        let p = document.createElement("p")
        p.dataset["recipeid"] = this.recipe_id
        p.innerHTML = `<div class="comment" data-commentid="${this.id}">
                            <h3 id="user" style="color: red;">${this.username}</h3> 
                            <p style="color: antiquewhite;">${this.content}</p>
                            <button class="release"><i class="fa fa-trash"></i></button>
                        </div>
                        `
        div.appendChild(p)
    }

    
    save() {
        Comment.all.push(this)
        return this
    }
}
Comment.all = []



class Api {
    static fetchRecipes() {
        return fetch(`${BASE_URL}/recipes`)
            .then(resp => resp.json())
            .then(({ data }) => {
                return data.map(({ id, attributes: { image_url, name, category, ingredient1, unit1, ingredient2, unit2, ingredient3, unit3, ingredient4, unit4, ingredient5, unit5, ingredient6, unit6, directions, username, created_at,
                    updated_at } }) => {
                    return {
                        id,
                        image_url,
                        name,
                        category,
                        ingredient1,
                        unit1,
                        ingredient2,
                        unit2,
                        ingredient3,
                        unit3,
                        ingredient4,
                        unit4,
                        ingredient5,
                        unit5,
                        ingredient6,
                        unit6,
                        directions,
                        username,
                        created_at,
                        updated_at
                    }
                })
            })

    }


    static fetchRecipeShow(id) {
        return fetch(`${BASE_URL}/recipes/${id}`)
            .then(resp => resp.json())
            .then(json => {
                const {
                    data: {
                        id,
                        attributes: {
                            image_url,
                            name,
                            category,
                            ingredient1,
                            unit1,
                            ingredient2,
                            unit2,
                            ingredient3,
                            unit3,
                            ingredient4,
                            unit4,
                            ingredient5,
                            unit5,
                            ingredient6,
                            unit6,
                            directions,
                            username, 
                            created_at,
                            updated_at
                        }
                    },
                    included
                } = json
                return {
                    id,
                    image_url,
                    name,
                    category,
                    ingredient1,
                    unit1,
                    ingredient2,
                    unit2,
                    ingredient3,
                    unit3,
                    ingredient4,
                    unit4,
                    ingredient5,
                    unit5,
                    ingredient6,
                    unit6,
                    directions,
                    username,
                    created_at,
                    updated_at,
                    comments: included.map(({ id, attributes: { content, username, recipe_id} }) => {
                        return {
                            id,
                            content,
                            username,
                            recipe_id
                        }
                    })
                }
            })
    }


    static fetchToCreateRecipes(recipeAttributes) {
        return fetch(`${BASE_URL}/recipes`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').content
            },
            body: JSON.stringify(recipeAttributes)
        })
            .then(resp => resp.json())
            .then(json => {
                const {
                    data: {
                        id,
                        attributes: {
                            image_url,
                            name,
                            category,
                            ingredient1,
                            unit1,
                            ingredient2,
                            unit2,
                            ingredient3,
                            unit3,
                            ingredient4,
                            unit4,
                            ingredient5,
                            unit5,
                            ingredient6,
                            unit6,
                            directions,
                            username,
                            created_at,
                            updated_at
                        }
                    }
                } = json
                return {
                    id,
                    image_url,
                    name,
                    category,
                    ingredient1,
                    unit1,
                    ingredient2,
                    unit2,
                    ingredient3,
                    unit3,
                    ingredient4,
                    unit4,
                    ingredient5,
                    unit5,
                    ingredient6,
                    unit6,
                    directions,
                    username,
                    created_at,
                    updated_at
                }
            })
    }


    static fetchToUpdateRecipes(recipe) {
        return fetch(`${BASE_URL}/recipes/${recipe.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').content
            },
            body: JSON.stringify(recipe)
        })
            .then(resp => resp.json())
            .then(json => {
                const {
                    data: {
                        id,
                        attributes: {
                            image_url,
                            name,
                            category,
                            ingredient1,
                            unit1,
                            ingredient2,
                            unit2,
                            ingredient3,
                            unit3,
                            ingredient4,
                            unit4,
                            ingredient5,
                            unit5,
                            ingredient6,
                            unit6,
                            directions,
                            username,
                            created_at,
                            updated_at
                        }
                    }
                } = json
                return {
                    id,
                    image_url,
                    name,
                    category,
                    ingredient1,
                    unit1,
                    ingredient2,
                    unit2,
                    ingredient3,
                    unit3,
                    ingredient4,
                    unit4,
                    ingredient5,
                    unit5,
                    ingredient6,
                    unit6,
                    directions,
                    username,
                    created_at,
                    updated_at
                }
            })
    }


    static fetchToDeleteRecipe(recipeId) {
        return fetch(`${BASE_URL}/recipes/${recipeId}`, {
            method: "DELETE",
            headers: {
                'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').content
            }
        })
            .then(resp => resp.json())
    }


    static fetchToCreateComments(commentAttributes) {
        return fetch(`${BASE_URL}/comments`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').content
            },
            body: JSON.stringify(commentAttributes)
        })
            .then(resp => resp.json())
            .then(json => {
                const {
                    data: {
                        id,
                        attributes: {
                            content,
                            username,
                            recipe_id
                        }
                    }
                } = json
                return {
                    id, 
                    content,
                    username,
                    recipe_id 
                }
            })
    }


    static fetchToDeleteComment(recipeId, commentId) {
        return fetch(`${BASE_URL}/recipes/${recipeId}/comments/${commentId}`, {
            method: "DELETE",
            headers: {
                'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').content
            }
        })
            .then(resp => resp.json())
    }
}



document.addEventListener("DOMContentLoaded", () => {
    document.body.style.backgroundColor = "black"

    let root = document.getElementById("root")
    let recipeFormContainer = document.querySelector(".container")
    let signedInInput = document.getElementById("user_signed_in?")
    let recipeForm = document.querySelector(".container") 

        Recipe.getAllRecipes().then(recipes => {
            let recipesSorted = recipes.sort((a, b) => (a.created_at < b.created_at) ? 1 : -1)
            recipesSorted.forEach(recipe => {
                recipe.renderIndex()
            })
        })

    
    document.addEventListener("click", (e) => {
        if (e.target.innerHTML === "Details") {
            let recipe = Recipe.findById(e.target.parentElement.dataset.recipeid)
            recipe.getDetails().then(recipe => {
                root.dataset["recipeid"] = this.id
                root.innerHTML = recipe.render()
                if (signedInInput) {
                    Recipe.findById(recipe.id).renderCommentForm()
                }
            })
        } else if (e.target.matches(".btn,.btn i")) {
            let recipeId = e.target.parentElement.dataset.recipeid || e.target.parentElement.parentElement.dataset.recipeid
            Api.fetchToDeleteRecipe(recipeId).then(json => {
                if (confirm("Confirm")) {
                    document.querySelector(`.recipesIndex[data-recipeid='${json.data.id}']`).remove()
                }   
            })       
        }
        else if (e.target.matches(".release,.release i")) {
            let recipeId = e.target.parentElement.parentElement.dataset.recipeid || e.target.parentElement.parentElement.parentElement.dataset.recipeid
            let commentId = e.target.parentElement.dataset.commentid || e.target.parentElement.parentElement.dataset.commentid
            Api.fetchToDeleteComment(recipeId, commentId).then(json => {
                document.querySelector(`.comment[data-commentid='${json.data.id}']`).remove()
            })
        }
        else if (e.target.innerHTML === "Create New Recipe" && signedInInput) {
            recipeFormContainer.innerHTML = Recipe.renderForm()
            recipeForm.style.display = "block"
        } 
        else if (e.target.matches(".create")) {
            recipeForm.style.display  = "none"
        }    
        else if (e.target.matches(".update")) {
            let recipe = Recipe.all.find(recipe => recipe.id == e.target.dataset.id)
            recipeFormContainer.innerHTML = recipe.renderUpdateForm()
        }
        else if (e.target.matches("#search")) {
            let search = e.target.parentElement.querySelector("#inputSearch").value
            let searchCapitalized = search.charAt(0).toUpperCase() + search.slice(1)
            let results = Recipe.all.filter(recipe => recipe.name.includes(searchCapitalized))
            root.innerHTML = ""
            results.forEach(recipe => {
                recipe.renderIndex()
            })
        }
    })


    document.addEventListener("submit", (e) => {
        if (e.target.matches(".addRecipe")) {
            e.preventDefault()
            let formData = {
                name: e.target.querySelector("#name").value,
                category: e.target.querySelector("#category").value,
                image_url: e.target.querySelector("#image_url").value,
                ingredient1: e.target.querySelector("#ingredient1").value,
                unit1: e.target.querySelector("#unit1").value,
                ingredient2: e.target.querySelector("#ingredient2").value,
                unit2: e.target.querySelector("#unit2").value,
                ingredient3: e.target.querySelector("#ingredient3").value,
                unit3: e.target.querySelector("#unit3").value,
                ingredient4: e.target.querySelector("#ingredient4").value,
                unit4: e.target.querySelector("#unit4").value,
                ingredient5: e.target.querySelector("#ingredient5").value,
                unit5: e.target.querySelector("#unit5").value,
                ingredient6: e.target.querySelector("#ingredient6").value,
                unit6: e.target.querySelector("#unit6").value,
                directions: e.target.querySelector("#directions").value,
            }
            Recipe.create(formData).then(recipe => {
                root.innerHTML = recipe.render()
                document.querySelector(".addRecipe").reset()
            })
        } else if (e.target.matches(".editRecipe")) {
            e.preventDefault()
            let recipe = Recipe.all.find(rec => rec.id == e.target.dataset.id)
            recipe.UpdateFormData = {
                id: e.target.dataset.id,
                image_url: e.target.querySelector("#image_url").value,
                name: e.target.querySelector("#name").value,
                category: e.target.querySelector("#category").value,
                ingredient1: e.target.querySelector("#ingredient1").value,
                unit1: e.target.querySelector("#unit1").value,
                ingredient2: e.target.querySelector("#ingredient2").value,
                unit2: e.target.querySelector("#unit2").value,
                ingredient3: e.target.querySelector("#ingredient3").value,
                unit3: e.target.querySelector("#unit3").value,
                ingredient4: e.target.querySelector("#ingredient4").value,
                unit4: e.target.querySelector("#unit4").value,
                ingredient5: e.target.querySelector("#ingredient5").value,
                unit5: e.target.querySelector("#unit5").value,
                ingredient6: e.target.querySelector("#ingredient6").value,
                unit6: e.target.querySelector("#unit6").value,
                directions: e.target.querySelector("#directions").value,
            }
            
        } else if (e.target.matches(".addComment")) {
            e.preventDefault()
            let data = {
                content: e.target.querySelector("#content").value,
                recipe_id: e.target.querySelector("#recipe_id").value
            }
            Comment.create(data).then(comment => {
                comment.render()
                e.target.querySelector("#content").value = ""
            })
        } 
    })


    document.querySelector("#inputSearch").addEventListener("keyup", (e) => {
        if (e.keyCode === 13) {
            e.preventDefault()
            document.getElementById("search").click();
        }
    })
})







