class Answer < ApplicationRecord
  belongs_to :day
  belongs_to :question

  validates :day, presence: true
  validates :question, presence: true
  validates :day, uniqueness: { scope: :question }
end
