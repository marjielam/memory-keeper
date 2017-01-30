class Day < ApplicationRecord
  # belongs_to :user
  has_one :answer
  has_one :question, through: :answer

  validates :date, presence: true
  # validates :user, presence: true
end
