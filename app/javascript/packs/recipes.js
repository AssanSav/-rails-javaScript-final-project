let BASE_URL = "http://localhost:3000"

class Recipe {
    constructor({ id, image_url, name, ingredients, directions, user_id }) {
        this.id = id
        this.image = image_url
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


class Api {
    static fetchRecipes() {
        return fetch(`${BASE_URL}/recipes`)
            .then(resp => resp.json())
            .then(({ data }) => {
                return data.map(({ id, attributes: { image, name, directions, user_id } }) => {
                    return { id, image, name, directions, user_id }
                })
            })

    }
}