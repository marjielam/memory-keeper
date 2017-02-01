require "rails_helper"

RSpec.describe Api::V1::DaysController, type: :controller do
  let!(:day) { FactoryGirl.create(:day) }
  let!(:question) { FactoryGirl.create(:question) }
  let!(:answer) { FactoryGirl.create(:answer, day: day, question: question) }
  let!(:day16) { FactoryGirl.create(:day, date: Date.parse("2016-01-02")) }
  let!(:day15) { FactoryGirl.create(:day, date: Date.parse("2016-01-02")) }
  let!(:day14) { FactoryGirl.create(:day, date: Date.parse("2016-01-02")) }
  let!(:answer2) { FactoryGirl.create(:answer, day: day16, question: question) }
  let!(:answer3) { FactoryGirl.create(:answer, day: day15, question: question) }
  let!(:answer4) { FactoryGirl.create(:answer, day: day14, question: question) }

  let!(:user2) { FactoryGirl.create(:user) }
  let!(:day14_other_user) { FactoryGirl.create(:day, date: Date.parse("2016-01-02", user: user2)) }
  let!(:answer5) { FactoryGirl.create(:answer, day: day14_other_user, question: question) }

  describe "GET#show" do
    it "should return the day with a particular id" do
      get :show, id: day.id
      json = JSON.parse(response.body)

      expect(json["id"]).to eq day.id
      expect(json["user_id"]).to eq day.user.id
      expect(json["date"]).to eq "2017-01-02"
    end
  end

  xdescribe "GET#previous_answers" do
    it "should get all previous answers to a question for a given day for a given user excluding the present day" do
      get :show, user_id: day.user.id, day_id: day.id

    end
  end
end
