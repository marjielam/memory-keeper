require "rails_helper"

RSpec.describe Api::V1::AnswersController, type: :controller do
  let!(:day) { FactoryGirl.create(:day) }
  let!(:question) { FactoryGirl.create(:question) }
  let!(:answer) { FactoryGirl.create(:answer, day: day, question: question) }

  describe "GET#index" do
    it "should get the answer for a particular day" do
      get :index, day_id: day.id
      json = JSON.parse(response.body)

      expect(json["id"]).to eq answer.id
      expect(json["day_id"]).to eq day.id
      expect(json["question_id"]).to eq question.id
      expect(json["body"]).to eq "Friends and family"
    end
  end

  xdescribe "POST#create" do
    it "should create a new answer for a particular day and question" do
      post :create, params: { answer: { body: "friends and family", questionId: question.id } }, day_id: day.id
        # rest of the test goes here
    end
  end

  describe "PUT#update" do

  end
end
