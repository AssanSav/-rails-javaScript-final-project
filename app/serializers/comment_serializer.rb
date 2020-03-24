class CommentSerializer
  include FastJsonapi::ObjectSerializer
  attributes :content, :username, :recipe_id
  belongs_to :user
end
