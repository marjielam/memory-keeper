require 'rails_helper'

RSpec.describe Question, type: :model do
  let!(:question) { FactoryGirl.create(:question) }

  describe "associations" do
    it { should have_many(:answers) }
    it { should have_many(:days) }
  end

  describe "validations" do
    it { should validate_presence_of(:date) }
    it { should validate_uniqueness_of(:date) }
    it { should validate_presence_of(:body) }
  end
end
