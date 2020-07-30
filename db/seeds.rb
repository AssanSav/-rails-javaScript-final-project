# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
# u = User.find_by(id: 1)


    Api.request_api["meals"].each do |attr|
      Recipe.create(user_id: 1, name: attr["strMeal"], image_url: attr["strMealThumb"], category: attr["strCategory"], directions: attr["strInstructions"], ingredient1: attr["strIngredient1"], unit1: attr["strMeasure1"], ingredient2: attr["strIngredient2"], unit2: attr["strMeasure2"], ingredient3: attr["strIngredient3"], unit3: attr["strMeasure3"], ingredient4: attr["strIngredient4"], unit4: attr["strMeasure4"], ingredient5: attr["strIngredient5"], unit5: attr["strMeasure5"], ingredient6: attr["strIngredient6"], unit6: attr["strMeasure6"])    
    end