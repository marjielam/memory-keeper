require "rails_helper"

RSpec.describe Api::V1::DaysController, type: :controller do
  let!(:user) { FactoryGirl.create(:user) }
  let!(:day) { FactoryGirl.create(:day, user: user) }
  let!(:question) { FactoryGirl.create(:question) }
  let!(:answer) { FactoryGirl.create(:answer, day: day, question: question) }
  let!(:other_day) do
    FactoryGirl.create(:day, date: Date.parse("2017-01-03"), user: user)
  end
  let!(:day16) do
    FactoryGirl.create(:day, date: Date.parse("2016-01-02"), user: user)
  end
  let!(:day15) do
    FactoryGirl.create(:day, date: Date.parse("2015-01-02"), user: user)
  end
  let!(:day14) do
    FactoryGirl.create(:day, date: Date.parse("2014-01-02"), user: user)
  end
  let!(:answer2) { FactoryGirl.create(:answer, day: day16, question: question) }
  let!(:answer3) { FactoryGirl.create(:answer, day: day15, question: question) }
  let!(:answer4) { FactoryGirl.create(:answer, day: day14, question: question) }

  let!(:user2) { FactoryGirl.create(:user) }
  let!(:day14_other_user) do
    FactoryGirl.create(:day, date: Date.parse("2014-01-02"), user: user2)
  end
  let!(:answer5) do
    FactoryGirl.create(:answer, day: day14_other_user, question: question)
  end

  describe "GET#index" do
    it "should return a list of days with data for a given user" do
      get :index, user_id: user.id
      json = JSON.parse(response.body)

      expect(json.length).to eq 5
      expect(json[0]["day"]["id"]).to eq other_day.id
      expect(json[0]["question"]["id"]).to eq other_day.get_question.id
      expect(json[0]["question"]["body"]).to eq other_day.get_question.body
      expect(json[1]["day"]["id"]).to eq day.id
      expect(Date.parse(json[1]["day"]["date"])).to eq day.date
      expect(json[1]["question"]["id"]).to eq day.get_question.id
      expect(json[1]["question"]["body"]).to eq day.get_question.body
      expect(json[2]["day"]["id"]).to eq day16.id
      expect(Date.parse(json[2]["day"]["date"])).to eq day16.date
    end
  end

  describe "GET#show" do
    it "should return the day with a particular id" do
      get :show, id: day.id
      json = JSON.parse(response.body)

      expect(json["day"]["id"]).to eq day.id
      expect(json["day"]["user_id"]).to eq day.user.id
      expect(json["day"]["date"]).to eq "2017-01-02"
      expect(json["question"]["body"]).to eq "What are you most grateful for?"
    end
  end

  describe "POST#create" do
    it "should create a day record given a user and date" do
      day_data = { day: { date: Date.parse("2017-02-03"), userId: user.id } }

      post :create, day_data.to_json, format: :json
      json = JSON.parse(response.body)

      expect(json["user_id"]).to eq user.id
      expect(json["date"]).to eq "2017-02-03"
    end
  end

  xdescribe "GET#previous_answers" do
    it "should get all previous answers to a question for a given day for a
      given user excluding the present day" do
      # visit api_v1_user_day_previous_answers_path(day.user.id, day.id)
      # get :show, params: {day_id: day.id, user_id: day.user.id}
    end
  end
end
