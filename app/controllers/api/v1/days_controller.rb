class Api::V1::DaysController < ApplicationController
  skip_before_filter :verify_authenticity_token
  respond_to :json
  # before_filter :authenticate_user!

  def index
    @user = User.find(params[:user_id])
    @days = @user.days.order(date: :desc)
    @day_info = []
    @days.each do |day|
      @day_info << { day: day, question: day.get_question }
    end
    render json: @day_info
  end

  def show
    @day = Day.find(params[:id])
    render json: @day
  end

  def previous_answers
    @day = Day.find(params[:day_id])
    @current_user = User.find(params[:user_id])
    @all_questions = Question.all
    @all_questions.each do |question|
      if question.date.day == @day.date.day &&
          question.date.month == @day.date.month
        @question = question
      end
    end
    @answers = Answer.where(question: @question)
    @user_answers = []
    @answers.each do |answer|
      if answer.day.user == @current_user && answer.day != @day
        @user_answers << { answer: answer, day: answer.day }
      end
    end
    render json: @user_answers
  end
end
