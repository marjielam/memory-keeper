class Memory < ApplicationRecord
  belongs_to :day

  validates :day, presence: true
  validates :body, presence: true
end
