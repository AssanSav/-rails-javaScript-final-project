let BASE_URL = "http://localhost:3000"

class Recipe {
    constructor({ id, image_url, category, name, ingredient1, unit1, ingredient2, unit2, ingredient3, unit3, ingredient4, unit4, ingredient5, unit5, directions, user_id, created_at,
        updated_at}) {
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
        this.directions = directions
        this.user_id = user_id
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
        if (signedInInput && parseInt(signedInInput.value) === this.user_id) {
            div.innerHTML = `
                            <img src="${this.image_url}" alt="">
                            <h4 style="color: antiquewhite;">${this.name}</h4>
                            <button class="btn"><i class="fa fa-trash"></i></button>
                            <button id="details">Details</button>`
            root.appendChild(div)
        } else {
            div.innerHTML = `<img src="${this.image_url}" alt="">
                            <h4 id="myh4">${this.name}</h4>
                            <button id="details">Details</button>`
            root.appendChild(div)
        }
    }


    static render(recipe) {
        let root = document.getElementById("root")
        root.dataset["recipeid"] = recipe.id
        root.innerHTML = ` <img src="${recipe.image_url}" alt="">
                            <h4 id="myh4">${recipe.name}</h4>
                            <h3 style="color: antiquewhite;">Ingredients</h3>
                            <table>
                                <tr>
                                    <th>${recipe.ingredient1}</th>
                                    <th>${recipe.ingredient2}</th>
                                    <th>${recipe.ingredient3}</th>
                                    <th>${recipe.ingredient4}</th>
                                    <th>${recipe.ingredient5}</th>
                                    <th>${recipe.ingredient6}</th>
                                </tr>
                                <tr>
                                    <td>${recipe.unit1}</td>
                                    <td>${recipe.unit2}</td>
                                    <td>${recipe.unit3}</td>
                                    <td>${recipe.unit4}</td>
                                    <td>${recipe.unit5}</td>
                                    <td>${recipe.unit6}</td>
                                </tr>
                                <tr>
                            </table>
                            <h4 style="color: antiquewhite;">Directions</h4>
                            <p>${recipe.directions}</p>
                            <button type="submit" class="update" data-id="${recipe.id}">Edit</button>
                            <h3 style="color: antiquewhite;">Reviews</h3>
                            <div id="form"></div>
                            <button class="go-back" onclick="javascript:history.go()">Go Back</button>
                                        `
        return root.outerHTML
    }


    static renderForm() {
        let recipeFormContainer = document.querySelector(".container")
        recipeFormContainer.innerHTML = `
                                    <form class="addRecipe" >
                                        <p>
                                            <input type="hidden" name="user_id" id="user_id">
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


    static findById(id) {
        let found = Recipe.all.find(recipe => recipe.id == id)
        return found
    }


    renderCommentForm() {
        let form = document.getElementById("form")
        form.innerHTML = `<form class="addComment">
                            <input type="hidden" id="recipe_id" value="${this.id}">
                            <textarea name="content" id="content" cols="30" rows="5"></textarea>
                            <input type="submit" id="addComment" value="Add Comment">
                         </form><br>
                         `
    }
}
Recipe.all = []



class Comment {
    constructor({ id, content, recipe_id, user_id }) {
        this.id = id 
        this.content = content
        this.recipe_id = recipe_id
        this.user_id = user_id
    }


    static create(commentAttributes) {
        return Api.fetchToCreateComments(commentAttributes)
            .then(json => {
            return new Comment(json).save()
        })
    }


    render() {
        let div = document.getElementById("comments")
        let p = document.createElement("p")
        p.dataset["recipeid"] = this.recipe_id
        p.innerHTML = `<span class="comment" data-commentid="${this.id}">
                        ${this.content}  
                        <button class="release"><i class="fa fa-trash"></i></button>
                        </span>
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
                return data.map(({ id, attributes: { image_url, name, category, ingredient1, unit1, ingredient2, unit2, ingredient3, unit3, ingredient4, unit4, ingredient5, unit5, ingredient6, unit6, directions, user_id, created_at,
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
                        user_id,
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
                            user_id, 
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
                    user_id,
                    created_at,
                    updated_at,
                    comments: included.map(({ id, attributes: { content, recipe_id, user_id } }) => {
                        return {
                            id,
                            user_id,
                            recipe_id,
                            content
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
                            user_id,
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
                    user_id,
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
                            recipe_id
                        }
                    }
                } = json
                return {
                    id, 
                    content,
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
    document.body.style.backgroundImage = "url()"
    
    let comment_username = document.getElementById("comment_user").value
    let root = document.getElementById("root")
    let signedInInput = document.getElementById("user_signed_in?")
    let recipeForm = document.querySelector(".container") 
    let formShow = document.querySelector(".formShow")

        Recipe.getAllRecipes().then(recipes => {
            let recipesSorted = recipes.sort((a, b) => (a.created_at < b.created_at) ? 1 : -1)
            recipesSorted.forEach(recipe => {
                recipe.renderIndex()
            })
        })

    
    document.addEventListener("click", (e) => {
        if (e.target.innerHTML === "Details") {
            Api.fetchRecipeShow(e.target.parentElement.dataset.recipeid).then(recipe => {
                Recipe.render(recipe)
                if (signedInInput) {
                    Recipe.findById(recipe.id).renderCommentForm()
                }
                let divReviews = document.createElement("div")
                divReviews.id = "comments"
                recipe.comments.forEach(comment => {
                    if (content) {
                        let p = document.createElement("p")
                        p.dataset["recipeid"] = comment.recipe_id
                        p.innerHTML = `<span class="comment" data-commentid="${comment.id}">
                                        <h3 style="color: red;">${comment_username}</h3> ${comment.content}  
                                        <button class="release"><i class="fa fa-trash"></i></button>
                                        </span>
                                       `
                        divReviews.appendChild(p)
                    }
                })
                root.appendChild(divReviews)
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
        else if (e.target.innerHTML === "Show Form" && signedInInput) {
            Recipe.renderForm()
            recipeForm.style.display = "block"
            formShow.innerText = "Hide Form"
        } 
        else if (e.target.innerHTML === "Hide Form") {
            recipeForm.style.display  = "none"
            formShow.innerText = "Show Form"
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
                Recipe.render(recipe)
                    document.querySelector(".addRecipe").reset()
            })
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
