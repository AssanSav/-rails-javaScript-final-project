let BASE_URL = "http://localhost:3000"

class Recipe {
    constructor({ id, image_url, name, ingredients, directions, user_id }) {
        this.id = id
        this.image_url = image_url
        this.name = name
        this.ingredients = ingredients
        this.directions = directions
        this.user_id = user_id
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
            .then(json => {
                return new Recipe(json).save()
            })
    }

    save() {
        Recipe.all.push(this)
        return this 
    }

    static render(recipe) {
        let root = document.getElementById("root")
        root.innerHTML = ` <img src="${recipe["image_url"]}" alt="">
                                        <h4>${recipe["name"]}</h4>
                                        <h4>Ingredients</h4>
                                        <p>${recipe["ingredients"]}</p>
                                        <h4>Directions</h4>
                                        <p>${recipe["directions"]}</p>
                                        <h3>Reviews</h3>
                                        <div id="form"></div>
                                        `
        return root.outerHTML
    }

    static renderForm() {
        let recipeSection = document.querySelector(".addRecipe")
        recipeSection.innerHTML = `
                                    <form class="addRecipe" >
                                        <p>
                                            <input type="text" name="name" id="recipe_name" placeholder="Name">
                                        </p>
                                        <p>
                                            <input type="text" name="image_url" id="image_url" placeholder="Image Url">
                                        </p>
                                        <p>
                                            <textarea name="directions" id="directions" cols="30" rows="5" placeholder="Directions"></textarea>
                                        </p>
                                        <p>
                                            <textarea name="ingredients" id="ingredients" cols="30" rows="5" placeholder="Ingredients"></textarea>
                                        </p>
                                        <input type="submit"  value="Add Recipe" >
                                    </form>
                                    `
    }

    static findId(id) {
        let found = Recipe.all.find(recipe => recipe.id == id)
        return found
    }

    renderCommentForm() {
        let form = document.getElementById("form")
        form.innerHTML = `<form class="addComment">
                            <input type="hidden" id="recipe_id" value="${this.id}">
                            <input type="text" name="content" id="content"><br>
                            <input type="submit" value="Add Comment">
                         </form><br>
                         <button id="back">Back</button>`
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
        p.innerText = content.value
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
                return data.map(({ id, attributes: { image_url, name, ingredients, directions, user_id } }) => {
                    return {
                        id,
                        image_url,
                        name,
                        ingredients,
                        directions,
                        user_id
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
                            ingredients,
                            directions,
                            user_id
                        }
                    },
                    included
                } = json
                return {
                    id,
                    image_url,
                    name,
                    ingredients,
                    directions,
                    user_id,
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
    }


    static fetchToDelete(e) {
        let recipeId = e.target.parentElement.dataset.recipeid
        fetch(`${BASE_URL}/recipes/${recipeId}`, {
            method: "DELETE",
            headers: {
                'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').content
            }
        })
            .then(resp => resp.json())
            .then(json => {
            e.target.parentElement.remove()
        })
    }


    static fetchToCreateComments(commentAttributes) {
        return fetch(`${BASE_URL}/comments`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').content
            },
            body: JSON.stringify({
                comment: commentAttributes
            })
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

}



document.addEventListener("DOMContentLoaded", () => {
    Recipe.renderForm()

    function renderRecipesIndex() {
        let root = document.getElementById("root")
        Recipe.getAllRecipes().then(recipes => {
            let signedInInput = document.getElementById("user_signed_in?")
            recipes.forEach(({ id, image_url, name, user_id }) => {
                let div = document.createElement("div")
                div.dataset["recipeid"] = id
                
                if (signedInInput && parseInt(signedInInput.value) === user_id) {
                    div.innerHTML = `<img src="${image_url}" alt="">
                                     <h4>${name}</h4>
                                     <button class="delete">Delete</button>
                                     <button id="details">More Details</button>`
                    root.appendChild(div)  
                } else {
                    div.innerHTML = `<img src="${image_url}" alt="">
                                     <h4>${name}</h4>
                                     <button id="details">More Details</button>`
                    root.appendChild(div)  
                }
                
            })
        })
    }
    renderRecipesIndex()

    document.addEventListener("click", (e) => {
        if (e.target.innerHTML === "More Details") {
            let root = document.getElementById("root")
            Api.fetchRecipeShow(e.target.parentElement.dataset.recipeid).then(recipe => {
                Recipe.render(recipe)
                Recipe.findId(recipe.id).renderCommentForm()
                let divReviews = document.createElement("div")
                divReviews.id = "comments"
                recipe["comments"].forEach(({ content }) => {
                    if (content) {
                        let p = document.createElement("p")
                        p.innerHTML = `<p>${content}</p>`
                        divReviews.appendChild(p)
                    }
                })
                root.appendChild(divReviews)
            })
        } else if (e.target.innerHTML === "Back") {
            let root = e.target.parentElement.parentElement
            root.innerHTML = renderRecipesIndex()
        } else if (e.target.matches(".delete")) {
            Api.fetchToDelete(e)
        }
    })

    document.addEventListener("submit", (e) => {
        if (e.target.matches(".addRecipe")) {
            e.preventDefault()
            let formData = {
                name: e.target.querySelector("#recipe_name").value,
                image_url: e.target.querySelector("#image_url").value,
                ingredients: e.target.querySelector("#directions").value,
                directions: e.target.querySelector("#ingredients").value
            }
            Recipe.create(formData).then(recipe => {
                if (recipe.id) {
                    Recipe.render(recipe)
                }
            })
        } else if (e.target.matches(".addComment")) {
            e.preventDefault()
            let data = {
                content: e.target.querySelector("#content").value,
                recipe_id: e.target.querySelector("#recipe_id").value
            }
            Comment.create(data).then(comment => {
                comment.render()
            })
        }
    })
})