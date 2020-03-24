class RecipeSerializer
  include FastJsonapi::ObjectSerializer
  attributes :name, :image_url, :category, :ingredient1, :unit1, :ingredient2, :unit2, :ingredient3, :unit3, :ingredient4, :unit4, :ingredient5, :unit5, :ingredient6, :unit6,  :directions, :username, :created_at,
                        :updated_at
  has_many :comments 
  belongs_to :user
end
