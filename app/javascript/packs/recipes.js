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
}