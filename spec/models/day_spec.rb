require 'rails_helper'

RSpec.describe Day, type: :model do
  let!(:day) { FactoryGirl.create(:day) }

  describe "associations" do
    it { should belong_to(:user) }
    it { should have_one(:answer) }
    it { should have_one(:question) }
    it { should have_many(:images) }
    it { should have_many(:memories) }
  end

  describe "validations" do
    it { should validate_presence_of(:date) }
    it { should validate_presence_of(:user) }
    it { should validate_uniqueness_of(:date).scoped_to(:user_id) }
  end
end
