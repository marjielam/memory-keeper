class Image < ApplicationRecord
  belongs_to :day

  validates :day, presence: true
  validates :image_url, presence: true
end
