class RecipeSerializer
  include FastJsonapi::ObjectSerializer
  attributes :name, :image_url, :ingredients, :directions, :user_id
  has_many :comments 
end
