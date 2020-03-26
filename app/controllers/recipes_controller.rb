class RecipesController < ApplicationController
  before_action :set_recipe, only: [:show, :edit, :update, :destroy]

 
  def index
    @recipes = Recipe.all
    render json: RecipeSerializer.new(@recipes).serialized_json
  end


  def show
    option = {}
    option[:include] = [:comments, :'comments.content']
    render json: RecipeSerializer.new(@recipe, option).serialized_json
  end


  def new
    @recipe = Recipe.new
  end


  def edit
  end


  def create
    @recipe = current_user.recipes.build(recipe_params)
    if @recipe.save
        render json: RecipeSerializer.new(@recipe).serialized_json
    end
  end


  def update
    if @recipe.update(recipe_params)
        render json: RecipeSerializer.new(@recipe).serialized_json
    end
  end

 
  def destroy
    @recipe = current_user.recipes.find(params[:id])
    if @recipe.destroy
     render json: RecipeSerializer.new(@recipe).serialized_json
    end
  end

  private
  
    def set_recipe
      @recipe = Recipe.find(params[:id])
    end

  
    def recipe_params
      params.require(:recipe).permit(:id, :created_at, :updated_at, :name, :image_url, :category, :ingredient1, :unit1, :ingredient2, :unit2, :ingredient3, :unit3, :ingredient4, :unit4, :ingredient5, :unit5, :ingredient6, :unit6,  :directions, :user_id)
    end
end
