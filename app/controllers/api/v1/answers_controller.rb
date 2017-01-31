class Api::V1::AnswersController < ApplicationController
  def index
    @day = Day.find(params[:day_id])
    @answer = Answer.find_by(day: @day)
    render json: @answer
  end

  def create
    answer_data = JSON.parse(request.body.read)
    @day = Day.find(params[:day_id])
    @question = Question.find(answer_data["answer"]["questionId"])
    @body = answer_data["answer"]["body"]
    @answer = Answer.new(day: @day, question: @question, body: @body)
    if @answer.save
      render json: @answer
    end
  end

  def update
    answer_data = JSON.parse(request.body.read)
    @answer = Answer.find(params[:id])
    @body = answer_data["answer"]["body"]
    if @answer.update(body: @body)
      render json: @answer
    end
  end
end
