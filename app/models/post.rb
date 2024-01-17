class Post < ApplicationRecord
  belongs_to :user
  validates :body, presence: true
  validate :post_length

  def post_length 
    if body.length > 3000
      errors[:body] << "Post should be less than 3000 characters"
    end
  end

end
