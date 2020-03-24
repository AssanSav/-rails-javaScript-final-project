class CommentsController < ApplicationController
  before_action :set_comment, only: [:show, :edit, :update, :destroy]

  def index
    @comments = Comment.all
    render json: CommentSerializer.new(@comments).serialized_json
  end


  def show
    recipe = Recipe.find(params[:recipe_id])
    if recipe
      render json: CommentSerializer.new(@comment).serialized_json
    end
  end


  def new
    @comment = Comment.new
  end


  def edit
  end


  def create
    @comment = current_user.comments.build(comment_params)
    if @comment.save 
      render json: CommentSerializer.new(@comment).serialized_json
    end
  end


  def update
      if @comment.update(comment_params)
        render json: CommentSerializer.new(@comment).serialized_json
    end
  end

 
  def destroy
    if @comment.destroy
      render json: CommentSerializer.new(@comment).serialized_json
    end
  end

  
  private

    def set_comment
      @comment = Comment.find(params[:id])
    end


    def comment_params
      params.require(:comment).permit(:content, :recipe_id)
    end
end
