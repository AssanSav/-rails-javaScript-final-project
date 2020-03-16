class RecipeSerializer
  include FastJsonapi::ObjectSerializer
  attributes :name, :image_url, :category, :ingredient1, :unit1, :ingredient2, :unit2, :ingredient3, :unit3, :ingredient4, :unit4, :ingredient5, :unit5, :ingredient6, :unit6,  :directions, :user_id
  has_many :comments 
end
