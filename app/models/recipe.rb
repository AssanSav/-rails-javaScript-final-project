class Recipe < ApplicationRecord
  belongs_to :user
  delegate :username, to: :user
  has_many :comments, dependent: :destroy
  validates :name, presence: true
  validates :image_url, format: {with: /\.(png|jpg)\Z/i,  message: 'must be a url for gif, jpg, or png image.'}
  before_validation :upcase_names


  private

  def upcase_names
    self.name = self.name.capitalize
  end

end
