class Day < ApplicationRecord
  belongs_to :user
  has_one :answer
  has_one :question, through: :answer
  has_many :images

  validates :date, presence: true
  validates :user, presence: true
  validates :date, uniqueness: { scope: :user }

  def get_question
    question_date = Date.parse("2000-#{date.month}-#{date.day}")
    @question = Question.find_by(date: question_date)
  end
end
