class Question < ApplicationRecord
  has_many :answers
  has_many :days, through: :answers

  validates :date, presence: true, uniqueness: true
  validates :body, presence: true
end
