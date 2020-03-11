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
}


document.addEventListener("DOMContentLoaded", () => {
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
})