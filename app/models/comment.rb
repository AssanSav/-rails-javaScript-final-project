class Comment < ApplicationRecord
  belongs_to :recipe
  belongs_to :user
  delegate :username, to: :user

  validates :content, presence: true
end
