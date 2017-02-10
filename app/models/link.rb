class Link < ApplicationRecord
  belongs_to :day

  validates :day, presence: true
  validates :url, presence: true
end
