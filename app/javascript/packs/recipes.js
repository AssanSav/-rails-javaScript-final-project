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

    static getAllRecipesFromPromise() {
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

    static createRecipeFromPromise(recipeAttributes) {
        return Api.fetchToCreateRecipes(recipeAttributes)
            .then(json => {
                return new Recipe(json).save
            })
    }

    save() {
        Recipe.all.push(this)
        return this 
    }

    static renderForm() {
        let recipeSection = document.querySelector(".addRecipe")
        recipeSection.innerHTML = `
                                    <form >
                                        <p>
                                            <input type="text" name="name" id="recipe_name" placeholder="Name">
                                        </p>
                                        <p>
                                            <input type="text" name="image_url" id="image_url" placeholder="Image Url">
                                        </p>
                                        <p>
                                            <textarea name="directions" id="directions" cols="30" rows="10" placeholder="Directions"></textarea>
                                        </p>
                                        <p>
                                            <textarea name="ingredients" id="ingredients" cols="30" rows="10" placeholder="Ingredients"></textarea>
                                        </p>
                                        <input type="submit" value="Add Recipe" >
                                    </form>
                                    `
        return recipeSection
    }
}

Recipe.all = []


class Api {
    static fetchRecipes() {
        return fetch(`${BASE_URL}/recipes`)
            .then(resp => resp.json())
            .then(({ data }) => {
                return data.map(({ id, attributes: { image_url, name, ingredients, directions, user_id } }) => {
                    return { id, image_url, name, ingredients, directions, user_id }
                })
            })

    }

    static fetchRecipeShow(recipe_id) {
        return fetch(`${BASE_URL}/recipes/${recipe_id}`)
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
                "Accept": "application/json"
            },
            body: JSON.stringify(recipeAttributes)
        })
            .then(resp => resp.json())
    }

}



document.addEventListener("DOMContentLoaded", () => {
    Recipe.renderForm()

    function renderRecipesIndex() {
        Recipe.getAllRecipesFromPromise()
        let root = document.getElementById("root")
        Recipe.getAllRecipesFromPromise().then(recipes => {
            recipes.forEach(({ id, image_url, name, ingredients, user_id }) => {
                let div = document.createElement("div")
                div.dataset["recipeid"] = id
                div.innerHTML =     `<img src="${image_url}" alt="">
                                     <h4>${name}</h4>
                                     <button id="details">More Details</button>`
                root.appendChild(div)
            })
        })
    }
    renderRecipesIndex()

    document.addEventListener("click", (e) => {
        if (e.target.innerHTML === "More Details") {
            let parentDiv = e.target.parentElement
            Api.fetchRecipeShow(e.target.parentElement.dataset.recipeid).then(data => {
                parentDiv.innerHTML = ` <img src="${data["image_url"]}" alt="">
                                        <h4>${data["name"]}</h4>
                                        <h4>Ingredients</h4>
                                        <p>${data["ingredients"]}</p>
                                        <h4>Directions</h4>
                                        <p>${data["directions"]}</p>
                                        <h3>Reviews</h3>
                                        `
                data["comments"].forEach(({ content }) => {
                    let divReviews = document.createElement("div")
                    divReviews.id = "comments"
                    if (content) {
                        divReviews.innerHTML = `<p>${content}</p>
                                                <button id="details">Back</button>`
                        parentDiv.appendChild(divReviews)
                    }

                })
            })
         } else if (e.target.innerHTML === "Back") {
            let root = document.getElementById("root")
            root.innerHTML = renderRecipesIndex()
        }
    })

    // document.addEventListener("submit", (e) => {
    //     e.preventDefault()
    //     if (e.target.innerHTML = "Add Recipe") {
    //         debugger
    //     }
    // })
})