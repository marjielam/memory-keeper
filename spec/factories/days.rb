FactoryGirl.define do
  factory :day do
    date Date.parse("2017-01-02")
    user
  end
end
