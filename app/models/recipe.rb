class Recipe < ApplicationRecord
  has_many_attached :images
  has_one_attached :video

  validates :title, presence: true
end
