class CommentSerializer
  include FastJsonapi::ObjectSerializer
  attributes :content, :recipe_id, :user_id
end
