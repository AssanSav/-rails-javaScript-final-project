# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
# u = User.find_by(id: 1)

# r = u.recipes.create(image_url:"https://www.edamam.com/web-img/a8e/a8e6b4cd3856e78ad8f84f2a4d4ad8c3.jpg", name:"Beef & vegetable casserole", ingredient:" celery sticks, thickly sliced, 1 onion, chopped, 2 thyme sprigs, 1 whole and 1 leaves picked", directions:"Heat oven to 160C/140C fan/gas 3 and put the kettle on. Put 2 thickly sliced celery sticks, 1 chopped onion, 2 chunkily sliced carrots, 5 bay leaves and 1 whole thyme sprig in a flameproof casserole dish with 1 tbsp vegetable oil and 1 tbsp butter. Soften for 10 mins, then stir in 2 tbsp plain flour until it doesn’t look dusty anymore, followed by 2 tbsp tomato purée, 2 tbsp Worcestershire sauce and 2 crumbled beef stock cubes.Gradually stir in 600ml hot water, then tip in 850g stewing beef and bring to a gentle simmer.Cover and put in the oven for 2hrs 30 mins, then uncover and cook for 30mins – 1hr more until the meat is really tender and the sauce is thickened.Garnish with")





# r1 = u.recipes.create(image_url:"https://www.edamam.com/web-img/a8e/a8e6b4cd3856e78ad8f84f2a4d4ad8c3.jpg", name:"Beef bourguignon with celeriac mash", ingredients:"tbsp goose fat
# 600g shin beef, cut into large chunks
# 100g smoked streaky bacon, sliced
# 350g shallot
#  or pearl onions, peeled
# 250g chestnut mushrooms (about 20)
# 2 garlic cloves, sliced
# 1 bouquet garni (See know-how below)
# 1 tbsp tomato purée
# 750ml bottle red wine, Burgundy is good", directions:"Heat a large casserole pan and add 1 tbsp goose fat.
# Season 600g large chunks of shin beef and fry until golden brown, about 3-5 mins, then turn over and fry the other side until the meat is browned all over, adding more fat if necessary. Do this in 2-3 batches, transferring the meat to a colander set over a bowl when browned.
# In the same pan, fry 100g sliced smoked streaky bacon, 350g peeled shallots or pearl onions, 250g chestnut mushrooms, 2 sliced garlic cloves and 1 bouquet garni until lightly browned.
# Mix in 1 tbsp tomato purée and cook for a few mins, stirring the mixture. This enriches the bourguignon and makes a great base for")


    Api.request_api["meals"].each do |attr|
      user = User.where(id: 1)
          Recipe.create(user_id: 1, name: attr["strMeal"], image_url: attr["strMealThumb"], category: attr["strCategory"], directions: attr["strInstructions"], ingredient1: attr["strIngredient1"], unit1: attr["strMeasure1"], ingredient2: attr["strIngredient2"], unit2: attr["strMeasure2"], ingredient3: attr["strIngredient3"], unit3: attr["strMeasure3"], ingredient4: attr["strIngredient4"], unit4: attr["strMeasure4"], ingredient5: attr["strIngredient5"], unit5: attr["strMeasure5"], ingredient6: attr["strIngredient6"], unit6: attr["strMeasure6"])    
    end