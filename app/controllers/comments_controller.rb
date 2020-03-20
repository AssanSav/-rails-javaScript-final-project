class CommentsController < ApplicationController
  before_action :set_comment, only: [ :edit, :update, :destroy]

  # GET /comments
  # GET /comments.json
  def index
    @comments = Comment.all
    render json: CommentSerializer.new(@comments).serialized_json
  end

  # GET /comments/1
  # GET /comments/1.json
  def show
    recipe = Recipe.find(params[:recipe_id])
    if recipe
      render json: CommentSerializer.new(@comment).serialized_json
    end
  end

  # GET /comments/new
  def new
    @comment = Comment.new
  end

  # GET /comments/1/edit
  def edit
  end

  # POST /comments
  # POST /comments.json
  def create
    @comment = current_user.comments.build(comment_params)
    # binding.pry
    if @comment.save 
      render json: CommentSerializer.new(@comment).serialized_json
    end
  end

  # PATCH/PUT /comments/1
  # PATCH/PUT /comments/1.json
  def update
    respond_to do |format|
      if @comment.update(comment_params)
        format.html { redirect_to @comment, notice: 'Comment was successfully updated.' }
        format.json { render :show, status: :ok, location: @comment }
      else
        format.html { render :edit }
        format.json { render json: @comment.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /comments/1
  # DELETE /comments/1.json
  def destroy
    # binding.pry
    # @recipe = Recipe.find(params[:recipe_id])
    if @comment.destroy
      render json: CommentSerializer.new(@comment).serialized_json
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_comment
      @comment = Comment.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def comment_params
      params.require(:comment).permit(:content, :recipe_id, :user_id)
    end
end
