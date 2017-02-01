require 'rails_helper'

RSpec.describe Answer, type: :model do
  let!(:question) { FactoryGirl.create(:question) }
  let!(:day) { FactoryGirl.create(:day) }
  let!(:answer) { FactoryGirl.create(:answer, day: day, question: question) }

  describe "associations" do
    it { should belong_to(:day) }
    it { should belong_to(:question) }
  end

  describe "validations" do
    it { should validate_presence_of(:day) }
    it { should validate_presence_of(:question) }
    it { should validate_uniqueness_of(:day).scoped_to(:question_id) }
  end
end
