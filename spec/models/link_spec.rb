require 'rails_helper'

RSpec.describe Link, type: :model do

  describe "associations" do
    it { should belong_to(:day) }
  end

  describe "validations" do
    it { should validate_presence_of(:day) }
    it { should validate_presence_of(:url) }
  end
end
