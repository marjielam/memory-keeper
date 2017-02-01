FactoryGirl.define do
  factory :question do
    date Date.parse("2017-01-02")
    body "What are you most grateful for?"
  end
end
